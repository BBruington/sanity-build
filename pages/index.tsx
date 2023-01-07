import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Nav from '../components/nav'
import { sanityClient, urlFor } from '../utils/sanity'
import { Post } from "../utils/typings";


interface Props {
  posts: [Post];
}

const Home = (props: Props) => {

  const { posts } = props;
  console.log(posts)
  return (
    <div className="max-w-7x1 mx-auto">
      <Head>
        <title>Medium Blog </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className="flex justify-between items-center bg-yellow-400 border-y
      border-black py-10 lg:py-0">
        <div className='px-10 space-y-5'>
          <h1 className="text-6xl max-w-xl font-serif">
            <span className='underline decoration-black decoration-4'>
              Medium 
            </span>{" "}
            is a place to write, read, and connect
          </h1>
          <h2>It's easy and free to post your thinking on any topic and 
            connect with millions of readers.
          </h2>
        </div>
        <img 
        className='hidden md:inline-flex h-32 lg:h-full'
        src='https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png' 
        alt=''
        />
      </div>
      {/* posts */}
      <div>
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div>
              <img src={
                urlFor(post.mainImage).url()!
              } alt="" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
    _id,
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

export default Home
