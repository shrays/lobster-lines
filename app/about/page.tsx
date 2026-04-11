"use client";

import "./about.css";
import Link from "next/link";

const email = "hello" + String.fromCharCode(64) + "shrayswarup" + String.fromCharCode(46) + "com";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-grid">
        <div className="about-card about-bio">
          <h2>Lobster Lines</h2>
          <p>
            Lobster Lines is a real-time dashboard that maps wait times for
            every Red Lobster in North America. It pulls live reservation data
            to show you which locations are open, which have a wait, and how
            long you'd be standing around (a rare occurrence). I built it in
            2024 because I wanted to see what you could do with publicly
            available restaurant APIs and a map.
          </p>
          <br />
          <p>
            Red Lobster has changed their APIs a few times since launch, so part
            of the challenge has been adapting to keep the data flowing. Check
            out the blog below if you want to know how it all works under the
            hood.
          </p>
        </div>

        <div className="about-card about-links">
          <h2>Find me</h2>
          <div className="link-grid">
            <a
              className="link-item"
              href="https://shrayswarup.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="link-label">Website</span>
              <span className="link-url">shrayswarup.com</span>
            </a>
            <a
              className="link-item"
              href="https://www.linkedin.com/in/shrayswarup/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="link-label">LinkedIn</span>
              <span className="link-url">in/shrayswarup</span>
            </a>
            <a
              className="link-item"
              href="https://github.com/shrays/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="link-label">GitHub</span>
              <span className="link-url">shrays</span>
            </a>
            <a className="link-item" href={`mailto:${email}`}>
              <span className="link-label">Email</span>
              <span className="link-url">{email}</span>
            </a>
          </div>
        </div>

        <div className="about-card about-blog-section">
          <h2>Blog</h2>
          <div className="blog-links">
            <Link href="/blog" className="blog-item">
              <span className="blog-item-title">Development</span>
              <span className="blog-item-desc">
                The inspiration, the tech, and what's next
              </span>
              <span className="blog-arrow">Read more &rarr;</span>
            </Link>
            <Link href="/resources" className="blog-item">
              <span className="blog-item-title">Resources</span>
              <span className="blog-item-desc">
                Credits and technical resources
              </span>
              <span className="blog-arrow">Read more &rarr;</span>
            </Link>
          </div>
        </div>

        <Link href="/feedback" className="about-card about-feedback">
          <h2>Feedback</h2>
          <p>Got a suggestion, bug report, or question? Let me know.</p>
          <span className="feedback-arrow">Leave feedback &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
