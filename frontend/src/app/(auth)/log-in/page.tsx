"use client";

import { useAppDispatch } from "../../../hooks/redux-hooks";
import { getUser, login } from "../../../store/slices/authSlice";
import { showNotification } from "../../../store/slices/notificationSlice";
import Link from "next/link";
import { NotificationType } from "@/types/notificationType";
import { useRouter } from "next/navigation";
import { Button, Form, Input } from "antd";

type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = async (values:FieldType) => {
    const { email, password } = values;
    // This is only a basic validation of inputs. Improve this as needed.
    if (email && password) {
      const actionResult = await dispatch(login({ email, password }));
      if (login.fulfilled.match(actionResult)) {
        await dispatch(getUser());
        dispatch(
          showNotification({
            message: "Logged in successfully",
            type: NotificationType.Success,
          })
        );
        router.push("/home");
      } else if (login.rejected.match(actionResult)) {
        dispatch(
          showNotification({
            message: "Invalid email or password",
            type: NotificationType.Error,
          })
        );
      }
    } else {
      dispatch(
        showNotification({
          message: "Please provide email and password",
          type: NotificationType.Error,
        })
      );
    }
  };

  return (
    <>
      <div className="max-w-xs mx-auto mt-20">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <div className="flex items-center justify-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                ></path>
              </svg>
              <h1 className="text-center text-xl font-bold  text-black">
                Log In
              </h1>
            </div>
          </div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            autoComplete="off"
          >
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
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
            href="/sign-up"
          >
            on&apos;t have an account? sign-up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
