import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const api = axios.create({

  baseURL: "https://v3.football.api-sports.io",

  headers: {

    "x-apisports-key": process.env.API_FOOTBALL_KEY,

  },

});

function formatDate(date) {

  return date.toISOString().split("T")[0];

}

export async function getFixtures(teamId) {

  const today = new Date();

  // Busca jogos desde 60 dias atrás
  const from = new Date(today);
  from.setDate(from.getDate() - 60);

  // Até aproximadamente 10 meses à frente
  const to = new Date(today);
  to.setMonth(to.getMonth() + 10);

  const { data } = await api.get("/fixtures", {

    params: {

      team: teamId,

      from: formatDate(from),

      to: formatDate(to),

      timezone: "America/Sao_Paulo",

    },

  });

  const fixtures = data.response ?? [];

  fixtures.sort(

    (a, b) =>

      new Date(a.fixture.date) -
      new Date(b.fixture.date)

  );

  return fixtures;

}