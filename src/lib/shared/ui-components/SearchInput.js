import React, { forwardRef } from "react";

export const SearchInput = forwardRef((props, ref) => {
  const { placeholder = "" } = props;

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="flex-grow p-2 outline-none"
        ref={ref}
        placeholder={placeholder}
      />
      <div className="pr-4">
        <i className="fa fa-search" />
      </div>
    </div>
  );
});

export default SearchInput;
