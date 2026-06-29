import { google } from "googleapis";
import dotenv from "dotenv";
import { buildCalendarEvent } from "../utils/buildCalendarEvent.js";

dotenv.config();

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials/service-account.json",
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({
  version: "v3",
  auth,
});

export async function createMatchEvent(calendarId, match) {

  const event = buildCalendarEvent(match);

  await calendar.events.insert({
    calendarId,
    requestBody: event,
  });

  console.log(`✅ ${match.strEvent} criado.`);
}

export async function updateMatchEvent(calendarId, eventId, match) {

  const event = buildCalendarEvent(match);

  await calendar.events.update({
    calendarId,
    eventId,
    requestBody: event,
  });

  console.log(`🔄 ${match.strEvent} atualizado.`);
}

export async function getCalendarEvents(calendarId) {

  const response = await calendar.events.list({
    calendarId,
    timeMin: new Date().toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 100,
  });

  return response.data.items ?? [];

}