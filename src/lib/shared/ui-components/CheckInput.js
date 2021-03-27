import React, { forwardRef, useState, useEffect } from "react";

export const CheckInput = forwardRef(({ size = "icon", label }, ref) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.value = isChecked;
  }, [isChecked]);

  return (
    <>
      <button
        className={`inline-block w-7 leading-7 mx-1 rounded-full ${
          isChecked ? "bg-blue text-white" : "bg-gray"
        }`}
        onClick={() => setIsChecked(!isChecked)}
      >
        {label}
      </button>
      <input type="hidden" ref={ref} />
    </>
  );
});
