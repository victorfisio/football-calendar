import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const api = axios.create({
  baseURL: `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTSDB_API_KEY}`,
});

async function getNextEvents(teamId) {

  const { data } =
    await api.get(`/eventsnext.php?id=${teamId}`);

  return data.events ?? [];

}

async function getLastEvents(teamId) {

  const { data } =
    await api.get(`/eventslast.php?id=${teamId}`);

  return data.results ?? [];

}

export async function getFixtures(teamId) {

  const [nextEvents, lastEvents] =
    await Promise.all([
      getNextEvents(teamId),
      getLastEvents(teamId),
    ]);

  const fixtures = [
    ...lastEvents,
    ...nextEvents,
  ];

  const ids = new Set();

  const uniqueFixtures = [];

  for (const match of fixtures) {

    if (ids.has(match.idEvent))
      continue;

    ids.add(match.idEvent);

    uniqueFixtures.push(match);

  }

  uniqueFixtures.sort((a, b) => {

    const dateA =
      new Date(`${a.dateEvent}T${a.strTime}`);

    const dateB =
      new Date(`${b.dateEvent}T${b.strTime}`);

    return dateA - dateB;

  });

  return uniqueFixtures;

}