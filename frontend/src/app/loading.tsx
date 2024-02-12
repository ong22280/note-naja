import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-8 border-t-8 border-gray-200 rounded-full w-24 h-24 animate-spin"></div>
    </div>
  );
}
