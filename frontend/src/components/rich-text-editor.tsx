"use client";

import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

interface RichTextEditorProps {
  initialValue?: string;
  onChange?: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = "",
  onChange,
}) => {
  const [editorContent, setEditorContent] = useState(initialValue);
  const quillRef = useRef<ReactQuill | null>(null); // Create a ref

  const handleContentChange = (content: string) => {
    setEditorContent(content);
    if (onChange) onChange(content);
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
      ],
    },
  };

  return (
    <ReactQuill
      ref={quillRef}
      value={editorContent}
      onChange={handleContentChange}
      modules={modules}
    />
  );
};

export default RichTextEditor;
