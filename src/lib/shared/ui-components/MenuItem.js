import React from "react";

export const MenuItem = ({ children, separate = false, vertical = false }) => {
  const classes = `${vertical ? "pb-4" : ""} ${separate ? "pt-6" : ""}`;

  return <li className={`px-3 ${classes}`}>{children}</li>;
};

export default MenuItem;
