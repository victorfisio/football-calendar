import { getFixtures } from "../services/sportsdb.js";
import { getCalendarEvents } from "../services/googleCalendar.js";
import { buildEventMap } from "../utils/eventMap.js";
import { syncMatch } from "./syncMatch.js";
import { removeDuplicates } from "../cleanup/removeDuplicates.js";
import { isLiveMatch } from "../utils/isLiveMatch.js";

export async function syncTeam(team) {

  console.log("\n==============================");
  console.log(`Sincronizando ${team.name}`);
  console.log("==============================");

  // Busca partidas
  const matches = await getFixtures(team.id);

  console.log(`Jogos encontrados: ${matches.length}`);

  // Verifica se existe jogo ao vivo
  const liveMatches = matches.filter(isLiveMatch);

  if (liveMatches.length > 0) {

    console.log("");
    console.log("🔴 Jogos ao vivo:");

    for (const match of liveMatches) {

      console.log(`${match.strEvent}`);
      console.log(`Status: ${match.strStatus}`);
      console.log(
        `Placar: ${match.intHomeScore ?? 0}×${match.intAwayScore ?? 0}`
      );

      console.log("");

    }

  }

  // Nenhuma partida encontrada
  if (matches.length === 0) {

    console.log("⚠ Nenhuma partida encontrada.\n");

    return false;

  }

  // Busca eventos existentes
  let calendarEvents =
    await getCalendarEvents(team.calendarId);

  console.log(
    `Eventos no calendário: ${calendarEvents.length}`
  );

  // Remove duplicatas
  await removeDuplicates(
    team.calendarId,
    calendarEvents
  );

  // Recarrega eventos após limpeza
  calendarEvents =
    await getCalendarEvents(team.calendarId);

  console.log(
    `Eventos após limpeza: ${calendarEvents.length}`
  );

  // Indexa eventos
  const eventMap =
    buildEventMap(calendarEvents);

  console.log(
    `Eventos indexados: ${eventMap.size}\n`
  );

  // Sincroniza partidas
  for (const match of matches) {

    await syncMatch(
      team.calendarId,
      match,
      eventMap
    );

  }

  console.log(
    `\n✅ ${team.name} sincronizado.\n`
  );

  // Retorna se existe jogo ao vivo
  return liveMatches.length > 0;

}