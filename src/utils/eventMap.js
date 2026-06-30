export function buildEventMap(events) {

  const map = new Map();

  for (const event of events) {

    let sportsdbId =
      event.extendedProperties?.private?.sportsdbId;

    // Compatibilidade com eventos antigos
    if (!sportsdbId && event.description) {

      const legacyId =
        event.description.match(
          /TheSportsDB\s+(\d+)/
        );

      if (legacyId) {
        sportsdbId = legacyId[1];
      }

    }

    if (!sportsdbId)
      continue;

    map.set(
      sportsdbId,
      event
    );

  }

  return map;

}