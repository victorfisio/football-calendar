import { deleteCalendarEvent } from "../services/googleCalendar.js";

export async function removeMissingMatches(
  calendarId,
  calendarEvents,
  matches
) {

  const validFixtureIds =
    new Set(
      matches.map(match =>
        String(match.fixture.id)
      )
    );

  let removed = 0;

  for (const event of calendarEvents) {

    const fixtureId =
      event.extendedProperties?.private?.fixtureId;

    if (!fixtureId)
      continue;

    if (validFixtureIds.has(String(fixtureId)))
      continue;

    console.log(
      `🗑 Removendo jogo inexistente: ${event.summary}`
    );

    await deleteCalendarEvent(
      calendarId,
      event.id
    );

    removed++;

  }

  if (removed > 0) {

    console.log("");

    console.log(
      `🧹 ${removed} jogo(s) removido(s) do calendário.`
    );

    console.log("");

  }

}