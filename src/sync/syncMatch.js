import {
  createMatchEvent,
  updateMatchEvent,
} from "../services/googleCalendar.js";

import { buildCalendarEvent } from "../utils/buildCalendarEvent.js";
import { compareEvents } from "../utils/compareEvents.js";
import { hasScheduleChanged } from "../utils/hasScheduleChanged.js";

export async function syncMatch(
  calendarId,
  match,
  eventMap
) {

  const existingEvent = eventMap.get(match.idEvent);

  // Evento inexistente
  if (!existingEvent) {

    console.log(`➕ Criando: ${match.strEvent}`);

    await createMatchEvent(
      calendarId,
      match
    );

    return;

  }

  // Detecta mudança de horário
  if (hasScheduleChanged(existingEvent, match)) {

    const oldDate = new Date(existingEvent.start.dateTime);

    const newDate = new Date(
      `${match.dateEvent}T${match.strTime}`
    );

    console.log("\n🕒 Horário alterado");
    console.log(match.strEvent);

    console.log(
      oldDate.toLocaleString("pt-BR")
    );

    console.log("↓");

    console.log(
      newDate.toLocaleString("pt-BR")
    );

    console.log("");

  }

  const desiredEvent =
    buildCalendarEvent(match);

  const equal =
    compareEvents(
      existingEvent,
      desiredEvent
    );

  if (equal) {

    console.log(
      `✔ Sem alterações: ${match.strEvent}`
    );

    return;

  }

  console.log(
    `🔄 Atualizando: ${match.strEvent}`
  );

  await updateMatchEvent(
    calendarId,
    existingEvent.id,
    match
  );

}