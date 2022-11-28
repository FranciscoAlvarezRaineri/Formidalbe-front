import React, { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";

export default function Home() {
  useEffect(() => {
    Router.push("/login");
  });

  return (
    <Head>
      <title>Formidable</title>
      <meta name="description" content="Generador de formularios dinámicos" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
