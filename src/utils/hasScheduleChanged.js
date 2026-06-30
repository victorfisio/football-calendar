export function hasScheduleChanged(
  currentEvent,
  match
) {

  const currentTimestamp =
    new Date(
      currentEvent.start.dateTime
    ).getTime();

  const newTimestamp =
    new Date(
      `${match.dateEvent}T${match.strTime}`
    ).getTime();

  return currentTimestamp !== newTimestamp;

}