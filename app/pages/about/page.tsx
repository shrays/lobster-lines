import './about.css'
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <h1>About me: Shray Swarup</h1>
      <div className="content">
        <figure className="photo-container">
          <img className="photo" src="/profilephoto.webp" alt="Description of the photo" />
          <figcaption>Me in Florida last summer</figcaption>
        </figure>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo nulla, posuere vel diam eu, vulputate euismod dolor. Nam ipsum arcu, fermentum ut tempus in, tincidunt ut leo. Donec tincidunt ullamcorper fringilla. Sed eu sapien eu dolor sagittis sodales. Sed nunc diam, sodales vel velit eget, pretium aliquam quam. Donec tincidunt sapien placerat elit venenatis tempor. Curabitur ac nisl sagittis, lacinia dui eget, placerat nibh. Vestibulum convallis diam sit amet neque dignissim venenatis. Nam ut aliquet eros. Cras luctus, magna sit amet egestas dignissim, tortor nibh lobortis eros, vel tincidunt tortor mauris et libero. Fusce porttitor suscipit lectus, in tristique purus fringilla a. Pellentesque a porttitor magna. Pellentesque lobortis diam et tempor hendrerit.
        </p>
        <p>
          Vestibulum quis vestibulum libero. Morbi ut magna ante. Ut sollicitudin mauris a egestas sodales. Donec tempus nisl nunc. Sed imperdiet dolor non rutrum aliquam. Mauris ac augue quis nunc egestas molestie. Quisque id eros in lacus dictum tempus. Donec dignissim cursus sem interdum ullamcorper. In feugiat nibh ac tellus tristique, ut tempor tellus eleifend. Vestibulum lacinia auctor magna sodales sodales. Nullam nisl nunc, vehicula nec maximus vitae, hendrerit non arcu. Quisque egestas laoreet nunc, id egestas sapien accumsan et. Vestibulum tincidunt neque at lectus pellentesque egestas. Maecenas ipsum justo, ullamcorper at orci et, facilisis tincidunt massa.
        </p>
        <p>
          Vivamus rhoncus sit amet nibh nec viverra. Suspendisse dignissim lectus sit amet efficitur sodales. Aenean vestibulum, odio sit amet eleifend tincidunt, tellus arcu dictum arcu, id malesuada eros lectus et ante. Donec diam magna, viverra sit amet imperdiet in, sollicitudin a risus. Aliquam sagittis, urna porta tempus interdum, dolor magna congue leo, id malesuada dolor nunc ac elit. Curabitur molestie cursus nisl. Vestibulum non augue nisi.
        </p>
        <br />
        <p className='refer'>
          <span>You can find me on </span>
            <a
              className="link"
              href="https://www.linkedin.com/in/shrayswarup/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <span>, </span>
            <a
              className="link"
              href="https://github.com/shrays/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            ,<span> and </span>
            <a
              className="link"
              href="https://shrayswarup.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
        </p>
        <Link href="/pages/feedback">
          <button type="button">
              Feedback
          </button>
        </Link>
      </div>
    </>
  )
}
