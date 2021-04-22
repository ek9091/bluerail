import React, { useState } from "react";
import Head from "next/head";

import { Topnav, Sidenav } from "./";

export const AppLayout = ({ children, title = "", roles = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title ? `${title} |` : ""} Bluerail</title>
      </Head>
      <div className="bg-blue h-64 -mb-44 md:-mb-36">
        <Topnav onMenuOpen={() => setMenuOpen(true)} />
      </div>
      <div className="flex mx-auto max-w-4xl md:space-x-4">
        <div className="flex-none w-50">
          <Sidenav
            roles={roles}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          />
        </div>
        <div className="flex-grow pb-10">{children}</div>
      </div>
    </>
  );
};

export default AppLayout;
