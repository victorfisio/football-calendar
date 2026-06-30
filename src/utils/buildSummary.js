export function buildSummary(match) {

  const home = match.strHomeTeam;
  const away = match.strAwayTeam;

  const homeScore = match.intHomeScore ?? 0;
  const awayScore = match.intAwayScore ?? 0;

  const score =
    `${home} ${homeScore}×${awayScore} ${away}`;

  switch (match.strStatus) {

    // Não iniciado
    case "NS":
      return `⏳ ${home} × ${away}`;

    // Em andamento
    case "1H":
    case "2H":
      return `🔴 ${score}`;

    // Intervalo
    case "HT":
      return `⏸ ${score}`;

    // Prorrogação
    case "ET":
      return `🕒 ${score}`;

    // Pênaltis
    case "PEN":
      return `⚽ ${score}`;

    // Encerrado
    case "FT":
      return `✅ ${score}`;

    // Adiado
    case "PST":
      return `📅 ${home} × ${away}`;

    // Cancelado
    case "CANC":
      return `❌ ${home} × ${away}`;

    // Qualquer outro status da API
    default:
      return `🏆 ${home} × ${away}`;

  }

}