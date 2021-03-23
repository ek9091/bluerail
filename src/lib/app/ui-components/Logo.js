import React from "react";

export function Logo({ size = "default" }) {
  const classes = `${size === "large" ? "text-4xl" : "text-2xl"}`;

  return (
    <div className={`text-white ${classes}`}>
      Blue<span className="text-orange">rail</span>
    </div>
  );
}

export default Logo;
