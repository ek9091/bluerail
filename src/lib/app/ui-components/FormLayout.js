import React from "react";

import { Panel } from "../../shared/ui-components";
import { Logo } from "./";

export const FormLayout = ({ children, nav = null }) => {
  return (
    <div className="h-screen w-screen">
      <div className="md:flex">
        <div className="hidden md:flex justify-center items-center w-1/2 bg-blue">
          <div className="max-w-md text-center text-white">
            <h1 className="mb-2">
              <Logo />
            </h1>
            <p>Just sit back and enjoy the ride.</p>
          </div>
        </div>
        <div className="flex flex-col md:w-1/2 h-screen">
          <div className="flex flex-row-reverse p-4">{nav !== null && nav}</div>
          <div className="flex-grow flex justify-center items-center">
            <div className="w-full max-w-md">
              <Panel>{children}</Panel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
