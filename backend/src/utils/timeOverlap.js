export const isTimeOverlapping = (
  existingStartTime,
  existingEndTime,
  requestedStartTime,
  requestedEndTime
) => {
  return (
    existingStartTime < requestedEndTime && existingEndTime > requestedStartTime
  );
};
