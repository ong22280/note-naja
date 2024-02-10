"use client";

import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/store/slices/authSlice";
const { Option } = Select;

const initialValues = {
  title: "Initial Title",
  category: "demo",
  tags: ["Tag 1", "Tag 2", "Tag 3"],
  content: "<h1>Initial content</h1>",
};

const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
  ssr: false,
});

type FieldType = {
  title: string;
  content: string;
};

type Props = {};

const EditNote = (props: Props) => {
  const authReducer = useAppSelector(authSelector);
  const [userTags, setUserTags] = useState<string[]>([]);
  const handleTagInputChange = (value: string) => {
    setUserTags([...userTags, value]);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const data = {
      ...values,
      name: authReducer.userInfo?.name,
    };
    console.log(data);
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
            <Select.Option value="demo">Demo</Select.Option>
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
