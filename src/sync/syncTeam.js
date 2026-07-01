import { getFixtures } from "../services/apiFootball.js";
import { getCalendarEvents } from "../services/googleCalendar.js";

import { buildEventMap } from "../utils/eventMap.js";
import { isLiveMatch } from "../utils/isLiveMatch.js";
import { logger } from "../utils/logger.js";

import { syncMatch } from "./syncMatch.js";

import { removeDuplicates } from "../cleanup/removeDuplicates.js";
import { removeMissingMatches } from "../cleanup/removeMissingMatches.js";

export async function syncTeam(team) {

  logger.title(`Sincronizando ${team.name}`);

  const matches =
    await getFixtures(team.id);

  logger.info(
    `Jogos encontrados: ${matches.length}`
  );

  const liveMatches =
    matches.filter(isLiveMatch);

  if (liveMatches.length > 0) {

    console.log("");

    logger.warning("Jogos ao vivo:");

    for (const match of liveMatches) {

      console.log(
        `${match.teams.home.name} x ${match.teams.away.name}`
      );

      console.log(
        `Status: ${match.fixture.status.long}`
      );

      console.log(
        `Placar: ${match.goals.home ?? 0} × ${match.goals.away ?? 0}`
      );

      console.log("");

    }

  }

  if (matches.length === 0) {

    logger.warning(
      "Nenhuma partida encontrada."
    );

    return liveMatches.length > 0;

  }

  let calendarEvents =
    await getCalendarEvents(team.calendarId);

  logger.info(
    `Eventos no calendário: ${calendarEvents.length}`
  );

  await removeDuplicates(
    team.calendarId,
    calendarEvents
  );

  calendarEvents =
    await getCalendarEvents(team.calendarId);

  logger.info(
    `Eventos após limpeza: ${calendarEvents.length}`
  );

  await removeMissingMatches(
    team.calendarId,
    calendarEvents,
    matches
  );

  calendarEvents =
    await getCalendarEvents(team.calendarId);

  logger.info(
    `Eventos após remover partidas inexistentes: ${calendarEvents.length}`
  );

  const eventMap =
    buildEventMap(calendarEvents);

  logger.info(
    `Eventos indexados: ${eventMap.size}`
  );

  console.log("");

  for (const match of matches) {

    await syncMatch(
      team.calendarId,
      match,
      eventMap
    );

  }

  console.log("");

  logger.success(
    `${team.name} sincronizado.`
  );

  console.log("");

  return liveMatches.length > 0;

}