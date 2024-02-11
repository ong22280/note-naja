"use client";

import { authSelector, logout } from "@/store/slices/authSlice";
import { showNotification } from "@/store/slices/notificationSlice";
import { Avatar, Button, Popover, Select } from "antd";
import Search from "antd/es/input/Search";
import type { SearchProps } from "antd/es/input/Search";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationType } from "@/types/notificationType";
import { useRouter } from "next/navigation";

type Props = {};
const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const HomeHeader = (props: Props) => {
  // --- Redux ---
  const dispatch = useDispatch();
  const authReducer = useSelector(authSelector);
  const { userInfo, status, error } = authReducer;

  // --- Router ---
  const navigate = useRouter();

  const handleLogout = async () => {
    try {
      const actionResult = await dispatch(logout()).unwrap();
      if (logout.fulfilled.match(actionResult)) {
        return navigate.push("/log-in");
      } else if (logout.rejected.match(actionResult)) {
        dispatch(
          showNotification({
            message: "Failed to logout",
            type: NotificationType.Error,
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const content = (
    <div className="flex flex-col">
      {/* <Button type="text">Profile</Button> */}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );

  return (
    <header className="bg-slate-800 text-white py-4">
      <div className="container mx-auto px-4  items-center">
        <div className="flex items-center justify-between">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            style={{ width: 300 }}
          />
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold">{userInfo?.name}</h3>
            <Popover content={content} title={userInfo?.email} trigger="click">
              <Avatar
                size={32}
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              >
                {/* <Button>Click me</Button> */}
              </Avatar>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
