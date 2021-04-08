export function validateSchedule(inputs) {
  const {
    startTime = "",
    endTime = "",
    days = {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    },
  } = inputs;

  let errors = {};
  const timeRegex = /^([0-1]?[0-9]|2):[0-5][0-9]\s(AM|PM)$/;

  if (startTime === "") {
    errors.startTimeError = "Start time is required";
  } else if (!startTime.match(timeRegex)) {
    errors.startTimeError = "Start time appears invalid";
  }

  if (startTime === "") {
    errors.startTimeError = "Start time is required";
  } else if (!isValidTime(startTime)) {
    errors.startTimeError = "Start time appears invalid";
  }

  if (endTime === "") {
    errors.endTimeError = "End time is required";
  } else if (!isValidTime(endTime)) {
    errors.endTimeError = "End time appears invalid";
  }

  if (
    Object.keys(errors).length === 0 &&
    compareTimes(startTime, endTime) !== -1
  ) {
    errors.startTimeError = "Start time must be before end time";
  }

  if (!Object.keys(days).some((key) => days[key])) {
    errors.daysError = "At least 1 day is required";
  }

  return errors;
}

function isValidTime(time) {
  if (!time.match(/^\d{1,2}:\d{2}\s(AM|PM)$/)) return false;

  const parts = extractTimeComponents(time);

  if (parts.hour < 0 || parts.hour > 12) {
    return false;
  }

  if (parts.minute < 0 || parts.minute > 59) {
    return false;
  }

  return true;
}

function extractTimeComponents(time) {
  const parts = time.split(/:|\s/);
  parts[0] = parseInt(parts[0]);
  parts[1] = parseInt(parts[1].replace(/^0/, ""));

  return { hour: parts[0], minute: parts[1], period: parts[2] };
}

function compareTimes(time1, time2) {
  if (!isValidTime(time1) || !isValidTime(time2)) {
    return false;
  }

  const parsedTime1 = Date.parse(`01/01/1970 ${time1}`);
  const parsedTime2 = Date.parse(`01/01/1970 ${time2}`);

  if (parsedTime1 === parsedTime2) return 0;
  if (parsedTime1 > parsedTime2) return 1;
  return -1;
}
