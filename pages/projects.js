import styles from "../styles/Projects.module.css";
import Head from "next/head";
import { Navbar } from "../components/navbar";
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

      <div className="page-container">
        <Navbar />
        <h1>My Personal/Freelance Projects!</h1>
        <div className={styles.main}>
          <div className={styles.projects}>
            {mappedProjects.length ? (
              mappedProjects.map((p, index) => (
                <div key={index} className={styles.project}>
                  <img src={p.mainImage} alt="" />
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <p>
                    <small>{p.technologies}</small>
                  </p>
                  <a href={p.repositoryUrl}>
                    <svg
                      width="24"
                      height="24"
                      fill="var(--primary-fg-color)"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21 5.958c.009.607-.067 1.368-.134 1.923a4.163 4.163 0 0 1-.1.544C21.622 10.01 22 11.917 22 14c0 2.468-1.187 4.501-3.036 5.887C17.132 21.26 14.66 22 12 22c-2.66 0-5.132-.74-6.964-2.113C3.187 18.501 2 16.468 2 14c0-2.083.377-3.99 1.235-5.575a4.166 4.166 0 0 1-.1-.544C3.066 7.326 2.99 6.565 3 5.958c.01-.683.1-1.366.199-2.044.046-.314.118-.609.459-.795.348-.19.714-.12 1.075-.017 1.218.345 2.36.83 3.434 1.41C9.3 4.173 10.578 4 12 4c1.422 0 2.7.173 3.832.513a16.802 16.802 0 0 1 3.434-1.41c.361-.103.728-.174 1.075.016.34.186.413.481.46.795.098.678.188 1.361.198 2.044zM20 14c0-1.687-.388-4-2.5-4-.952 0-1.853.25-2.753.5-.899.25-1.797.5-2.747.5s-1.848-.25-2.747-.5c-.9-.25-1.8-.5-2.753-.5C4.394 10 4 12.32 4 14c0 1.764.827 3.231 2.236 4.287C7.66 19.356 9.69 20 12 20s4.339-.645 5.764-1.713C19.173 17.23 20 15.764 20 14zm-10 .5c0 1.38-.672 2.5-1.5 2.5S7 15.88 7 14.5 7.672 12 8.5 12s1.5 1.12 1.5 2.5zm5.5 2.5c.828 0 1.5-1.12 1.5-2.5s-.672-2.5-1.5-2.5-1.5 1.12-1.5 2.5.672 2.5 1.5 2.5z"
                      />
                    </svg>
                  </a>
                  <a href={p.previewUrl}>
                    <svg
                      width="24"
                      height="24"
                      fill="var(--primary-fg-color)"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.301 15.577C4.778 14.268 3.691 12.773 3.18 12c.51-.773 1.598-2.268 3.121-3.577C7.874 7.072 9.816 6 12 6c2.184 0 4.126 1.072 5.699 2.423 1.523 1.309 2.61 2.804 3.121 3.577-.51.773-1.598 2.268-3.121 3.577C16.126 16.928 14.184 18 12 18c-2.184 0-4.126-1.072-5.699-2.423zM12 4C9.148 4 6.757 5.395 4.998 6.906c-1.765 1.517-2.99 3.232-3.534 4.064a1.876 1.876 0 0 0 0 2.06c.544.832 1.769 2.547 3.534 4.064C6.758 18.605 9.148 20 12 20c2.852 0 5.243-1.395 7.002-2.906 1.765-1.517 2.99-3.232 3.534-4.064.411-.628.411-1.431 0-2.06-.544-.832-1.769-2.547-3.534-4.064C17.242 5.395 14.852 4 12 4zm-2 8a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                      />
                    </svg>
                  </a>
                </div>
              ))
            ) : (
              <>No Projects!</>
            )}
          </div>
        </div>
        <Footer />
      </div>
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
