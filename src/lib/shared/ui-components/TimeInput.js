import React, { useState, forwardRef } from "react";

import DateTime from "react-datetime";

import { FormError } from "./";

export const TimeInput = forwardRef((props, ref) => {
  const { label, error, dateFormat = true, initialValue = Date.now() } = props;

  return (
    <>
      <div className="h-14 mb-4 px-4 bg-gray rounded-md">
        <label className="pt-1 mb-2 transition-all cursor-text text-sm text-blue opacity-70">
          {label}
        </label>
        <div>
          <DateTime
            dateFormat={dateFormat}
            initialValue={initialValue}
            ref={ref}
          />
        </div>
      </div>
      {error !== "" && (
        <div className="-mt-4">
          <FormError message={error} />
        </div>
      )}
    </>
  );
});

export default TimeInput;
