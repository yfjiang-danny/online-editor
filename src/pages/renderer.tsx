import { MDXProvider } from "@mdx-js/react";
import React from "react";

const components = {};

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
}) => {
  const handleEditorChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange(event.target.value);
  };

  return (
    <textarea value={value} onChange={handleEditorChange} rows={10} cols={80} />
  );
};

interface MarkdownPreviewProps {
  value: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ value }) => {
  return <MDXProvider components={components}>{value}</MDXProvider>;
};
