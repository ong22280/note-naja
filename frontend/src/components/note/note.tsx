"use client";

import { Avatar, Card, Tag } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { CategoryType } from "@/types/categoryTypes";
import { formattedDate } from "@/utils/dateFormat";

const { Meta } = Card;

type NoteProps = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    avatar?: string | null;
    name: string;
    email: string;
  };
  logs: {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  category: CategoryType;
  tags: Tag[];
};

const Note = (props: NoteProps) => {
  // const formattedDate = new Date(props.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
  
  const createdAtFormatted = formattedDate(props.createdAt);
  
  const [loading, setLoading] = useState(false);

  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };

  // console.log(props);

  return (
    <>
      <Link href={`home/note/${props.id}`}>
        <Card className="w-full" loading={loading}>
          <Meta
            avatar={
              <Avatar
                src={
                  props.user.avatar
                    ? props.user.avatar
                    : "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                }
              />
            }
            title={props.title}
            description={
              <div>
                <p>by {props.user.name}</p>
                <p>{createdAtFormatted}</p>
              </div>
            }
          />
          <div className="mt-2 flex flex-col gap-y-2">
            <div>
              {props.tags.map((tag) => {
                return <Tag key={tag.id}>{tag.name}</Tag>;
              })}
            </div>
            <p className="border-2 border-green-500 rounded-md w-full px-2 text-center">
              {props.category}
            </p>
          </div>
        </Card>
      </Link>
    </>
  );
};

export default Note;
