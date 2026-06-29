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

  // Busca eventos dos últimos 120 dias
  const timeMin = new Date();
  timeMin.setDate(timeMin.getDate() - 120);

  // Busca eventos até 365 dias no futuro
  const timeMax = new Date();
  timeMax.setDate(timeMax.getDate() + 365);

  const response = await calendar.events.list({
    calendarId,
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 500,
  });

  return response.data.items ?? [];
}