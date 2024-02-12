"use client";

import { authSelector, logout } from "@/store/slices/authSlice";
import { showNotification } from "@/store/slices/notificationSlice";
import { Avatar, Button, Popover } from "antd";
import Search from "@/components/home/Search";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationType } from "@/types/notificationType";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {};

const HomeHeader = (props: Props) => {
  // --- Redux ---
  const dispatch = useDispatch();
  const authReducer = useSelector(authSelector);
  const { userInfo, status, error } = authReducer;

  // --- Avatar ---
  

  // --- Router ---
  const navigate = useRouter();

  const handleLogout = async () => {
    try {
      const actionResult: any = await dispatch<any>(logout()).unwrap();
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
          <Search />
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold">{userInfo?.name}</h3>
            <Popover content={content} title={userInfo?.email} trigger="click">
              <Avatar
                size={32}
                src={
                  userInfo?.avatar ||
                  "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                }
              />
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
