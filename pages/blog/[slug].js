import styles from "../../styles/Blog.module.css";
import Head from "next/head";
import { Navbar } from "../../components/navbar";
import imageUrlBuilder from "@sanity/image-url";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import Link from 'next/link';

export const Blog = ({ posts }) => {
  const router = useRouter();
  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: "3fhf9z46",
        dataset: "production",
      });

      setMappedPosts(posts.map(p => {
        return {
          ...p,
          mainImage: imgBuilder.image(p.mainImage).width(500).height(250)
        }
      }))

    }
    else {
      setMappedPosts([])
    }
  }, [posts])

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <div className="page-container">
        <Navbar />
        <h1>Welcome To My Blog!</h1>
        <div className={styles.main}>
          <div className={styles.feed}>
          {mappedPosts.length ? mappedPosts.map((p, index) => (
            <Link href={`/post/${p.slug.current}`}>
              <div key={index} className={styles.post}>
              <h3>{p.title}</h3>
              <img src={p.mainImage} alt=""/>
            </div></Link>
          )) : <>No Posts!</>}
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;


export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  const query = encodeURIComponent(
    `*[ _type == "post" ] `
  );
  const url = `https://3fhf9z46.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());
  
  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      }
    } 
  } else {
    return {
      props: {
        posts: result.result,
      }
    }
  }
}