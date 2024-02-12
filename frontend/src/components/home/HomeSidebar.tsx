import { Button, Divider } from "antd";
import Link from "next/link";
import React from "react";

type Props = {};

const HomeSidebar = (props: Props) => {
  return (
    <aside className="bg-slate-800 text-white w-2/12">
      <div className="p-4">
        <Link href="/home">
          <div className="flex text-lg font-bold mb-4 gap-x-1">
            <h2>Note</h2>
            <h2 className=" text-green-600">Naja</h2>
          </div>
        </Link>
        <hr className="bg-white mb-4"></hr>
        <ul className="flex flex-col space-y-2 ">
          <li>
            <Link href="/home">
              <Button type="text" className="text-left">
                <p className="text-white font-bold">Home</p>
              </Button>
            </Link>
          </li>
          {/* <li>
            <Link href="/home/favorites">
              <Button type="text" className="text-left">
                <p className="text-white font-bold">Favorites</p>
              </Button>
            </Link>
          </li> */}
          <li>
            <Link href="/home/my-notes">
              <Button type="text" className="text-left">
                <p className="text-white font-bold">My Notes</p>
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/home/setting">
              <Button type="text" className="text-left">
                <p className="text-white font-bold">Setting</p>
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default HomeSidebar;
