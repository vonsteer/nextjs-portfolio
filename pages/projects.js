import styles from "../styles/Projects.module.css";
import Head from "next/head";
import { Navbar } from "../components/navbar";
import { LinkIcon } from "../components/linkicon";
import { Footer } from "../components/footer";
import imageUrlBuilder from "@sanity/image-url";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const Projects = ({ projects }) => {
  const router = useRouter();
  const [mappedProjects, setMappedProjects] = useState([]);
  const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
  useEffect(() => {
    if (projects.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: SANITY_PROJECT_ID,
        dataset: "production",
      });

      setMappedProjects(
        projects.map((p) => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          };
        })
      );
    } else {
      setMappedProjects([]);
    }
  }, [projects]);

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>

      <body className="page-container">
        <Navbar />
        <h1>My Personal/Freelance Projects!</h1>
        <main className={styles.main}>
          <section className={styles.projects}>
            {mappedProjects.length ? (
              mappedProjects.map((p, index) => (
                <div key={index} className={styles.project}>
                  <img src={p.mainImage} alt="" />
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <p>
                    <small>{p.technologies}</small>
                  </p>
                  <LinkIcon link={p.repositoryUrl} icon="github" />
                  <LinkIcon link={p.previewUrl} icon="eye" />
                </div>
              ))
            ) : (
              <>No Projects!</>
            )}
          </section>
        </main>
        <Footer />
      </body>
    </>
  );
};
export default Projects;

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.slug;

  const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
  const query = encodeURIComponent(
    `*[ _type == "project" ] | order(_createdAt desc)`
  );
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        projects: [],
      },
    };
  } else {
    return {
      props: {
        projects: result.result,
      },
    };
  }
};
