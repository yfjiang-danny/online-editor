import React, { useState } from "react";
import { MarkdownEditor, MarkdownPreview } from "./renderer";

const IndexPage = () => {
  const [markdown, setMarkdown] = useState("# Hello, world!");

  const handleEditorChange = (value: string) => {
    setMarkdown(value);
  };

  return (
    <div>
      <MarkdownEditor value={markdown} onChange={handleEditorChange} />
      <MarkdownPreview value={markdown} />
    </div>
  );
};

export default IndexPage;
