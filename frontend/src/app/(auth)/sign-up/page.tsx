"use client";

import { useAppDispatch } from "../../../hooks/redux-hooks";
import { signup } from "../../../store/slices/authSlice";
import { showNotification } from "../../../store/slices/notificationSlice";
import Link from "next/link";
import { NotificationType } from "@/types/notificationType";
import { Button, Form, Input  } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
};

const Signup = () => {

  // --- Redux ---
  const dispatch = useAppDispatch();

  // --- Router ---
  const navigate = useRouter();

  const handleSignup = async (values: FieldType) => {
    const { name, email, password } = values;
    // This is only a basic validation of inputs. Improve this as needed.
    if (name && email && password) {
      const actionResult = await dispatch(
        signup({
          name,
          email,
          password,
        })
      );
      if (signup.fulfilled.match(actionResult)) {
        dispatch(
          showNotification({
            message: "signuped successfully",
            type: NotificationType.Success,
          })
        );
        navigate.push("/log-in");
      } else {
        dispatch(
          showNotification({
            message: "Failed to signup",
            type: NotificationType.Error,
          })
        );
      }
    } else {
      dispatch(
        showNotification({
          message: "Please fill out all the required fields",
          type: NotificationType.Error,
        })
      );
    }
  };

  return (
    <div className="max-w-xs mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <div className="flex items-center justify-center">
            <h1 className="text-center text-xl font-bold  text-black">
              Signup
            </h1>
          </div>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleSignup}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Link
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="/log-in"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
