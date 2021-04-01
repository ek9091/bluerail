import React, { useRef } from "react";

export const SearchInput = (props) => {
  const { placeholder = "", onSearch = () => {} } = props;
  const inputRef = useRef();

  const handleSearch = (evt) => {
    evt.preventDefault();
    onSearch(inputRef.current.value);
  };

  return (
    <form className="flex items-center" onSubmit={handleSearch}>
      <input
        type="text"
        className="flex-grow p-2 outline-none"
        placeholder={placeholder}
        ref={inputRef}
      />
      <div className="pr-4">
        <i className="fa fa-search" />
      </div>
    </form>
  );
};

export default SearchInput;
