import { GetStaticProps } from "next";
import Nav from "../../components/nav";
import { sanityClient } from "../../utils/sanity";
import { Post } from "../../utils/typings";

interface Props {
  post: Post;
}
//interface Props allows me to destructure post from props
function Post({post}: Props) {

  console.log('here is the post: ',post);

    return (
        <>
        <main>
            <Nav />
        </main>
        </>
    )
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
    _id,
      slug {
      current
      }
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current
    }
  }))

  return ({
    paths,
    fallback: 'blocking',
  })
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const query = `*[_type=="post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug, 
    body
    }`
    // 'comments': *[
    // _type == "comment" && post.ref == ^._id && approved == true
    // ],

    const post = await sanityClient.fetch(query, {
      slug: params?.slug,
    });

    if (!post) {
      return {
        //with fallback == "blocking", returning notFound: true will make 404 pages
        notFound: true
      }
    }

    return {
      props: {
        post,
      }
    }
}