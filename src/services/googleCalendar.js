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

  try {

    await calendar.events.insert({
      calendarId,
      requestBody: buildCalendarEvent(match),
    });

    console.log(`✅ ${match.strEvent} criado.`);

  } catch (error) {

    console.error(
      `❌ Erro ao criar "${match.strEvent}".`
    );

    throw error;

  }

}

export async function updateMatchEvent(calendarId, eventId, match) {

  try {

    await calendar.events.update({
      calendarId,
      eventId,
      requestBody: buildCalendarEvent(match),
    });

    console.log(`🔄 ${match.strEvent} atualizado.`);

  } catch (error) {

    console.error(
      `❌ Erro ao atualizar "${match.strEvent}".`
    );

    throw error;

  }

}

export async function deleteCalendarEvent(calendarId, eventId) {

  try {

    await calendar.events.delete({
      calendarId,
      eventId,
    });

  } catch (error) {

    console.error(
      `❌ Erro ao remover evento duplicado (${eventId}).`
    );

    throw error;

  }

}

export async function getCalendarEvents(calendarId) {

  try {

    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date("2025-01-01").toISOString(),
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 250,
    });

    return response.data.items ?? [];

  } catch (error) {

    console.error(
      "❌ Erro ao buscar eventos do Google Calendar."
    );

    throw error;

  }

}