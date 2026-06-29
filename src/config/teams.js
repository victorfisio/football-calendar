import dotenv from "dotenv";

dotenv.config();

export const TEAMS = [
  {
    id: 134465,
    name: "Palmeiras",
    calendarId: process.env.PALMEIRAS_CALENDAR_ID,
    color: "green",
  },
  {
    id: 133604,
    name: "Arsenal",
    calendarId: process.env.ARSENAL_CALENDAR_ID,
    color: "red",
  },
];