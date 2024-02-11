"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { logSelector } from "@/store/slices/logSlice";
import { getNoteById, noteSelector } from "@/store/slices/noteSlice";
import { formattedDate, formattedDateTime } from "@/utils/dateFormat";
import { Avatar, Button, Tag, Timeline } from "antd";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {
  params: { note_id: string };
};

const Note = (props: Props) => {
  // --- Params ---
  const note_id = props.params.note_id;

  // --- Redux ---
  const dispatch = useAppDispatch();
  const noteReducer = useAppSelector(noteSelector);

  // --- Formatted Date ---
  const createAtFormatted = formattedDate(noteReducer.note?.createdAt);

  // --- Set Styled Tags ---
  const contentWithStyledTags = noteReducer.note?.content
    ? noteReducer.note.content
        .replace(/<h1>/g, '<h1 style="font-size: 24px;">')
        .replace(/<ol>/g, '<ol style="margin-left: 20px;">')
        .replace(/<li>/g, '<li style="list-style-type: square;">')
    : "";

  // --- Fetch Note ---
  useEffect(() => {
    if (noteReducer.status === "idle") {
      const fetchNoteById = async () => {
        const id = parseInt(note_id);
        await dispatch(getNoteById(id));
      };
      fetchNoteById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note_id, dispatch]);

  console.log(noteReducer.note);

  return (
    <>
      {noteReducer.status === "loading" ||
      noteReducer.note?.user == undefined ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">{noteReducer.note?.title}</h2>
            <Button type="primary">
              <Link href={`/home/note/${note_id}/edit`}>Edit</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-2 mt-4">
              <Avatar
                src={
                  noteReducer.note?.user.avatar !== null
                    ? noteReducer.note?.user.avatar
                    : "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                }
              />
              <p>by {noteReducer.note?.user.name}</p>
            </div>
            <p>Create at {createAtFormatted}</p>
            <p className="border-2 rounded-md px-2 w-fit text-green-600">
              {noteReducer.note?.category}
            </p>
            <div className="flex items-center gap-x-1">
              {noteReducer.note?.tags.map((tag) => {
                return <Tag key={tag.id}>{tag.name}</Tag>;
              })}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              <div
                className="text-sm text-gray-700 mt-4 p-4 bg-slate-100 rounded-md"
                dangerouslySetInnerHTML={{
                  __html: contentWithStyledTags,
                }}
              />
            </div>

            {/* --- Timeline --- */}
            <div className="col-span-4">
              {noteReducer.note?.logs.length > 0 && (
                <Timeline>
                  {noteReducer.note.logs.map((log) => {
                    return (
                      <Timeline.Item key={log.id}>
                        <Link href={`/home/note/${note_id}/history/${log.id}`}>
                          {formattedDateTime(log.createdAt)}
                        </Link>
                      </Timeline.Item>
                    );
                  })}
                </Timeline>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Note;
