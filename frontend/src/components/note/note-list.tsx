import React, { useEffect, useState } from "react";
import { Button, Pagination, Select, Empty } from "antd";
import { getAllNotes, noteSelector } from "@/store/slices/noteSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import Note from "./note";
import { CategoryType } from "@/types/categoryTypes";
import Link from "next/link";

type Props = {};

const mockNote = Array(20).fill({
  title: "Card title",
  description: "This is the description",
  content: "Content",
});

const NoteList = (props: Props) => {
  // --- Redux ---
  const dispatch = useAppDispatch();
  const noteReducer = useAppSelector(noteSelector);

  // --- Pagination ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;
  const totalNotes = noteReducer?.notes?.length;

  const indexOfLastNote = currentPage * pageSize;
  const indexOfFirstNote = indexOfLastNote - pageSize;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // --- Category ---
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const allNumberCategory = noteReducer?.notes?.length;
  const workNumberCategory = noteReducer?.notes?.filter(
    (note) => note.category === CategoryType.WORK
  ).length;
  const personalNumberCategory = noteReducer?.notes?.filter(
    (note) => note.category === CategoryType.PERSONAL
  ).length;
  const othersNumberCategory = noteReducer?.notes?.filter(
    (note) => note.category === CategoryType.OTHERS
  ).length;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const emptyCategoryRender = (
    <div className="w-full mt-44">
      <Empty>
        <Button type="primary">
          <Link href="home/note/create">Create Note</Link>
        </Button>
      </Empty>
    </div>
  );

  // Filtered notes
  const filteredNotes = noteReducer?.notes?.filter((note) => {
    if (selectedCategory === "all") {
      return true;
    } else {
      return note.category === selectedCategory;
    }
  });

  // --- Sorting ---
  const [sortingOption, setSortingOption] = useState<string>("newest");

  const handleChange = (value: string) => {
    setSortingOption(value);
  };

  // --- Fetch notes ---
  useEffect(() => {
    if (noteReducer.status === "idle") {
      const fetchNotes = async () => {
        await dispatch(getAllNotes());
      };
      fetchNotes();
    }
  }, [dispatch]);

  // console.log(noteReducer.notes);

  return (
    <>
      {/* Filter */}
      <div className="flex justify-between mb-4">
        {/* Category */}
        <div className="flex gap-4 ">
          <div className="flex gap-2 items-center">
            <Button onClick={() => handleCategoryChange("all")}>all</Button>
            <p>{allNumberCategory}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Button onClick={() => handleCategoryChange(CategoryType.WORK)}>
              work
            </Button>
            <p>{workNumberCategory}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Button onClick={() => handleCategoryChange(CategoryType.PERSONAL)}>
              personal
            </Button>
            <p>{personalNumberCategory}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Button onClick={() => handleCategoryChange(CategoryType.OTHERS)}>
              others
            </Button>
            <p>{othersNumberCategory}</p>
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

      {/* Empty Note of Category */}
      {workNumberCategory === 0 &&
        selectedCategory === CategoryType.WORK &&
        emptyCategoryRender}
      {personalNumberCategory === 0 &&
        selectedCategory === CategoryType.PERSONAL &&
        emptyCategoryRender}
      {othersNumberCategory === 0 &&
        selectedCategory === CategoryType.OTHERS &&
        emptyCategoryRender}

      {/* Note List */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredNotes ? (
          filteredNotes
            .sort((a, b) => {
              if (sortingOption === "newest") {
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              } else {
                return (
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                );
              }
            })
            .slice(indexOfFirstNote, indexOfLastNote)
            .map((note, index) => (
              <Note
                key={index}
                title={note.title}
                content={note.content}
                id={note.id}
                createdAt={note.createdAt}
                updatedAt={note.updatedAt}
                user={{
                  id: note.user.id,
                  name: note.user.name,
                  email: note.user.email,
                  avatar: note.user.avatar,
                }}
                logs={note.logs}
                category={note.category}
                tags={note.tags}
              />
            ))
        ) : (
          <Empty />
        )}
      </div>

      {/* Pagination */}
      <div className="bottom-0 w-full flex justify-center mb-8 fixed">
        <Pagination
          defaultCurrent={1}
          total={totalNotes}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default NoteList;
