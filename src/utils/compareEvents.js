export function compareEvents(currentEvent, desiredEvent) {

  if (currentEvent.summary !== desiredEvent.summary) {
    return false;
  }

  if (
    (currentEvent.description ?? "").trim() !==
    (desiredEvent.description ?? "").trim()
  ) {
    return false;
  }

  const currentStart =
    new Date(currentEvent.start.dateTime).getTime();

  const desiredStart =
    new Date(desiredEvent.start.dateTime).getTime();

  if (currentStart !== desiredStart) {
    return false;
  }

  const currentEnd =
    new Date(currentEvent.end.dateTime).getTime();

  const desiredEnd =
    new Date(desiredEvent.end.dateTime).getTime();

  if (currentEnd !== desiredEnd) {
    return false;
  }

  return true;

}