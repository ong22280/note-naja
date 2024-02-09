"use client";

import NoteList from "@/components/note/note-list";
import { Button, Select } from "antd";
import Link from "next/link";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      {/* Head */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 w-1/2">
          <h2 className="text-2xl font-bold mb-2">Notes</h2>
          <p className="text-gray-500">
            explore all notes created by you and other users.
          </p>
        </div>
        <div>
          <Button type="primary">
            <Link href="home/note/create">Create Note</Link>
          </Button>
        </div>
      </div>
      <hr className=" bg-black mt-2"></hr>
      {/* Filter */}
      <div className="flex justify-between mt-2">
        {/* Category */}
        <div className="flex gap-4 ">
          <div className="flex gap-2 items-center">
            <p>all</p>
            <Button>{100}</Button>
          </div>
          <div className="flex gap-2 items-center">
            <p>work</p>
            <Button>{20}</Button>
          </div>
          <div className="flex gap-2 items-center">
            <p>personal</p>
            <Button>{30}</Button>
          </div>
          <div className="flex gap-2 items-center">
            <p>others</p>
            <Button>{50}</Button>
          </div>
        </div>

        {/* Sort */}
        <div>
          <Select
            defaultValue="newest"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "newest", label: "Newest" },
              { value: "oldest", label: "Oldest" },
            ]}
          />
        </div>
      </div>
      {/* Note List */}
      <div className="mt-4">
        <NoteList />
      </div>
    </>
  );
};

export default Home;

// "use client";

// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
// import { authSelector, logout } from "../../../store/slices/authSlice";
// import { useRouter } from "next/navigation";
// import { showNotification } from "@/store/slices/notificationSlice";
// import { NotificationType } from "@/types/notificationType";

// const Home = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useRouter();

//   const authReducer = useAppSelector(authSelector);

//   const handleLogout = async () => {
//     try {
//       const actionResult = await dispatch(logout()).unwrap();
//       if (logout.fulfilled.match(actionResult)) {
//         return navigate.push("/log-in");
//       } else if (logout.rejected.match(actionResult)) {
//         dispatch(
//           showNotification({
//             message: "Failed to logout",
//             type: NotificationType.Error,
//           })
//         );
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <>
//       {/* Display authentication status */}
//       <div>
//         {authReducer.status === "loading" && <p>Loading...</p>}
//         {authReducer.status === "failed" && <p>Error: {authReducer.error}</p>}
//       </div>
//       <h1>Home</h1>
//       <h4>Name: {authReducer?.userInfo?.name}</h4>
//       <h4>Email: {authReducer?.userInfo?.email}</h4>
//       <button
//         className="py-2 px-4 bg-red-500 text-white rounded-md"
//         onClick={handleLogout}
//       >
//         Logout
//       </button>
//     </>
//   );
// };

// export default Home;
