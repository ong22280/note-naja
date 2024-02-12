"use client"

import { Button } from "antd";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-blue-900 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-300 mb-8">We apologize for the inconvenience.</p>
      <Button
        onClick={reset}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Try again
      </Button>
    </div>
  );
}
