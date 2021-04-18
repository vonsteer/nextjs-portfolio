import Head from 'next/head'
import Image from 'next/image'
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
    <div className="page-container">
      <Navbar />
      <div className="fade-in-top">
        <div className={styles.main}>
          <div className={styles.section}>
            <div className={styles.animation}>
              <Image src="/profile.jpg" alt="Me" width="250" height="250"></Image>
            </div>
            <h2>Hey, I'm Jesse! 👋</h2>
            <h1>Technical Specialist & Self-taught Dev</h1>
            <p>Based in Barcelona, Spain. I have a passion for learning and am commited to delivering the best results possible on-time regardless of any challenges presented. </p>
            <a className="button" href="mailto:jglconstante@gmail.com">Get in Touch!</a>
          <div className={styles.section}>
            <div></div>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  )
}
