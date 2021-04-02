import Head from "next/head";
import styles from "../styles/projects.module.css";
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

export const getServerSideProps = async (pageContext) => {
  const apiResponse = await fetch(
    "https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth"
  );
  const employee = await apiResponse.json();

  return {
    props: {
      employee,
    },
  };
};

export default Projects;
