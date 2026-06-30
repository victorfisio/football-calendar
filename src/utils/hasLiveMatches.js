import { isLiveMatch } from "./isLiveMatch.js";

export function hasLiveMatches(matches) {

  return matches.some(isLiveMatch);

}