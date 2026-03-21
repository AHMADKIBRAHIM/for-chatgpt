# HabitFlow Tracker

HabitFlow is a lightweight habit tracker web app built with plain HTML, CSS, and JavaScript. It stores habits in Firebase Cloud Firestore so you can create habits, mark daily completions, and track streaks from a single-page dashboard.

## Features

- Connect to your own Firebase project from the UI using a web app config JSON blob.
- Create habits with a category, weekly target, and motivation note.
- Mark habits complete for the current day and undo a completion if needed.
- View seven-day completion history and auto-calculated streaks.
- See top-level metrics for active habits, completion rate, and best streak.

## Firebase setup

1. Create a Firebase project.
2. In the Firebase console, create a **Web App** and copy its config object.
3. Enable **Cloud Firestore** for the project.
4. Add a Firestore ruleset suitable for your deployment. For local experimentation, you can temporarily allow authenticated or public writes according to your needs.
5. Open `index.html` in a local static server and paste the Firebase config into the app.

### Example Firestore rules for quick prototyping

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /habits/{document=**} {
      allow read, write: if true;
    }
  }
}
```

> Warning: the example rules above are intentionally open for quick prototypes only. Tighten them before deploying a real app.

## Local development

Because the app uses ES modules from the Firebase CDN, run it from a local server instead of opening the file directly.

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.
