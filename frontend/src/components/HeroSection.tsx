import { Button } from "antd";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import DemoImage from "@/assets/demo.png";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-blue-900 min-h-screen flex items-center justify-center text-white">
      <div className=" grid grid-cols-12 gap-x-16 mx-auto container">
        <div className=" col-span-5 h-full flex items-center">
          <div>
            <h1 className="text-5xl font-bold mb-4">
              Welcome Note <span className="text-green-600">Naja </span>
              🎉
            </h1>
            <p className="text-lg">This is a simple note taking app</p>
            <p className="text-lg text-red-300">
              * Please start backend server first *
            </p>
            <div className="mt-4">
              <Link href="/sign-up">
                <Button type="primary">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-7 flex justify-center">
          <div className=" rounded-xl">
            <Image
              width={800}
              height={600}
              src={DemoImage}
              alt={""}
              className=" rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
