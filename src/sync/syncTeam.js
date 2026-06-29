import { getFixtures } from "../services/sportsdb.js";
import { getCalendarEvents } from "../services/googleCalendar.js";
import { buildEventMap } from "../utils/eventMap.js";
import { syncMatch } from "./syncMatch.js";

export async function syncTeam(team) {

  console.log("\n==============================");
  console.log(`Sincronizando ${team.name}`);
  console.log("==============================");

  // Busca últimos + próximos jogos
  const matches = await getFixtures(team.id);

  console.log(`Jogos encontrados: ${matches.length}`);

  // Busca eventos existentes
  const calendarEvents = await getCalendarEvents(team.calendarId);

  console.log(`Eventos no calendário: ${calendarEvents.length}`);

  // Indexa eventos pelo id da TheSportsDB
  const eventMap = buildEventMap(calendarEvents);

  console.log(`Eventos indexados: ${eventMap.size}\n`);

  // Sincroniza cada partida
  for (const match of matches) {
    await syncMatch(
      team.calendarId,
      match,
      eventMap
    );
  }

  console.log(`\n✅ ${team.name} sincronizado.\n`);

}