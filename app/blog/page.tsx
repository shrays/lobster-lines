// 'use client'

// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import { useState, useEffect } from 'react';
// import './blog.css';

// export default function BlogPage() {
//   const [markdown, setMarkdown] = useState('');

//   useEffect(() => {
//     // Fetch markdown content from the public folder
//     fetch('/post.md')
//       .then((res) => res.text())
//       .then((text) => setMarkdown(text));
//   }, []);

//   return (
//     <>
//       <h1>Developing Lobster Lines</h1>
//       <div className="content">
//         {/* Render the Markdown content */}
//         <ReactMarkdown>{markdown}</ReactMarkdown>
//       </div>
//     </>
//   );
// }

import './blog.css'
import Link from 'next/link';

export default function BlogPage() {
  return (
    <>
      <h1>Developing Lobster Lines</h1>
      <div className="content">

        <figure className="photo-container">
          <img className="photo" src="/profilephoto.webp" alt="Description of the photo" />
          <figcaption>Deloitte Consulting, 2023</figcaption>
        </figure>
        <p>
          Hello! I'm Shray, a senior at Barrett, ASU majoring in CS and minoring in business. I am interested in using my software development skills and ML/Data Engineering background to address real-world problems. I have experience in full-stack web development, data handling, and prediction modeling. Currently working on a web project calculating/visualizing a cost-of-living index using open company APIs. 
        </p>
        <br />
        
        <Link href="/pages/feedback">
          <button type="button">
              Feedback
          </button>
        </Link>
      </div>
    </>
  )
}

// export const metadata = {
//   title: 'Lobster Lines :: About',
// };