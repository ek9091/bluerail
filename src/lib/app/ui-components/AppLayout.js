import React from "react";
import Head from "next/head";

import { Topnav, Sidenav } from "./";

export const AppLayout = ({ children, title = "" }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} |` : ""} Bluerail</title>
      </Head>
      <div className="bg-blue h-64 -mb-36">
        <Topnav />
      </div>
      <div className="flex mx-auto max-w-6xl">
        <div className="flex-none w-56">
          <Sidenav />
        </div>
        <div className="flex-grow px-8 pb-10">{children}</div>
        <div className="flex-none w-56"></div>
      </div>
    </>
  );
};

export default AppLayout;
