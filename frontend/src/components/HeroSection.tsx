import { Button } from "antd";
import Link from "next/link";
import React from "react";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-blue-900 min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome Note <span className="text-green-600">Naja </span>
          🎉
        </h1>
        <p className="text-lg">This is a simple note taking app</p>
        <p className="text-lg text-red-300">
          * Please start backend server first *
        </p>
        <div className="mt-4">
          <Button type="primary">
            <Link href={"/sign-up"}>Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
