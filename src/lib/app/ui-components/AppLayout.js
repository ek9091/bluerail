import React from "react";

import { Panel } from "../../shared/ui-components";
import { Topnav, Sidenav } from "./";

export const AppLayout = ({ children }) => {
  return (
    <>
      <div className="bg-blue h-64 -mb-36">
        <Topnav />
      </div>
      <div className="flex mx-auto max-w-6xl">
        <div className="flex-none w-56">
          <Sidenav />
        </div>
        <div className="flex-grow px-8">
          <Panel>{children}</Panel>
        </div>
        <div className="flex-none w-56"></div>
      </div>
    </>
  );
};

export default AppLayout;
