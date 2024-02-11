import './about.css'
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <h1>About me</h1>
      <div className="content">
        {/* <figure className="photo-container">
          <img className="photo" src="/_.webp" alt="Description" />
          <figcaption>Caption</figcaption>
        </figure> */}
        <p>
          Hey! I’m Shray, a recent CS grad with a background in ML/data engineering, data visualization, and web development! I have experience working with and leading software development teams in full-stack projects involving prediction modeling, model bias detection, and more! Currently working on a web project calculating/visualizing a cost-of-living index based on region restaurant pricing.
        </p>
        <br />
        <p className='refer'>
          <span>You can find me on my </span>
            <a
              className="link"
              href="https://shrayswarup.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
            <span>, </span>
            <a
              className="link"
              href="https://www.linkedin.com/in/shrayswarup/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            ,<span> and </span>
            <a
              className="link"
              href="https://github.com/shrays/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            . Or <a className="link" href="mailto:shrayswarup.com">email me</a>!

        </p>
        <Link href="/feedback">
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