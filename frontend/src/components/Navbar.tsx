import { Button } from "antd";
import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="bg-gray-800 py-4 absolute w-full bg-opacity-50">
      <div className="container mx-auto flex justify-between px-4 opacity-100">
        <div className="font-bold text-xl flex gap-x-1">
          Note<p className=" text-green-400">Naja</p>
        </div>
        <ul className="flex gap-x-4 text-white">
          <li className="cursor-pointer ">
            <button className="p-1 hover:text-green-400">
              <Link href={"/log-in"}>Log In</Link>
            </button>
          </li>
          <li className="cursor-pointer">
            <Button>
              <Link href={"/sign-up"}>Sign Up</Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
