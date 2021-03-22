import React from "react";

export function Panel({ children }) {
  return (
    <div className="w-full bg-white p-5 shadow-md rounded-md">{children}</div>
  );
}

export default Panel;
