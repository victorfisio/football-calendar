export function buildMatchStatus(match) {

  const home = match.strHomeTeam;
  const away = match.strAwayTeam;

  const homeScore = match.intHomeScore ?? 0;
  const awayScore = match.intAwayScore ?? 0;

  switch (match.strStatus) {

    case "NS":

      return `⏳ Aguardando início`;

    case "1H":

      return `🔴 AO VIVO

Placar
${home} ${homeScore}×${awayScore} ${away}`;

    case "HT":

      return `⏸ Intervalo

Placar
${home} ${homeScore}×${awayScore} ${away}`;

    case "2H":

      return `🔴 AO VIVO

Placar
${home} ${homeScore}×${awayScore} ${away}`;

    case "ET":

      return `🕒 Prorrogação

Placar
${home} ${homeScore}×${awayScore} ${away}`;

    case "PEN":

      return `⚽ Disputa de pênaltis

Placar
${home} ${homeScore}×${awayScore} ${away}`;

    case "FT":

      return "";

    case "PST":

      return `📅 Partida adiada`;

    case "CANC":

      return `❌ Partida cancelada`;

    default:

      return "";

  }

}