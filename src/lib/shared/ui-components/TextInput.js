import React, { forwardRef, useState } from "react";

import { FormError } from "./FormError";

export const TextInput = forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const { type, label = "", error = "" } = props;

  const domId = label
    .toLowerCase()
    .split(/\s/g)
    .map((word, index) =>
      index > 0 ? `${word.substr(0, 1).toUpperCase()}${word.substr(1)}` : word
    )
    .join("");

  const classes = `${
    isFocused
      ? "text-sm top-0 translate-y-0 text-blue"
      : "text-md top-1/2 -translate-y-1/2"
  }`;

  return (
    <>
      <div className="relative h-14 mb-4 bg-gray">
        <label
          htmlFor={domId}
          className={`absolute transform px-4 pt-1 transition-all opacity-40 cursor-text ${classes}`}
        >
          {label}
        </label>
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(ref.current.value.length > 0)}
          type={type}
          ref={ref}
          className="h-full w-full px-4 pt-5 pb-1 bg-transparent outline-none"
          id={domId}
        />
      </div>
      {error !== "" && (
        <div className="-mt-4">
          <FormError message={error} />
        </div>
      )}
    </>
  );
});

export default TextInput;
