import React from "react";

import { Icon } from "./";

export function Button(props) {
  const {
    type = "button",
    label = "",
    onClick = null,
    full = false,
    disabled = false,
    variant = "primary",
    icon = null,
    align = "center",
  } = props;

  let classes = "";

  switch (variant) {
    case "primary":
      classes = `bg-blue text-white px-6 py-2 rounded`;
      break;

    case "secondary":
      classes = `bg-gray px-6 py-2 rounded text-blue`;
      break;

    case "tertiary":
      classes = `px-6 py-2`;
      break;

    case "icon":
      classes = `h-10 w-10 flex justify-center items-center bg-med-blue bg-opacity-40 rounded-full`;
      break;

    case "bare":
      classes = ``;
  }
  const adjustments = `${full ? "w-full" : ""}`;

  return (
    <button
      className={`text-${align} ${classes} ${adjustments}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon !== null && (
        <span className="mr-2 inline-block w-5 text-center">
          <Icon size="md" color="black" icon={icon} />
        </span>
      )}
      {label}
    </button>
  );
}

export default Button;
