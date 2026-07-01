import { deleteCalendarEvent } from "../services/googleCalendar.js";

export async function removeDuplicates(
  calendarId,
  calendarEvents
) {

  const groups = new Map();

  for (const event of calendarEvents) {

    const fixtureId =
      event.extendedProperties?.private?.fixtureId;

    if (!fixtureId)
      continue;

    if (!groups.has(fixtureId)) {

      groups.set(fixtureId, []);

    }

    groups.get(fixtureId).push(event);

  }

  let duplicatesRemoved = 0;

  for (const events of groups.values()) {

    if (events.length <= 1)
      continue;

    console.log(
      `⚠ Encontradas ${events.length} cópias de "${events[0].summary}".`
    );

    events.sort((a, b) => {

      const updatedA =
        new Date(a.updated).getTime();

      const updatedB =
        new Date(b.updated).getTime();

      return updatedB - updatedA;

    });

    const eventToKeep = events[0];

    console.log(
      `✔ Mantendo: ${eventToKeep.summary}`
    );

    for (let i = 1; i < events.length; i++) {

      console.log(
        `🗑 Removendo duplicado: ${events[i].summary}`
      );

      await deleteCalendarEvent(
        calendarId,
        events[i].id
      );

      duplicatesRemoved++;

    }

  }

  if (duplicatesRemoved > 0) {

    console.log(
      `\n🧹 ${duplicatesRemoved} duplicata(s) removida(s).\n`
    );

  }

}