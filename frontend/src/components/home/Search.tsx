"use client";

import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes, noteSelector } from "@/store/slices/noteSlice";
import { useRouter } from "next/navigation";

type Props = {};

const Search = (props: Props) => {
  // --- Redux ---
  const dispatch = useDispatch();
  const noteReducer = useSelector(noteSelector);
  const { notes, status, error } = noteReducer;

  // --- Router ---
  const navigate = useRouter();

  // --- State ---
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const getPanelValue = (searchText: string) => {
    if (!searchText) {
      return [];
    }
    const filteredNotes = notes?.filter((note) => {
      const title = note.title.toLowerCase();
      const search = searchText.toLowerCase();
      return title.includes(search);
    });
    const optionsSet: { value: string; key: number }[] = [];
    if (!filteredNotes) {
      return optionsSet;
    } else {
      for (let i = 0; i < filteredNotes.length; i++) {
        optionsSet.push({
          value: filteredNotes[i].title,
          key: filteredNotes[i].id,
        });
      }
    }
    return optionsSet;
  };

  const onSelect = (data: string) => {
    console.log("onSelect", data);
    const note_id = notes?.find((note) => note.title === data)?.id;
    navigate.push(`/home/note/${note_id}`);
  };

  // --- Fetching Data ---
  useEffect(() => {
    if (status === "idle") {
      const fetchNotes = async () => {
        await dispatch<any>(getAllNotes());
      };
      fetchNotes();
    }
    if (notes != undefined && notes?.length >= 1 && status === "idle") {
      let optionsSet: { value: string }[];
      optionsSet = [];
      for (let i = 0; i < notes.length; i++) {
        optionsSet.push({ value: notes[i].title });
      }
      setOptions(optionsSet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <AutoComplete
      options={options}
      style={{ width: 200 }}
      onSelect={onSelect}
      onSearch={(text) => setOptions(getPanelValue(text) || [])}
      placeholder="Search Notes"
    />
  );
};

export default Search;
