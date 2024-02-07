'use client'

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';

// import './blog.css';

export default function BlogPage() {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('/blog/development.md')
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <>
      <h1>Developing Lobster Lines</h1>
      <div className="content markdown-body">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </>
  );
}

// // export const metadata = {
// //   title: 'Lobster Lines :: About',
// // };