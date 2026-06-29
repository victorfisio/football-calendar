export function buildSummary(match) {

  const home = match.strHomeTeam;
  const away = match.strAwayTeam;

  const homeScore = match.intHomeScore;
  const awayScore = match.intAwayScore;

  const finished =
    match.strStatus === "FT" &&
    homeScore !== null &&
    awayScore !== null;

  if (finished) {
    return `🏆 ${home} ${homeScore}×${awayScore} ${away}`;
  }

  return `🏆 ${home} × ${away}`;

}