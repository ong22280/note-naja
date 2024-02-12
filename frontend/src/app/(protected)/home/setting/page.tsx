"use client";

import { authSelector, updateUser } from "@/store/slices/authSlice";
import { showNotification } from "@/store/slices/notificationSlice";
import { Form, Input, Button } from "antd";
import React from "react";
import { NotificationType } from "@/types/notificationType";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { UserUpdateType } from "@/types/authTypes";

type Props = {};

type FieldType = {
  name: string;
};

const SettingPage = (props: Props) => {
  // --- Redux ---
  const dispatch = useDispatch();
  const authReducer = useSelector(authSelector);

  // --- Initial Values ---
  const initialValues = {
    name: authReducer.userInfo?.name,
  };

  // --- Router ---
  const navigate = useRouter();

  const onFinish = async (values: any) => {
    try {
      const data:UserUpdateType = {
        id: authReducer.userInfo?.id,
        ...values,
      };
      const actionResult = await dispatch(updateUser(data) as any);
      if (updateUser.fulfilled.match(actionResult)) {
        dispatch(
          showNotification({
            message: "Note updated successfully",
            type: NotificationType.Success,
          })
        );
        navigate.push("/home");
      } else if (updateUser.rejected.match(actionResult)) {
        dispatch(
          showNotification({
            message: "Failed to update note",
            type: NotificationType.Error,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
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

export default SettingPage;
