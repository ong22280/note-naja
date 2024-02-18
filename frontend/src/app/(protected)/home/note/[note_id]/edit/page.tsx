"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/store/slices/authSlice";
import {
  getNoteById,
  noteSelector,
  updateNote,
} from "@/store/slices/noteSlice";
import { showNotification } from "@/store/slices/notificationSlice";
import { NotificationType } from "@/types/notificationType";
import { useRouter } from "next/navigation";
import { tagSelector } from "@/store/slices/tagSlice";
import { CategoryEnumType } from "@/types/categoryTypes";
import RichTextEditor from "@/components/rich-text-editor";

type FieldType = {
  title: string;
  category: CategoryEnumType;
  tags: string[];
  content: string;
};

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  params: { note_id: string };
};

const EditNote = (props: Props) => {
  // --- Params ---
  const note_id = props.params.note_id;

  // --- Router ---
  const navigate = useRouter();

  // --- Redux ---
  const dispatch = useAppDispatch();
  const authReducer = useAppSelector(authSelector);
  const noteReducer = useAppSelector(noteSelector);
  const tagReducer = useAppSelector(tagSelector);

  // --- Initial Values ---
  const initialValues = {
    title: noteReducer.note?.title,
    content: noteReducer.note?.content,
    category: noteReducer.note?.category,
    tags: noteReducer.note?.tags
      ? noteReducer.note.tags.map((tag) => tag.name)
      : [],
  };

  // --- Tags ---
  const [userTags, setUserTags] = useState<string[]>([]);
  const [initOptions, setInitOptions] = useState<OptionType[]>([]);
  const handleTagInputChange = (value: string) => {
    setUserTags([...userTags, value]);
  };

  // --- Fetch Note ---
  useEffect(() => {
    if (noteReducer.status === "idle") {
      const fetchNoteById = async () => {
        const id = parseInt(note_id);
        await dispatch(getNoteById(id));
      };
      fetchNoteById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Set Tags ---
  useEffect(() => {
    if (
      tagReducer.tags != undefined &&
      tagReducer.tags?.length >= 1 &&
      tagReducer.status === "idle"
    ) {
      const optionsSet = new Set();
      for (let i = 0; i < tagReducer.tags.length; i++) {
        optionsSet.add({
          value: tagReducer.tags[i].name,
          label: tagReducer.tags[i].name,
        });
      }
      const options: any = Array.from(optionsSet);
      setInitOptions((prev) => [...prev, ...options]);
    }
  }, [tagReducer.tags, tagReducer.status]);

  const onFinish = async (values: any) => {
    try {
      const data = {
        ...values,
        id: note_id,
        userId: authReducer.userInfo?.id,
      };
      console.log(data);
      const actionResult = await dispatch(updateNote(data));
      if (updateNote.fulfilled.match(actionResult)) {
        console.log("Note updated successfully");
        dispatch(
          showNotification({
            message: "Note updated successfully",
            type: NotificationType.Success,
          })
        );
        navigate.push("/home");
      } else if (updateNote.rejected.match(actionResult)) {
        dispatch(
          showNotification({
            message: "Failed to update note",
            type: NotificationType.Error,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Edit Note</h2>

      {noteReducer.status === "loading" ||
      noteReducer.note?.user == undefined ? (
        <Spin />
      ) : (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={initialValues}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="CategoryType"
            name="category"
            rules={[{ required: true, message: "Please select an option!" }]}
          >
            <Select>
              <Select.Option value="WORK">Work</Select.Option>
              <Select.Option value="PERSONAL">Personal</Select.Option>
              <Select.Option value="OTHERS">Others</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType> label="Tags" name="tags">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Tags Mode"
              options={initOptions}
              onChange={handleTagInputChange}
            ></Select>
          </Form.Item>

          <Form.Item<FieldType> label="content" name="content">
            <RichTextEditor initialValue={initialValues.content} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default EditNote;
