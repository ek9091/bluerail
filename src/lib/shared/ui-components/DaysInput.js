import React, { useState } from "react";

import { FormError } from "./";

export const DaysInput = (props) => {
  const {
    error,
    onChange = () => {},
    initialDays = {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    },
  } = props;

  const daysMap = [
    { label: "S", key: "sunday" },
    { label: "M", key: "monday" },
    { label: "T", key: "tuesday" },
    { label: "W", key: "wednesday" },
    { label: "R", key: "thursday" },
    { label: "F", key: "friday" },
    { label: "S", key: "saturday" },
  ];

  const [days, setDays] = useState(initialDays);

  function handleDaySelect(day) {
    const newDays = { ...days, [day.key]: !days[day.key] };
    setDays({ ...newDays });
    onChange({ ...newDays });
  }

  return (
    <div>
      <ul className="flex space-x-2">
        {daysMap.map((day) => (
          <li
            className={`rounded-full h-8 w-8 flex justify-center items-center cursor-pointer select-none ${
              days[day.key] ? "bg-blue text-white" : "bg-gray"
            }`}
            key={day.key}
            onClick={() => handleDaySelect(day)}
          >
            {day.label}
          </li>
        ))}
      </ul>
      {error && <FormError message={error} />}
    </div>
  );
};

export default DaysInput;
