import { getNextEvents } from "../services/sportsdb.js";
import { getCalendarEvents } from "../services/googleCalendar.js";
import { buildEventMap } from "../utils/eventMap.js";
import { syncMatch } from "./syncMatch.js";

export async function syncTeam(team) {

  console.log("\n==============================");
  console.log(`Sincronizando ${team.name}`);
  console.log("==============================");

  const matches = await getNextEvents(team.id);

  console.log(`Jogos encontrados: ${matches.length}`);

  const events = await getCalendarEvents(
    team.calendarId
  );

  console.log(`Eventos no calendário: ${events.length}`);

  const eventMap = buildEventMap(events);

  console.log(`Eventos indexados: ${eventMap.size}`);

  console.log("");

  for (const match of matches) {

    await syncMatch(
      team.calendarId,
      match,
      eventMap
    );

  }

  console.log(`\n✅ ${team.name} sincronizado.\n`);

}