import React from "react";
import Head from "next/head";

import { AppLayout } from "../lib/app/ui-components";

export function Home() {
  return (
    <div>
      <Head>
        <title>Bluerail</title>
      </Head>
      <AppLayout />
    </div>
  );
}

export default Home;
