import { Button } from "antd";
import React from "react";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-blue-900 min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Your Website</h1>
        <p className="text-lg">This is a beautiful hero section.</p>
        <div className="mt-4">
          <Button type="primary">Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
