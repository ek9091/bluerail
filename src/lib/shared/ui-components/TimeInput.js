import React, { useState, useRef, useEffect, forwardRef } from "react";

import { FormError } from "./";

export const TimeInput = forwardRef((props, ref) => {
  const {
    label,
    error,
    initialHour = "12",
    initialMinute = "00",
    initialPeriod = "AM",
  } = props;

  const [show, setShow] = useState(false);
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const [period, setPeriod] = useState(initialPeriod);
  const node = useRef();

  const time = `${hour}:${minute} ${period}`;

  const handleDocumentClick = (evt) => {
    if (node.current.contains(evt.target)) return;

    setShow(false);
  };

  function getListItems(quantity = 12, minute = false) {
    let items = [];
    const setFunc = minute ? setMinute : setHour;

    for (let i = minute ? 0 : 1; i <= quantity; i++) {
      const value = i < 10 && minute ? `0${i}` : `${i}`;
      items.push(
        <li
          className="py-1 cursor-pointer hover:bg-gray"
          onClick={() => setFunc(value)}
          key={i}
        >
          {value}
        </li>
      );
    }

    return items;
  }

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
          value={time}
          ref={ref}
          readOnly
        />
        {show && (
          <div className="absolute left-0 top-0 w-56 bg-white shadow-md rounded-md py-2 text-center">
            <p className="font-bold pb-2 border-b border-gray">{`${hour}:${minute} ${period}`}</p>
            <div className="flex h-56">
              <ul className="overflow-y-auto w-1/3 border-r border-gray">
                {getListItems(12)}
              </ul>
              <ul className="overflow-y-auto w-1/3 border-l border-gray">
                {getListItems(59, true)}
              </ul>
              <ul className="w-1/3 border-l border-gray">
                <li
                  className="py-1 cursor-pointer hover:bg-gray"
                  onClick={() => setPeriod("AM")}
                >
                  AM
                </li>
                <li
                  className="py-1 cursor-pointer hover:bg-gray"
                  onClick={() => setPeriod("PM")}
                >
                  PM
                </li>
              </ul>
            </div>
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

export default TimeInput;
