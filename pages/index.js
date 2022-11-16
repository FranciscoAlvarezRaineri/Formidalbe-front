import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Link } from "@material-ui/core";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Formidable</title>
        <meta name="description" content="Generador de formularios dinámicos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}></main>
      <Link href="/login">Formidable</Link>
      <footer className={styles.footer}></footer>
    </div>
  );
}
