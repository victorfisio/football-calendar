import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const api = axios.create({
  baseURL: `https://www.thesportsdb.com/api/v1/json/${process.env.THESPORTSDB_API_KEY}`,
});

async function getNextEvents(teamId) {
  const { data } = await api.get(`/eventsnext.php?id=${teamId}`);
  return data.events ?? [];
}

async function getLastEvents(teamId) {
  const { data } = await api.get(`/eventslast.php?id=${teamId}`);
  return data.results ?? [];
}

export async function getFixtures(teamId) {
  const [nextEvents, lastEvents] = await Promise.all([
    getNextEvents(teamId),
    getLastEvents(teamId),
  ]);

  const fixtures = [...lastEvents, ...nextEvents];

  // Remove partidas duplicadas
  const uniqueFixtures = [];
  const ids = new Set();

  for (const match of fixtures) {
    if (!ids.has(match.idEvent)) {
      ids.add(match.idEvent);
      uniqueFixtures.push(match);
    }
  }

  // ===== DEBUG TEMPORÁRIO =====
  
  // ============================

  return uniqueFixtures;
}