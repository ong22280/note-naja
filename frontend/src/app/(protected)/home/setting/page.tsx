"use client";

import {
  authSelector,
  updateUser,
  uploadAvatar,
} from "@/store/slices/authSlice";
import { showNotification } from "@/store/slices/notificationSlice";
import {
  Form,
  Input,
  Button,
  Avatar,
  message,
  Upload,
  UploadProps,
} from "antd";
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
      const data: UserUpdateType = {
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

  const propsUpload: UploadProps = {
    name: "avatar",
    action: `http://localhost:3000`,
    headers: {
      authorization: "Bearer " + authReducer.token,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleAvatarUpload = (info: any) => {
    if (info.file.status === "done") {
      const data = {
        id: authReducer.userInfo?.id,
        avatarFile: info.file.originFileObj,
      };
      // Dispatch the uploadAvatar action with the selected file
      dispatch(uploadAvatar(data) as any);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>
      <div className="ml-48 mb-4">
        <div className=" cursor-pointer p-2 border-2 rounded-full w-fit">
          <Upload {...propsUpload} onChange={handleAvatarUpload}>
            <Avatar
              size={128}
              src={
                authReducer.userInfo?.avatar ||
                "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              }
            />
          </Upload>
        </div>
      </div>
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
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 3, message: "Name must be at least 3 characters long" },
          ]}
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
