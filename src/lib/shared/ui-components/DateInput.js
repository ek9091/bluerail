import React, { useState, useRef, forwardRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const DateInput = forwardRef((props, ref) => {
  const { label, error = "", initialDate = new Date() } = props;
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(initialDate);
  const node = useRef();

  const handleDocumentClick = (evt) => {
    if (node.current.contains(evt.target)) return;

    setShow(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <div
        className="relative h-14 mb-4 bg-gray rounded-md"
        onClick={() => setShow(true)}
        ref={node}
      >
        <label className="absolute left-4 top-0 pt-1 mb-2 transition-all cursor-text text-sm text-blue opacity-70">
          {label}
        </label>
        <input
          type="text"
          className="h-full w-full px-4 pt-5 pb-1 bg-transparent outline-none"
          onKeyDown={(evt) => evt.preventDefault()}
          ref={ref}
          value={date}
          readOnly
        />
        {show && (
          <div className="absolute left-0 top-0 z-50 bg-white shadow-md">
            <Calendar value={date} onChange={setDate} minDate={new Date()} />
          </div>
        )}
      </div>
      {error !== "" && (
        <div className="-mt-4">
          <FormError message={error} />
        </div>
      )}
    </>
  );
});

export default DateInput;
