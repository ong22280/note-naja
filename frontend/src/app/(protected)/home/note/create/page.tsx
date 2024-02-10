"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/store/slices/authSlice";
import { createNote, noteSelector } from "@/store/slices/noteSlice";
import { showNotification } from "@/store/slices/notificationSlice";
import { NotificationType } from "@/types/notificationType";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/categoryTypes";
const { Option } = Select;

const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
  ssr: false,
});

type FieldType = {
  title: string;
  content: string;
  category: CategoryType;
  tags: string[];
};

type Props = {};

const CreateNote = (props: Props) => {
  const authReducer = useAppSelector(authSelector);
  const noteReducer = useAppSelector(noteSelector);

  const dispatch = useAppDispatch();

  const navigate = useRouter();

  const [userTags, setUserTags] = useState<string[]>([]);
  const handleTagInputChange = (value: string) => {
    setUserTags([...userTags, value]);
  };

  // --- Fetch Tags ---


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
      <h2 className="text-2xl font-bold mb-2">Create Note</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
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
          label="Category"
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
          <RichTextEditor />
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

export default CreateNote;
