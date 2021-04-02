import styles from "../../styles/Blog.module.css";
import Head from "next/head";
import { Navbar } from "../../components/navbar";
import { useRouter } from "next/router";

export const Blog = ({ pageNumber, articles }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <div className="page-container">
        <Navbar />
      </div>
    </>
  );
};
export default Blog;
