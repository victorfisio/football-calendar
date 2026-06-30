import { getFixtures } from "../services/sportsdb.js";
import { getCalendarEvents } from "../services/googleCalendar.js";

import { buildEventMap } from "../utils/eventMap.js";
import { isLiveMatch } from "../utils/isLiveMatch.js";
import { logger } from "../utils/logger.js";

import { syncMatch } from "./syncMatch.js";
import { removeDuplicates } from "../cleanup/removeDuplicates.js";

export async function syncTeam(team) {

  logger.title(`Sincronizando ${team.name}`);

  const matches = await getFixtures(team.id);

  logger.info(`Jogos encontrados: ${matches.length}`);

  const liveMatches =
    matches.filter(isLiveMatch);

  if (liveMatches.length > 0) {

    console.log("");

    logger.warning("Jogos ao vivo:");

    for (const match of liveMatches) {

      console.log(match.strEvent);

      console.log(
        `Status: ${match.strStatus}`
      );

      console.log(
        `Placar: ${match.intHomeScore ?? 0}×${match.intAwayScore ?? 0}`
      );

      console.log("");

    }

  }

  if (matches.length === 0) {

    logger.warning("Nenhuma partida encontrada.");

    return;

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

}