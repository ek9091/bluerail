import React from "react";

export function Button(props) {
  const {
    type = "button",
    label = "",
    onClick = null,
    full = false,
    disabled = false,
    variant = "primary",
  } = props;

  let classes = "";

  switch (variant) {
    case "primary":
      classes = `bg-blue text-white px-6 py-2 rounded`;
      break;

    case "secondary":
      classes = `bg-gray px-6 py-2 rounded`;
      break;

    case "tertiary":
      classes = `px-6 py-2`;
  }
  const adjustments = `${full ? "w-full" : ""}`;

  return (
    <button
      className={`${classes} ${adjustments}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
