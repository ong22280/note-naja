"use client";
import { Avatar } from "antd";
import Search from "antd/es/input/Search";
import type { SearchProps } from "antd/es/input/Search";
import React from "react";

type Props = {};
const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const HomeHeader = (props: Props) => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4  items-center">
        <div className="flex items-center justify-between">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            style={{ width: 300 }}
          />
          <Avatar
            size={32}
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
          />
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
