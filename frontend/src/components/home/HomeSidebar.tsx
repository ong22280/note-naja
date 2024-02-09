import Link from "next/link";
import React from "react";

type Props = {};

const HomeSidebar = (props: Props) => {
  return (
    <aside className="bg-slate-800 text-white h-screen w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/5 xl:w-1/6">
      <div className="p-4">
        <Link href="/home">
          <div className="flex text-lg font-bold mb-4 gap-x-1">
            <h2>Note</h2>
            <h2 className=" text-green-400">Naja</h2>
          </div>
        </Link>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </aside>
  );
};

export default HomeSidebar;
