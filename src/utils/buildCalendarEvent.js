import { COMPETITIONS } from "../config/competitions.js";
import { SETTINGS } from "../config/settings.js";
import { buildSummary } from "./buildSummary.js";

export function buildCalendarEvent(match) {

  const competition =
    COMPETITIONS[match.strLeague] ?? {
      emoji: SETTINGS.DEFAULT_COMPETITION_EMOJI,
      name: match.strLeague,
    };

  const start = new Date(`${match.dateEvent}T${match.strTime}`);

  const end = new Date(
    start.getTime() +
      SETTINGS.MATCH_DURATION_MINUTES * 60 * 1000
  );

  const description =
`🏆 Competição
${competition.name}

🏟 Estádio
${match.strVenue ?? "A definir"}

📅 Rodada
${match.intRound ?? "-"}

🤖 Football Calendar`;

  return {

    summary: buildSummary(match),

    description,

    start: {
      dateTime: start.toISOString(),
      timeZone: SETTINGS.TIMEZONE,
    },

    end: {
      dateTime: end.toISOString(),
      timeZone: SETTINGS.TIMEZONE,
    },

    extendedProperties: {
      private: {
        sportsdbId: match.idEvent,
      },
    },

    reminders: {
      useDefault: false,
      overrides: [
        {
          method: "popup",
          minutes: SETTINGS.REMINDER_MINUTES,
        },
      ],
    },

  };

}