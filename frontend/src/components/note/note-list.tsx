import React, { useState } from "react";
import Note from "./note";
import { Pagination } from "antd";

type Props = {};

const mockNote = Array(20).fill({
  title: "Card title",
  description: "This is the description",
  content: "Content",
});

const NoteList = (props: Props) => {
  // สร้าง state เพื่อเก็บข้อมูลเกี่ยวกับ Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8; // จำนวนรายการที่แสดงในแต่ละหน้า

  // คำนวณหน้าที่ต้องการแสดงข้อมูล
  const indexOfLastNote = currentPage * pageSize;
  const indexOfFirstNote = indexOfLastNote - pageSize;

  // ฟังก์ชันสำหรับเปลี่ยนหน้า
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockNote
          .slice(indexOfFirstNote, indexOfLastNote)
          .map((note, index) => (
            <Note key={index} />
          ))}
      </div>
      <div className="bottom-0 w-full flex justify-center mb-8 fixed">
        <Pagination
          defaultCurrent={1}
          total={mockNote.length} // จำนวนรายการทั้งหมดที่มีในระบบ
          pageSize={pageSize} // จำนวนรายการที่แสดงในแต่ละหน้า
          onChange={handlePageChange} // เมื่อมีการเปลี่ยนหน้า
        />
      </div>
    </>
  );
};

export default NoteList;
