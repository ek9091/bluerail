import React, { useRef, useState } from "react";

import {
  Button,
  TimeInput,
  DaysInput,
  FormError,
} from "../../shared/ui-components";
import { validateSchedule } from "../util-validation";

export const ScheduleForm = (props) => {
  const {
    onSchedule = () => null,
    onDelete = () => null,
    schedule = [],
  } = props;

  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const [days, setDays] = useState({});
  const [errors, setErrors] = useState({});
  const [isPending, setIsPending] = useState(false);

  function handleDaysChange(days) {
    setDays({ ...days });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (isPending) return;
    setErrors({});
    setIsPending(true);

    const inputs = {
      startTime: startTimeRef.current.value,
      endTime: endTimeRef.current.value,
      days,
    };

    let currentErrors = validateSchedule(inputs);

    if (Object.keys(currentErrors).length === 0) {
      const response = await onSchedule(inputs);

      if (response.errors) {
        currentErrors = response.errors;
      }
    }

    setIsPending(false);
    setErrors(currentErrors);
  }

  async function handleDelete(scheduleId) {
    const response = await onDelete(scheduleId);

    if (response.errors) {
      setErrors(response.errors);
    }
  }

  return (
    <>
      {errors.formError && <FormError message={errors.formError} />}
      <div className="md:flex">
        <div className="w-1/2 pr-0.5">
          <TimeInput
            label="Start time"
            dateFormat={false}
            error={errors.startTimeError}
            ref={startTimeRef}
          />
        </div>
        <div className="w-1/2 pl-0.5">
          <TimeInput
            label="End time"
            dateFormat={false}
            error={errors.endTimeError}
            ref={endTimeRef}
          />
        </div>
      </div>
      <form
        className="flex justify-center items-start md:px-4 mb-8"
        onSubmit={handleSubmit}
      >
        <DaysInput onChange={handleDaysChange} error={errors.daysError} />
        <Button label="Add" className="ml-4" type="submit" />
      </form>
      {schedule.length === 0 ? (
        <p className="py-10 text-center opacity-80 bg-gray">
          You don't have any times available on your schedule.
        </p>
      ) : (
        <table className="w-full text-center overflow-x-auto min-w-2xl">
          <thead>
            <tr>
              <th>Start time</th>
              <th>End time</th>
              <th>Days</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, index) => {
              let days = [];

              if (row.sunday) days.push("sun");
              if (row.monday) days.push("mon");
              if (row.tuesday) days.push("tue");
              if (row.wednesday) days.push("wed");
              if (row.thursday) days.push("thur");
              if (row.friday) days.push("fri");
              if (row.saturday) days.push("sat");

              return (
                <tr className={index % 2 !== 0 ? "bg-gray" : ""} key={row.id}>
                  <td>{row.startTime}</td>
                  <td>{row.endTime}</td>
                  <td>{days.join(", ")}</td>
                  <td>
                    <Button
                      variant="warning"
                      label="remove"
                      onClick={() => handleDelete(row.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ScheduleForm;
