import Link from 'next/link';
import Nav from '../components/Nav/Nav';
import Upload from '../components/Upload/Upload';

const IndexPage = () => (
  <>
    <Nav />
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/3">
        <a>post 3</a>
      </Link>
      <Link href="/abc">
        <a>post abc</a>
      </Link>
    </p>
    <Upload />
  </>
)

export default IndexPage
