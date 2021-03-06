import React from "react";

export function Panel({ children, color = "white", padding = 5 }) {
  const classes = `bg-${color} p-${padding}`;

  return (
    <div className={`relative w-full shadow-sm rounded-md ${classes}`}>
      {children}
    </div>
  );
}

export default Panel;
