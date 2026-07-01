# ⚽ Football Calendar Sync

Automatic synchronization of football matches from **API-Football** to **Google Calendar**.

The project periodically checks upcoming matches and keeps Google Calendar synchronized by automatically creating and updating events.

Currently supported teams:

* 🇧🇷 Palmeiras
* 🏴 Arsenal

---

# Features

* ✅ Automatic synchronization with Google Calendar
* ✅ Uses API-Football
* ✅ Automatically creates new matches
* ✅ Updates kickoff time changes
* ✅ Updates live scores and match status
* ✅ Removes duplicated calendar events
* ✅ Team-specific calendar colors

  * 🟢 Palmeiras
  * 🔴 Arsenal
* ✅ Google Calendar reminders

  * 1 hour before kickoff
  * At kickoff time
* ✅ Compatible with GitHub Actions
* ✅ Automatic synchronization every 45 minutes
* ✅ Manual synchronization through GitHub Actions

---

# Project Structure

```
football-calendar/

├── .github/
│   └── workflows/
│       └── sync.yml
│
├── credentials/
│
├── src/
│   ├── cleanup/
│   ├── config/
│   ├── services/
│   ├── sync/
│   └── utils/
│
├── index.js
├── package.json
└── README.md
```

---

# Requirements

* Node.js 22+
* Google Calendar
* Google Cloud Service Account
* API-Football API Key

---

# Installation

Clone the repository:

```bash
git clone https://github.com/victorfisio/football-calendar.git
```

Enter the project folder:

```bash
cd football-calendar
```

Install dependencies:

```bash
npm install
```

---

# Google Calendar Setup

Create two calendars:

* Palmeiras
* Arsenal

Copy the Calendar IDs.

---

# Google Cloud Setup

1. Create a Google Cloud project.

2. Enable:

* Google Calendar API

3. Create a Service Account.

4. Generate a JSON key.

5. Share both calendars with the Service Account email.

Permission:

```
Make changes to events
```

---

# API-Football

Create an account:

https://dashboard.api-football.com

Generate your API Key.

---

# Environment Variables

Create a `.env` file:

```env
API_FOOTBALL_KEY=YOUR_API_KEY

PALMEIRAS_CALENDAR_ID=your_calendar_id

ARSENAL_CALENDAR_ID=your_calendar_id
```

---

# Running Locally

```
npm start
```

---

# GitHub Secrets

Configure the following repository secrets:

| Secret                 | Description                        |
| ---------------------- | ---------------------------------- |
| GOOGLE_SERVICE_ACCOUNT | Entire Google Service Account JSON |
| API_FOOTBALL_KEY       | API-Football API key               |
| PALMEIRAS_CALENDAR_ID  | Google Calendar ID                 |
| ARSENAL_CALENDAR_ID    | Google Calendar ID                 |

---

# GitHub Actions

The project runs automatically every **45 minutes**.

Workflow:

```
.github/workflows/sync.yml
```

It can also be executed manually from the GitHub Actions tab.

---

# Synchronization Logic

For each team:

1. Download fixtures from API-Football
2. Read existing Google Calendar events
3. Remove duplicate events
4. Compare fixtures with calendar events
5. Create missing events
6. Update changed events
7. Skip unchanged events

---

# Event Information

Each calendar event contains:

* Match
* Competition
* Round
* Match status
* Current score
* Venue
* Fixture ID

Example:

```
Competition: Brasileirão Série A
Round: Regular Season - 15

Status: Not Started

Score:
Palmeiras - x - Flamengo

Fixture ID: 123456
```

---

# Event Colors

The calendar color is automatically assigned:

| Team      | Color |
| --------- | ----- |
| Palmeiras | Green |
| Arsenal   | Red   |

---

# Notifications

Each event includes two default reminders:

* ⏰ 60 minutes before kickoff
* ⏰ At kickoff

---

# Current Supported Teams

| Team      | API-Football ID |
| --------- | --------------- |
| Palmeiras | 121             |
| Arsenal   | 42              |

Adding a new team only requires editing:

```
src/config/teams.js
```

---

# Technologies

* Node.js
* Google Calendar API
* API-Football
* Axios
* Dotenv
* GitHub Actions

---

# License

MIT License

---

# Author

Victor Santos

GitHub:

https://github.com/victorfisio
