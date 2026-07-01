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
      match.fixture.date
    ).getTime();

  return currentTimestamp !== newTimestamp;

}