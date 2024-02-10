"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/store/slices/authSlice";
import { getNoteById, noteSelector, updateNote } from "@/store/slices/noteSlice";
import { showNotification } from "@/store/slices/notificationSlice";
import { NotificationType } from "@/types/notificationType";
import { useRouter } from "next/navigation";
const { Option } = Select;

const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
  ssr: false,
});

type FieldType = {
  title: string;
  content: string;
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
  const authReducer = useAppSelector(authSelector);
  const noteReducer = useAppSelector(noteSelector);
  const dispatch = useAppDispatch();

  // --- Initial Values ---
  const initialValues = {
    title: noteReducer.note?.title,
    content: noteReducer.note?.content,
    category: noteReducer.note?.category,
    tags: noteReducer.note?.tags ? noteReducer.note.tags.map((tag) => tag.name) : [],
  };

  // --- Tags ---
  const [userTags, setUserTags] = useState<string[]>([]);
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
  }, [note_id, dispatch]);

  const onFinish = (values: any) => {
    try {
      const data = {
        ...values,
        id: note_id,
        userId: authReducer.userInfo?.id,
      };
      console.log(data);
      const actionResult = dispatch(updateNote(data));
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
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
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

        <Form.Item label="Tags" name="tags">
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Tags Mode"
            onChange={handleTagInputChange}
            value={
              userTags.length > 0 ? userTags[userTags.length - 1] : undefined
            }
          >
            {userTags.map((tag, index) => (
              <Option key={index} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="content" name="content">
          <RichTextEditor initialValue={initialValues.content} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditNote;
