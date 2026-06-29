import {
  createMatchEvent,
  updateMatchEvent,
} from "../services/googleCalendar.js";

import { buildCalendarEvent } from "../utils/buildCalendarEvent.js";
import { compareEvents } from "../utils/compareEvents.js";

export async function syncMatch(
  calendarId,
  match,
  eventMap
) {

  const existingEvent = eventMap.get(match.idEvent);

  if (!existingEvent) {

    console.log(`➕ Criando: ${match.strEvent}`);

    await createMatchEvent(
      calendarId,
      match
    );

    return;
  }

  const desiredEvent = buildCalendarEvent(match);

  const equal = compareEvents(
    existingEvent,
    desiredEvent
  );

  if (!equal) {

    console.log(`🔄 Atualizando: ${match.strEvent}`);

    await updateMatchEvent(
      calendarId,
      existingEvent.id,
      match
    );

    return;
  }

  console.log(`✔ Sem alterações: ${match.strEvent}`);

}