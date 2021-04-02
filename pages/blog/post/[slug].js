import styles from "../../../styles/Blog.module.css";
import Head from "next/head";
import { Navbar } from "../../../components/navbar";
import { useRouter } from "next/router";

export const Post = ({  article }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>

      <div className="page-container">
        <Navbar />
      </div>
    </>
  );
};
export default Post;
