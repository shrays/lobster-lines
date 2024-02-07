import './about.css'
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <h1>About me: Shray Swarup</h1>
      <div className="content">
        <figure className="photo-container">
          <img className="photo" src="/profilephoto.webp" alt="Description of the photo" />
          <figcaption>Deloitte Consulting, 2023</figcaption>
        </figure>
        <p>
          Hello! I'm Shray, a senior at Barrett, ASU majoring in CS and minoring in business. I am interested in using my software development skills and ML/Data Engineering background to address real-world problems. I have experience in full-stack web development, data handling, and prediction modeling. Currently working on a web project calculating/visualizing a cost-of-living index using open company APIs. 
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