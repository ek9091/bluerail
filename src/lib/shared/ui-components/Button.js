import React from "react";

import { Icon } from "./";

export function Button(props) {
  const {
    type = "button",
    label = "",
    onClick = () => null,
    full = false,
    disabled = false,
    variant = "primary",
    icon = null,
    align = "center",
    className = "",
    active = false,
  } = props;

  let buttonClasses = "";

  switch (variant) {
    case "primary":
      buttonClasses = `bg-blue text-white px-6 py-2 rounded`;
      break;

    case "secondary":
      buttonClasses = `bg-gray px-6 py-2 rounded text-blue`;
      break;

    case "tertiary":
      buttonClasses = `px-6 py-2 ${active ? "text-blue" : ""}`;
      break;

    case "icon":
      buttonClasses = `h-10 w-10 flex justify-center items-center bg-med-blue bg-opacity-40 rounded-full`;
      break;

    case "iconSmall":
      buttonClasses = `h-6 w-6 flex justify-center items-center bg-med-blue bg-opacity-40 rounded-full`;
      break;

    case "bare":
      buttonClasses = `${active ? "text-blue underline" : ""}`;
      break;

    case "warning":
      buttonClasses = `px-6 py-2 rounded text-red`;
      break;
  }
  const adjustments = `${full ? "w-full" : ""}`;

  return (
    <button
      className={`text-${align} ${buttonClasses} ${adjustments} ${className}`}
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
