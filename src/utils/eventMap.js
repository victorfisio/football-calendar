export function buildEventMap(events) {

  const map = new Map();

  for (const event of events) {

    // Novo formato
    let sportsdbId =
      event.extendedProperties?.private?.sportsdbId;

    // Compatibilidade com versões antigas
    if (!sportsdbId && event.description) {

      const match = event.description.match(
        /TheSportsDB\s+(\d+)/
      );

      if (match) {
        sportsdbId = match[1];
      }

    }

    if (sportsdbId) {
      map.set(sportsdbId, event);
    }

  }

  return map;

}