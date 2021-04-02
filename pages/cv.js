import Head from "next/head";
import styles from "../styles/EOM.module.css";
import { Document } from 'react-pdf'

const CV = () => {
  return (
    <>
      <div className="page-container">
        <div className={styles.main}>
          <Document file="..." />
        </div>
      </div>
    </>
  );
};


export default CV;
