export function buildCalendarEvent(match, colorId) {

  const home = match.teams.home.name;
  const away = match.teams.away.name;

  const start = new Date(match.fixture.date);

  // duração padrão
  const end = new Date(start);
  end.setHours(end.getHours() + 2);

  const league = match.league.name;
  const round = match.league.round ?? "";

  const venue =
    match.fixture.venue?.name
      ? `${match.fixture.venue.name}${
          match.fixture.venue.city
            ? ` - ${match.fixture.venue.city}`
            : ""
        }`
      : "";

  const status = match.fixture.status.long;

  const goalsHome =
    match.goals.home === null
      ? "-"
      : match.goals.home;

  const goalsAway =
    match.goals.away === null
      ? "-"
      : match.goals.away;

  return {

    summary: `${home} x ${away}`,

    description:
`Competição: ${league}
Rodada: ${round}

Status: ${status}

Placar:
${home} ${goalsHome} x ${goalsAway} ${away}

Fixture ID: ${match.fixture.id}`,

    location: venue,

    start: {
      dateTime: start.toISOString(),
      timeZone: "America/Sao_Paulo",
    },

    end: {
      dateTime: end.toISOString(),
      timeZone: "America/Sao_Paulo",
    },

    colorId,

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

    extendedProperties: {

      private: {

        fixtureId: String(match.fixture.id),

      },

    },

  };

}