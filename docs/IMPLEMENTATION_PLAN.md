# HabitFlow Product + Engineering Blueprint

## 1) Product vision
HabitFlow is a mobile-first, bilingual (English/Arabic), PWA habit tracker designed for disciplined users who want consistent daily execution with minimal friction. Primary value: a delightful Today experience, clear streak logic, and actionable analytics that convert intention into behavior.

## 2) MVP features
- Auth: register, login, refresh token, logout, forgot/reset password
- Onboarding: language, theme, starter categories
- Today dashboard: daily habit checklist, quick complete, progress ring
- Habit CRUD: title, category, frequency, target, reminder time, active state
- Logs: complete/incomplete, quantitative value, notes
- Streaks: current + longest streak, completion rate
- Calendar/history: day/week/month visibility
- Analytics: completion rates, best/worst habits
- Settings: profile basics, theme, language, notification preferences
- PWA: installable, offline shell + cached assets

## 3) Future roadmap
- Social accountability circles
- AI habit coach suggestions
- Smart reminder optimization
- Team/coach dashboards
- Wearable integrations (Apple Health/Google Fit)
- Premium templates and advanced exports

## 4) User flow
1. Open app → Splash/Welcome
2. Register/Login
3. Onboarding (language/theme/goals/starter habits)
4. Land on Today dashboard
5. Create or edit habits
6. Mark daily progress and review streaks
7. Visit analytics weekly/monthly
8. Tune settings/reminders/profile

## 5) App pages
1. Splash / Welcome
2. Onboarding
3. Login
4. Register
5. Today Dashboard
6. All Habits
7. Habit Details
8. Create Habit
9. Edit Habit
10. Calendar / History
11. Analytics
12. Achievements
13. Profile
14. Settings

## 6) Database schema
### User
- `_id`, `name`, `email`, `passwordHash`
- `language` (`en|ar`), `theme` (`light|dark|system`)
- `notificationPreferences` (push/email/reminders)
- `timezone`, `weekStartsOn`
- timestamps

Indexes:
- unique: `email`

### Habit
- `_id`, `userId`, `title`, `description`, `category`, `icon`, `color`
- `frequencyType`: `daily|specific_days|x_per_week|x_per_month`
- `frequencyConfig`: `{ daysOfWeek?: number[], timesPerWeek?: number, timesPerMonth?: number }`
- `targetCount`, `unit`
- `reminderTime`, `startDate`, `endDate`
- `difficulty`, `isActive`, `notes`
- timestamps

Indexes:
- `{ userId: 1, isActive: 1 }`
- `{ userId: 1, category: 1 }`
- `{ userId: 1, startDate: 1 }`

### HabitLog
- `_id`, `userId`, `habitId`, `date` (UTC day key), `value`, `completed`, `note`
- timestamps

Indexes:
- unique: `{ userId: 1, habitId: 1, date: 1 }`
- `{ userId: 1, date: -1 }`

### Achievement
- `_id`, `key`, `title`, `description`, `icon`

### UserAchievement
- `_id`, `userId`, `achievementId`, `unlockedAt`

Indexes:
- unique: `{ userId: 1, achievementId: 1 }`

## 7) API design
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### User
- `GET /api/users/me`
- `PATCH /api/users/me`
- `DELETE /api/users/me`

### Habits
- `POST /api/habits`
- `GET /api/habits`
- `GET /api/habits/:habitId`
- `PATCH /api/habits/:habitId`
- `DELETE /api/habits/:habitId`

### Logs
- `PUT /api/logs/:habitId/:date` (upsert daily log)
- `GET /api/logs?from=&to=&habitId=`

### Analytics
- `GET /api/analytics/summary?range=week|month|year`
- `GET /api/analytics/habits/:habitId`

### Achievements
- `GET /api/achievements`
- `GET /api/achievements/me`

## 8) Step-by-step implementation roadmap
1. Initialize monorepo and env templates
2. Implement backend core (config, models, auth middleware)
3. Add habit/log CRUD and analytics services
4. Build frontend shell (router, layout, i18n, theme, state)
5. Build auth + onboarding screens
6. Build Today, Habits, Calendar, Analytics pages
7. Integrate API client and protected routes
8. Add PWA, service worker, offline fallback
9. Add tests (unit + integration + basic E2E)
10. Harden security and prepare deployment
