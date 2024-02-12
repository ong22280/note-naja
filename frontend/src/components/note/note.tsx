import { Avatar, Card, Tag } from "antd";
import Link from "next/link";
import React from "react";
import { CategoryEnumType } from "@/types/categoryTypes";
import { formattedDate } from "@/utils/dateFormat";
import { TagType } from "@/types/tagTypes";

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
  category: CategoryEnumType;
  tags: TagType[];
};

const Note = (props: NoteProps) => {
  const createdAtFormatted = formattedDate(props.createdAt);

  return (
    <Link href={`home/note/${props.id}`}>
      <Card className="w-full h-full">
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
          {props.tags != undefined && (
            <div>
              {props.tags.length > 0 ? (
                props.tags.map((tag) => {
                  return <Tag key={tag.id}>{tag.name}</Tag>;
                })
              ) : (
                <p>No tag</p>
              )}
            </div>
          )}
          <p className="border-2 rounded-md w-full px-2 text-center text-green-600">
            {props.category}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default Note;
