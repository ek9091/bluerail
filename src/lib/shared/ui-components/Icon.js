import React from "react";

export const Icon = ({ icon, color = "white", size = "xl" }) => {
  return <i className={`fas fa-${icon} text-${color} text-${size}`} />;
};
