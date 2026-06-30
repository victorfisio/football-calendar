const LIVE_STATUS = new Set([
  "1H",
  "HT",
  "2H",
  "ET",
  "PEN",
]);

export function isLiveMatch(match) {

  return LIVE_STATUS.has(match.strStatus);

}