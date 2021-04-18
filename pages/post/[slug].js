import Head from "next/head";
import styles from "../../styles/Post.module.css";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from '@sanity/block-content-to-react'
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { useState, useEffect } from "react";

export const Post = ({ title, body, image }) => {
  const [imageUrl, setImageUrl] = useState("");
  const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: SANITY_PROJECT_ID,
      dataset: "production",
    });
    
    setImageUrl(imgBuilder.image(image))
  }, [image]);

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>

      <div className="page-container">
        <Navbar />
        <div className={styles.main}>
          <h1>{title}</h1>
          {imageUrl && <img className={styles.mainImage} src={imageUrl} />}
          <div className={styles.body}>
            <BlockContent blocks={body} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  const query = encodeURIComponent(
    `*[ _type == "post" &&  slug.current == "${pageSlug}" ] `
  );
  const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  if (!post) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        body: post.body,
        title: post.title,
        image: post.mainImage,
      },
    };
  }
};

export default Post;
