import React from "react";

export const Appbar = ({ children }) => {
  return (
    <div>
      <div className="flex justify-between max-w-4xl mx-auto p-4 items-center">
        {children}
      </div>
    </div>
  );
};

export default Appbar;
