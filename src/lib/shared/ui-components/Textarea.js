import React, { forwardRef, useEffect } from "react";

import { FormError } from "./FormError";

export const Textarea = forwardRef((props, ref) => {
  const { error = "", placeholder = "", size = "default" } = props;

  const classes =
    size === "long" ? "h-80" : size === "medium" ? "h-40" : "h-20";

  return (
    <>
      <textarea
        className={`w-full resize-none bg-gray rounded-md p-4 outline-none ${classes}`}
        placeholder={placeholder}
      />
      {error !== "" && <FormError message={error} />}
    </>
  );
});

export default Textarea;
