"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getNoteById, noteSelector } from "@/store/slices/noteSlice";
import { formattedDate } from "@/utils/dateFormat";
import { Button, Timeline } from "antd";
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
  const updateAtFormatted = formattedDate(noteReducer.note?.updatedAt);

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
      // dispatch(getNoteById(note_id));
      const fetchNoteById = async () => {
        const id = parseInt(note_id);
        await dispatch(getNoteById(id));
      };
      fetchNoteById();
    }
  }, [note_id, dispatch]);

  console.log(noteReducer.note);

  return (
    <>
      <div className="flex justify-between">
        <h2>Title</h2>
        <Button type="primary">
          <Link href={`/home/note/${note_id}/edit`}>Edit</Link>
        </Button>
      </div>
      <p>by {noteReducer.note?.user.name}</p>
      <p>Create Date: {createAtFormatted}</p>
      <p>Update Date: {updateAtFormatted}</p>
      <p>Category: {noteReducer.note?.category}</p>
      <p>
        tag :
        {noteReducer.note?.tags.map((tag) => {
          return <p key={tag.id}>{tag.name}</p>;
        })}
      </p>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          {
            <div
              className="text-sm text-gray-700 mt-4 p-4 bg-slate-100 rounded-md"
              dangerouslySetInnerHTML={{
                __html: contentWithStyledTags,
              }}
            />
          }
        </div>
        <div className="col-span-4">
          <Timeline>
            {["2015-09-01", "2015-09-02", "2015-09-03", "2015-09-04"].map(
              (date, index) => (
                <Timeline.Item key={index}>
                  <Link href={`${note_id}/history/${date}`}>{date}</Link>
                </Timeline.Item>
              )
            )}
          </Timeline>
        </div>
      </div>
    </>
  );
};

export default Note;
