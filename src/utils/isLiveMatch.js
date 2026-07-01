export function isLiveMatch(match) {

  const status = match.fixture.status.short;

  return [

    "1H",
    "HT",
    "2H",
    "ET",
    "BT",
    "P",
    "LIVE"

  ].includes(status);

}