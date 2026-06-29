import { TEAMS } from "./src/config/teams.js";
import { syncTeam } from "./src/sync/syncTeam.js";

async function main() {

  for (const team of TEAMS) {
    await syncTeam(team);
  }

}

main();