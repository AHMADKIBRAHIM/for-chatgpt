# API Contract (MVP)

## Auth
### POST /api/auth/register
- auth: public
- body: `{ name, email, password }`
- 201: `{ user, accessToken }`
- errors: 400 validation, 409 email exists

### POST /api/auth/login
- auth: public
- body: `{ email, password }`
- 200: `{ user, accessToken }`
- errors: 401 invalid credentials

### POST /api/auth/refresh
- auth: refresh cookie
- body: none
- 200: `{ accessToken }`
- errors: 401 missing/invalid refresh

### POST /api/auth/logout
- auth: optional
- 204

## Habits
### POST /api/habits
- auth: bearer token
- body: Habit upsert schema
- 201: Habit

### GET /api/habits
- auth: bearer token
- 200: Habit[]

### GET /api/habits/:habitId
- auth: bearer token
- 200: Habit
- 404 not found

### PATCH /api/habits/:habitId
- auth: bearer token
- body: partial Habit
- 200: Habit

### DELETE /api/habits/:habitId
- auth: bearer token
- 204

## Logs
### PUT /api/habits/:habitId/logs/:date
- auth: bearer token
- body: `{ value, completed, note }`
- 200: HabitLog

### GET /api/habits/logs/query?from=YYYY-MM-DD&to=YYYY-MM-DD&habitId=
- auth: bearer token
- 200: HabitLog[]

## Analytics
### GET /api/analytics/summary?range=week|month|year
- auth: bearer token
- 200: `{ range, activeHabits, totalLogs, completedLogs, successRate }`
