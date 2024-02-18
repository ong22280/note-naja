"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  initialValue?: string;
  onChange?: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = "",
  onChange,
}) => {
  const [editorContent, setEditorContent] = useState(initialValue);

  const handleContentChange = (content: string) => {
    setEditorContent(content);
    if (onChange) {
      onChange(content);
    }
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
      value={editorContent}
      onChange={handleContentChange}
      modules={modules}
    />
  );
};

export default RichTextEditor;
