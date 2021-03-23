import React, { Children, cloneElement } from "react";

export const Menu = ({ children, vertical = false }) => {
  const classes = `${vertical ? "flex-col" : "flex-row"}`;

  return (
    <ul className={`flex ${classes}`}>
      {Children.toArray(children).map((child) =>
        cloneElement(child, { vertical })
      )}
    </ul>
  );
};

export default Menu;
