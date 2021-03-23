import React, { forwardRef } from "react";

import { Icon } from "../../shared/ui-components";

export const MapSearch = forwardRef((props, ref) => {
  const { className = "", placeholder = "" } = props;

  return (
    <div
      className={`flex bg-med-blue text-white pr-4 items-center rounded-md ${className}`}
    >
      <input
        type="text"
        className="text-white bg-transparent py-3 px-4 flex-grow outline-none placeholder-white placeholder-opacity-40"
        placeholder={placeholder}
        ref={ref}
      />
      <Icon icon="search" />
    </div>
  );
});

export default MapSearch;
