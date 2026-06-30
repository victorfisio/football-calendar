import { COMPETITIONS } from "../config/competitions.js";
import { SETTINGS } from "../config/settings.js";

import { buildSummary } from "./buildSummary.js";
import { buildResultMessage } from "./buildResultMessage.js";
import { buildMatchStatus } from "./buildMatchStatus.js";

export function buildCalendarEvent(match) {

  const competition =
    COMPETITIONS[match.strLeague] ?? {
      emoji: SETTINGS.DEFAULT_COMPETITION_EMOJI,
      name: match.strLeague,
    };

  const start =
    new Date(`${match.dateEvent}T${match.strTime}`);

  const end =
    new Date(
      start.getTime() +
      SETTINGS.MATCH_DURATION_MINUTES * 60 * 1000
    );

  const statusMessage =
    buildMatchStatus(match);

  const resultMessage =
    buildResultMessage(match);

  const sections = [

    `🏆 Competição
${competition.name}`,

    `🏟 Estádio
${match.strVenue ?? "A definir"}`,

    `📅 Rodada
${match.intRound ?? "-"}`

  ];

  if (statusMessage) {

    sections.push(statusMessage);

  }

  if (resultMessage) {

    sections.push(resultMessage);

  }

  sections.push("🤖 Football Calendar");

  const description =
    sections.join("\n\n━━━━━━━━━━━━━━━━━━\n\n");

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
          minutes: 60,
        },
        {
          method: "popup",
          minutes: 0,
        },
      ],
    },

  };

}