import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ content, className , dir = "ltr"}) => {
  return (
    <div
      dir={dir}
      className={`prose prose-lg prose-blue max-w-none ${
        className ? className : ''
      }`}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
