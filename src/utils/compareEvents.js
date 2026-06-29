export function compareEvents(googleEvent, calendarEvent) {

  if (googleEvent.summary !== calendarEvent.summary) {
    return false;
  }

  if (googleEvent.description !== calendarEvent.description) {
    return false;
  }

  const googleStart = new Date(
    googleEvent.start.dateTime
  ).getTime();

  const desiredStart = new Date(
    calendarEvent.start.dateTime
  ).getTime();

  if (googleStart !== desiredStart) {
    return false;
  }

  const googleEnd = new Date(
    googleEvent.end.dateTime
  ).getTime();

  const desiredEnd = new Date(
    calendarEvent.end.dateTime
  ).getTime();

  if (googleEnd !== desiredEnd) {
    return false;
  }

  return true;

}