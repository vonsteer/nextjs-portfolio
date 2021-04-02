import Head from "next/head";
import styles from "../styles/Projects.module.css";
import { Navbar } from "../components/navbar";

const Projects = ({ projects }) => {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>

      <div className="page-container">
        <Navbar />
      </div>
    </>
  );
};


export default Projects;
