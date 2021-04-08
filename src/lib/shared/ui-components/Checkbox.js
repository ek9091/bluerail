import React, { useState, forwardRef } from "react";

export const Checkbox = forwardRef(({ id, label, checked = false }, ref) => {
  const [isChecked, setIsChecked] = useState(checked);

  function handleChange(evt) {
    setIsChecked(evt.target.checked);
  }

  return (
    <label
      htmlFor={id}
      className="flex items-center cursor-pointer select-none"
    >
      <div className="h-5 w-5 bg-gray rounded border border-med-gray border-opacity-30 flex-none mr-2 flex items-center justify-center">
        {isChecked && <i className="fa fa-check text-blue text-sm" />}
      </div>
      {label}
      <input
        type="checkbox"
        className="w-0 h-0 opacity-0 overflow-hidden"
        id={id}
        onChange={handleChange}
        checked={isChecked}
        ref={ref}
      />
    </label>
  );
});

export default Checkbox;
