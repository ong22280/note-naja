"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/store/slices/authSlice";
import { createNote } from "@/store/slices/noteSlice";
import { showNotification } from "@/store/slices/notificationSlice";
import { NotificationType } from "@/types/notificationType";
import { useRouter } from "next/navigation";
import { CategoryEnumType } from "@/types/categoryTypes";
import { tagSelector, getAllTags } from "@/store/slices/tagSlice";
import RichTextEditor from "@/components/rich-text-editor";

type FieldType = {
  title: string;
  category: CategoryEnumType;
  content: string;
  tags: string[];
};

type OptionType = {
  value: string;
  label: string;
};

type Props = {};

const CreateNote = (props: Props) => {
  // --- Redux ---
  const dispatch = useAppDispatch();
  const authReducer = useAppSelector(authSelector);
  const tagReducer = useAppSelector(tagSelector);

  // --- Router ---
  const navigate = useRouter();

  // --- Tags ---
  const [initOptions, setInitOptions] = useState<OptionType[]>([]);

  // --- Fetch Tags ---
  useEffect(() => {
    if (tagReducer.status === "idle") {
      const fetchTags = async () => {
        await dispatch(getAllTags());
      };
      fetchTags();
    }
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
      setInitOptions(options);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = async (values: FieldType) => {
    try {
      const newNote = {
        ...values,
        userId: authReducer.userInfo?.id,
      };
      console.log(newNote);
      const actionResult = await dispatch(createNote(newNote));
      if (createNote.fulfilled.match(actionResult)) {
        console.log("Note created successfully");
        dispatch(
          showNotification({
            message: "Note created successfully",
            type: NotificationType.Success,
          })
        );
        navigate.push("/home");
      } else if (createNote.rejected.match(actionResult)) {
        dispatch(
          showNotification({
            message: "Failed to create note",
            type: NotificationType.Error,
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {tagReducer.status === "loading" || tagReducer.tags === undefined ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-2">Create Note</h2>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="CategoryType"
              name="category"
              rules={[
                { required: true, message: "Please select an category!" },
              ]}
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
              ></Select>
            </Form.Item>

            <Form.Item<FieldType> label="content" name="content">
              <RichTextEditor />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};

export default CreateNote;
