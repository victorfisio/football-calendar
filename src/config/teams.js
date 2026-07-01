import dotenv from "dotenv";

dotenv.config();

export const TEAMS = [
  {
    id: 121,
    name: "Palmeiras",
    calendarId: process.env.PALMEIRAS_CALENDAR_ID,
    color: "green",
  },
  {
    id: 42,
    name: "Arsenal",
    calendarId: process.env.ARSENAL_CALENDAR_ID,
    color: "red",
  },
];