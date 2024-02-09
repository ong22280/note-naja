import { Button, Timeline } from "antd";
import React from "react";

type Props = {};

const Note = (props: Props) => {
  return (
    <>
      <div className="flex justify-between">
        <h2>Title</h2>
        <Button type="primary">Edit</Button>
      </div>
      <p>by ...</p>
      <p>Update Date: {`{update_date}`}</p>
      <p>Category: {`{category}`}</p>
      <p>tag : {`{tag}`}</p>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">{`{content}`}</div>
        <div className="col-span-4">
          <Timeline
            items={[
              {
                children: "Create a services site 2015-09-01",
              },
              {
                children: "Solve initial network problems 2015-09-01",
              },
              {
                children: "Technical testing 2015-09-01",
              },
              {
                children: "Network problems being solved 2015-09-01",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Note;
