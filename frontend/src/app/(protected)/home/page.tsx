"use client";

import NoteList from "@/components/note/note-list";
import { Button, Tour } from "antd";
import Link from "next/link";
import React, { useRef, useState } from "react";
import type { TourProps } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import tourSVG from "../../../../public/images/undraw_product_tour_re_8bai.svg";
import Image from "next/image";

type Props = {};

const Home = (props: Props) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: "Welcome to Note App",
      description: "let's take a tour of the app.",
      cover: <Image alt="tour.png" src={tourSVG} width={200} height={200} />,
      target: () => ref1.current,
    },
    {
      title: "Create Note",
      description: "Click to create a new your note.",
      target: () => ref2.current,
    },
    {
      title: "Find Notes",
      description: "Explore all notes created by you and other users.",
      target: () => ref3.current,
    },
  ];

  return (
    <>
      {/* Head */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 w-1/2">
          <h2 className="text-2xl font-bold mb-2">
            Notes <InfoCircleOutlined onClick={() => setOpen(true)} />{" "}
          </h2>
          <p className="text-gray-500">
            explore all notes created by you and other users.
          </p>
        </div>
        <div>
          <Button type="primary" ref={ref2}>
            <Link href="home/note/create">Create Note</Link>
          </Button>
        </div>
      </div>
      <hr className=" bg-black mt-2"></hr>

      {/* Note List */}
      <div className="mt-4" ref={ref3}>
        <NoteList />
      </div>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};

export default Home;
