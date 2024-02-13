import MyNoteList from "@/components/my-note/my-note-list";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

type Props = {};

const MyNote = (props: Props) => {
  return (
    <>
      {/* Head */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 w-1/2">
          <h2 className="text-2xl font-bold mb-2">My Notes</h2>
          <p className="text-gray-500">You can see all of your notes here.</p>
        </div>
        <div>
          <Button type="primary">
            <Link href="note/create">Create Note</Link>
          </Button>
        </div>
      </div>
      <hr className=" bg-black mt-2"></hr>

      {/* Note List */}
      <div className="mt-4">
        <MyNoteList />
      </div>
    </>
  );
};

export default MyNote;
