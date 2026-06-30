export function compareEvents(currentEvent, desiredEvent) {

  if (currentEvent.summary !== desiredEvent.summary) {

    console.log("Summary diferente");
    console.log("Google :", currentEvent.summary);
    console.log("Novo   :", desiredEvent.summary);

    return false;

  }

  if (
    (currentEvent.description ?? "").trim() !==
    (desiredEvent.description ?? "").trim()
  ) {

    console.log("Description diferente");

    return false;

  }

  const currentStart =
    new Date(currentEvent.start.dateTime).getTime();

  const desiredStart =
    new Date(desiredEvent.start.dateTime).getTime();

  if (currentStart !== desiredStart) {

    console.log("Start diferente");
    console.log(
      "Google :",
      currentEvent.start.dateTime
    );
    console.log(
      "Novo   :",
      desiredEvent.start.dateTime
    );

    return false;

  }

  const currentEnd =
    new Date(currentEvent.end.dateTime).getTime();

  const desiredEnd =
    new Date(desiredEvent.end.dateTime).getTime();

  if (currentEnd !== desiredEnd) {

    console.log("End diferente");

    return false;

  }

  const currentReminders =
    JSON.stringify(currentEvent.reminders ?? {});

  const desiredReminders =
    JSON.stringify(desiredEvent.reminders ?? {});

  if (currentReminders !== desiredReminders) {

    console.log("Reminders diferentes");

    return false;

  }

  return true;

}