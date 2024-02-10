"use client";

import { Button, Timeline } from "antd";
import Link from "next/link";
import React from "react";

type Props = {
  params: { note_id: string };
};

const HistoryNote = (props: Props) => {
  const note_id = props.params.note_id;

  return (
    <>
      <div className="flex justify-between">
        <h2>Title</h2>
        <Button type="primary">
          <Link href={`/home/note/${note_id}/edit`}>Edit</Link>
        </Button>
      </div>
      <p>by ...</p>
      <p>Update Date: {`{update_date}`}</p>
      <p>CategoryType: {`{category}`}</p>
      <p>tag : {`{tag}`}</p>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">{`{content}`}</div>
        <div className="col-span-4">
          <Timeline>
            {["2015-09-01", "2015-09-02", "2015-09-03", "2015-09-04"].map(
              (date, index) => (
                <Timeline.Item key={index}>
                  <Link href={`${date}`}>{date}</Link>
                </Timeline.Item>
              )
            )}
          </Timeline>
        </div>
      </div>
    </>
  );
};

export default HistoryNote;
