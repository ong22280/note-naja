"use client";

import { useAppDispatch } from "../../../hooks/redux-hooks";
import { getUser, googleAuth, signup } from "../../../store/slices/authSlice";
import { showNotification } from "../../../store/slices/notificationSlice";
import Link from "next/link";
import { NotificationType } from "@/types/notificationType";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

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

  // --- Google Auth ---
  const client_id =
    "1090445180313-entt1njfbbvobcvl27rna7naiatgtjmj.apps.googleusercontent.com";

  const handleSignup = async (values: FieldType) => {
    const { name, email, password } = values;
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

  const handleGoogleLogin = async (response: CredentialResponse) => {
    const { credential } = response;
    if (!credential) {
      dispatch(
        showNotification({
          message: "Google authentication failed",
          type: NotificationType.Error,
        })
      );
      return;
    }
    const actionResult = await dispatch(googleAuth({ credential, client_id }));
    if (googleAuth.fulfilled.match(actionResult)) {
      await dispatch(getUser());
      dispatch(
        showNotification({
          message: "Logged in successfully",
          type: NotificationType.Success,
        })
      );
      navigate.push("/home");
    } else if (googleAuth.rejected.match(actionResult)) {
      dispatch(
        showNotification({
          message: "Google authentication failed",
          type: NotificationType.Error,
        })
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            rules={[
              { required: true, message: "Please input your name!" },
              { min: 3, message: "Name must be at least 3 characters long" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please input a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 4, message: "Password must be at least 4 characters" },
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

        <p className="w-full text-center">or</p>
        {/* Google Login */}
        <div className="flex justify-center mb-4">
          <GoogleOAuthProvider clientId={client_id}>
            <GoogleLogin
              onSuccess={(response: CredentialResponse) => {
                console.log(response);
                handleGoogleLogin(response);
              }}
              onError={() => {
                console.error("Error");
              }}
            />
          </GoogleOAuthProvider>
        </div>

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
