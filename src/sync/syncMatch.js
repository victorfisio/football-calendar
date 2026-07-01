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

  eventMap,

  colorId

) {

  const existingEvent =
    eventMap.get(
      String(match.fixture.id)
    );

  // Evento inexistente

  if (!existingEvent) {

    console.log(
      `➕ Criando: ${match.teams.home.name} x ${match.teams.away.name}`
    );

    await createMatchEvent(

      calendarId,

      match,

      colorId

    );

    return;

  }

  // Mudança de horário

  if (

    hasScheduleChanged(

      existingEvent,

      match

    )

  ) {

    const oldDate =
      new Date(
        existingEvent.start.dateTime
      );

    const newDate =
      new Date(
        match.fixture.date
      );

    console.log("");

    console.log("🕒 Horário alterado");

    console.log(
      `${match.teams.home.name} x ${match.teams.away.name}`
    );

    console.log("");

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
    buildCalendarEvent(

      match,

      colorId

    );

  const equal =
    compareEvents(

      existingEvent,

      desiredEvent

    );

  if (equal) {

    console.log(
      `✔ Sem alterações: ${match.teams.home.name} x ${match.teams.away.name}`
    );

    return;

  }

  console.log(
    `🔄 Atualizando: ${match.teams.home.name} x ${match.teams.away.name}`
  );

  await updateMatchEvent(

    calendarId,

    existingEvent.id,

    match,

    colorId

  );

}