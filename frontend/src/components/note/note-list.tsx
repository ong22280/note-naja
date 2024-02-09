import React from "react";
import Note from "./note";

type Props = {};

const NoteList = (props: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {/* Your grid items go here */}
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      {/* Add more items as needed */}
    </div>
  );
};

export default NoteList;
