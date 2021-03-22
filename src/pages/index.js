import React from "react";
import Head from "next/head";

export function Home() {
  return (
    <div>
      <Head>
        <title>Bluerail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center text-2xl font-bold px-4 py-12">
        Move along. Nothing to see here.
      </h1>
    </div>
  );
}

export default Home;
