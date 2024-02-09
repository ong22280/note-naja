"use client";

import { Avatar, Card } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const { Meta } = Card;

type Props = {};

const Note = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };

  return (
    <>
      <Link href="home/note/1">
        <Card className="w-full" loading={loading}>
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            }
            title="Card title"
            description="This is the description"
          />
          <div className="mt-2">Content</div>
        </Card>
      </Link>
    </>
  );
};

export default Note;
