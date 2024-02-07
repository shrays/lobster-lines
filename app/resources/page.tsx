'use client'

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';

export default function ResourcesPage() {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('/blog/resources.md')
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <>
      <h1>Credits and Technical Resources</h1>
      <div className="content markdown-body">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </>
  );
}
