import { TEAMS } from "./src/config/teams.js";
import { syncTeam } from "./src/sync/syncTeam.js";

async function main() {

  let hasAnyLiveMatch = false;

  for (const team of TEAMS) {

    try {

      const teamHasLiveMatch =
        await syncTeam(team);

      if (teamHasLiveMatch) {
        hasAnyLiveMatch = true;
      }

    } catch (error) {

      console.error(
        `❌ Erro ao sincronizar ${team.name}.`
      );

      console.error(error.message);

      console.log("");

    }

  }

  console.log("🏁 Sincronização finalizada.");

  if (hasAnyLiveMatch) {

    console.log("");
    console.log("🔴 Existe pelo menos um jogo ao vivo.");
    console.log("⚡ Recomenda-se sincronização frequente.");
    console.log("");

  } else {

    console.log("");
    console.log("🟢 Nenhum jogo ao vivo.");
    console.log("📅 Sincronização normal.");
    console.log("");

  }

}

main().catch(error => {

  console.error(error);

});