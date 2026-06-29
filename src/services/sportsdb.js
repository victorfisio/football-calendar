import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const api = axios.create({
  baseURL: `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTSDB_API_KEY}`,
});

export async function searchTeam(teamName) {
  try {

    const response = await api.get("/searchteams.php", {
      params: {
        t: teamName,
      },
    });

    return response.data.teams;

  } catch (error) {

    console.error(error.message);
    return [];

  }
}
export async function getNextEvents(teamId) {

  try {

    const response = await api.get("/eventsnext.php", {
      params: {
        id: teamId,
      },
    });

    return response.data.events ?? [];

  } catch (error) {

    console.error(error.message);
    return [];

  }

}