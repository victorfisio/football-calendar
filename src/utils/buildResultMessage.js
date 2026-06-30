export function buildResultMessage(match) {

  if (match.strStatus !== "FT") {
    return "";
  }

  const home = match.strHomeTeam;
  const away = match.strAwayTeam;

  const homeScore = Number(match.intHomeScore);
  const awayScore = Number(match.intAwayScore);

  if (homeScore > awayScore) {

    return `🟢 Vitória do ${home}

Placar Final
${home} ${homeScore}×${awayScore} ${away}`;

  }

  if (awayScore > homeScore) {

    return `🔴 Vitória do ${away}

Placar Final
${home} ${homeScore}×${awayScore} ${away}`;

  }

  return `🟡 Empate

Placar Final
${home} ${homeScore}×${awayScore} ${away}`;

}