"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getLogById, logSelector } from "@/store/slices/logSlice";
import { getNoteById, noteSelector } from "@/store/slices/noteSlice";
import { LogType } from "@/types/logTypes";
import { formattedDate, formattedDateTime } from "@/utils/dateFormat";
import { Avatar, Button, Tag, Timeline } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  params: { log_id: string; note_id: string };
};

const HistoryNote = (props: Props) => {
  // --- Params ---
  const note_id = props.params.note_id;
  const log_id = props.params.log_id;

  // --- Redux ---
  const dispatch = useAppDispatch();
  const noteReducer = useAppSelector(noteSelector);
  const logReducer = useAppSelector(logSelector);

  // --- Formatted Date ---
  const createAtFormatted = formattedDateTime(logReducer.log?.createdAt);

  // --- Set Styled Tags ---
  const contentWithStyledTags = logReducer.log?.content
    ? logReducer.log.content
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
    if (logReducer.status === "idle") {
      const fetchLogById = async () => {
        const id = parseInt(log_id);
        await dispatch(getLogById(id));
      };
      fetchLogById();
    }
  }, [note_id, dispatch, log_id]);

  return (
    <>
      {noteReducer.status === "loading" ||
      noteReducer.note?.user == undefined ||
      logReducer.status === "loading" ||
      logReducer.log == undefined ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <h2 className="text-2xl font-bold text-green-500">History of</h2>
              <h2 className="text-2xl font-bold">{logReducer.log.title}</h2>
              <h2 className="text-2xl font-bold">(Current Name: {noteReducer.note.title})</h2>
            </div>
            <Button type="primary">
              <Link href={`/home/note/${note_id}`}>Back to Current Note</Link>
            </Button>
          </div>
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
          <p>{logReducer.log.category}</p>
          <div className="flex items-center gap-x-1">
            {logReducer.log.tags.map((tag) => {
              return <Tag key={tag.id}>{tag.name}</Tag>;
            })}
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

export default HistoryNote;
