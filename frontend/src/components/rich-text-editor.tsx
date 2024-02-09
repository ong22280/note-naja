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
    // console.log("Editor Content:", content);
    setEditorContent(content);
    if (onChange) onChange(content);
  };

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = (input.files as FileList)[0];
      const formData = new FormData();

      formData.append("image", file);

      try {
        const response = await fetch("YOUR_IMAGE_UPLOAD_ENDPOINT", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          if (quillRef.current && result.url) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection()?.index;
            if (range !== null && range !== undefined) {
              quill.insertEmbed(range, "image", result.url);
            }
          }
        } else {
          console.error("Failed to upload image:", await response.text());
        }
      } catch (error) {
        console.error("There was an error uploading the image:", error);
      }
    };
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
