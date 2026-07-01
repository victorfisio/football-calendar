export function buildEventMap(events) {

  const map = new Map();

  for (const event of events) {

    let fixtureId =
      event.extendedProperties?.private?.fixtureId;

    // Compatibilidade com eventos antigos
    if (!fixtureId && event.description) {

      const legacyId =
        event.description.match(
          /Fixture ID:\s*(\d+)/
        );

      if (legacyId) {

        fixtureId = legacyId[1];

      }

    }

    if (!fixtureId)
      continue;

    map.set(
      String(fixtureId),
      event
    );

  }

  return map;

}