import Head from 'next/head'
import Image from 'next/image'
import { Socials } from "../components/socials";
import { Footer } from '../components/footer';
import { Navbar } from '../components/navbar';
import styles from '../styles/Home.module.css';


export default function Home() {
  return (
    <>
    <Head>
        <title>Jesse Constante | Developer</title>
        <meta
          name="description"
          content={`Jesse Constante | Developer`}
        />

        <meta property="og:title" content="Jesse Constante | Developer" />
        <meta
          property="og:description"
          content={`Jesse Constante | Developer`}
        />

        <meta property="twitter:title" content="Jesse Constante | Developer" />
        <meta
          property="twitter:description"
          content={`Jesse Constante | Developer`}
        />
    </Head>
    <body className="page-container">
      <Navbar />
      <div className="fade-in-top">
        <main className={styles.main}>
          <section className={styles.section}>
            <div className={styles.animation}>
              <Image src="/profile.jpg" alt="Me" width="250" height="250"></Image>
            </div>
            <h2>Hey, I'm Jesse! 👋</h2>
            <h1>Technical Specialist & Self-taught Dev</h1>
            <p>Based in Barcelona, Spain. I have a passion for learning and am commited to delivering the best results possible on-time regardless of any challenges presented. </p>
            <a className="button" href="mailto:jglconstante@gmail.com">Get in Touch!</a>
          </section>
          <Socials />
          <section className={styles.section}>
            <h3>Technology & Frameworks</h3>
            <p>Python</p>
            <p>Javascript</p>
            <p>Go</p>
            <p>Rust</p>
          </section>
        </main>
      </div>
      <Footer />
    </body>
    </>
  )
}
