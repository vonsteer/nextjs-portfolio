import styles from "../../styles/Blog.module.css";
import Head from "next/head";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import imageUrlBuilder from "@sanity/image-url";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import Link from 'next/link';

export const Blog = ({ pageNumber, posts, totalPages, }) => {
  const router = useRouter();
  const [mappedPosts, setMappedPosts] = useState([]);
  const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: SANITY_PROJECT_ID,
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
        <div className={styles.paginator}>
            <div
              onClick={() => {
                if (pageNumber > 1) {
                  router.push(`/blog/${pageNumber - 1}`);
                }
              }}
              className={pageNumber === 1 ? styles.disabled : styles.active}
            >
              Previous Page
            </div>
            <div>#{pageNumber}</div>
            <div
              onClick={() => {
                if (pageNumber < 5) {
                  router.push(`/blog/${pageNumber + 1}`);
                }
              }}
              className={pageNumber === totalPages ? styles.disabled : styles.active}
            >
              Next Page
            </div>
        </div>
      <Footer />
      </div>
    </>
  );
};
export default Blog;


export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.slug;

  let [start, end] = [0, 4]
  if (pageNumber > 1) {
    end = (end + 1) * pageNumber
    start = end -5
  }

  const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
  const query = encodeURIComponent(
    `*[ _type == "post" ] | order(_createdAt desc) [${start}..${end}] `
  );
  const totalQuery = encodeURIComponent(
    `count(*[ _type == "post" ])`
  );
  const totalUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${totalQuery}`;
  const totalResult = await fetch(totalUrl).then((res) => res.json());
  const totalPages = (totalResult.result + 5 - 1) / 5
  
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
        pageNumber: Number.parseInt(pageNumber),
        totalPages: totalPages,
      }
    } 
  } else {
    return {
      props: {
        posts: result.result,
        pageNumber: Number.parseInt(pageNumber),
        totalPages: totalPages,
      }
    }
  }
}