import { getApp, getApps, initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseForm = document.querySelector('#firebase-form');
const disconnectBtn = document.querySelector('#disconnect-btn');
const firebaseConfigInput = document.querySelector('#firebase-config');
const collectionNameInput = document.querySelector('#collection-name');
const firebaseStatus = document.querySelector('#firebase-status');
const firebaseMessage = document.querySelector('#firebase-message');
const habitForm = document.querySelector('#habit-form');
const habitList = document.querySelector('#habit-list');
const emptyState = document.querySelector('#empty-state');
const habitTemplate = document.querySelector('#habit-card-template');
const todayLabel = document.querySelector('#today-label');
const habitCount = document.querySelector('#habit-count');
const completionRate = document.querySelector('#completion-rate');
const bestStreak = document.querySelector('#best-streak');

const STORAGE_KEYS = {
  config: 'habitflow.firebaseConfig',
  collection: 'habitflow.collectionName',
};

const state = {
  habits: [],
  db: null,
  collectionName: 'habits',
  app: null,
};

const todayKey = formatDateKey(new Date());
const weekdayFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'short' });
const fullDateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

todayLabel.textContent = fullDateFormatter.format(new Date());

firebaseForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const rawConfig = firebaseConfigInput.value.trim();
  const collectionName = collectionNameInput.value.trim() || 'habits';

  if (!rawConfig) {
    setFirebaseMessage('Paste your Firebase config JSON to connect.', true);
    return;
  }

  let parsedConfig;

  try {
    parsedConfig = JSON.parse(rawConfig);
  } catch {
    setFirebaseMessage('Your Firebase config is not valid JSON.', true);
    return;
  }

  const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missingKey = requiredKeys.find((key) => !parsedConfig[key]);

  if (missingKey) {
    setFirebaseMessage(`Missing Firebase config field: ${missingKey}.`, true);
    return;
  }

  await connectFirebase(parsedConfig, collectionName);
});

disconnectBtn.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEYS.config);
  localStorage.removeItem(STORAGE_KEYS.collection);
  state.habits = [];
  state.db = null;
  state.app = null;
  firebaseConfigInput.value = '';
  collectionNameInput.value = 'habits';
  setConnectionUi(false);
  setFirebaseMessage('Disconnected. Paste a Firebase config to reconnect.');
  renderHabits();
});

habitForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!state.db) {
    setFirebaseMessage('Connect Firebase before creating habits.', true);
    return;
  }

  const nameInput = document.querySelector('#habit-name');
  const categoryInput = document.querySelector('#habit-category');
  const targetInput = document.querySelector('#habit-target');
  const noteInput = document.querySelector('#habit-note');

  const name = nameInput.value.trim();
  const category = categoryInput.value.trim();
  const note = noteInput.value.trim();
  const targetDays = Number.parseInt(targetInput.value, 10);

  if (!name) {
    setFirebaseMessage('Habit name is required.', true);
    return;
  }

  if (Number.isNaN(targetDays) || targetDays < 1 || targetDays > 7) {
    setFirebaseMessage('Target days must be between 1 and 7.', true);
    return;
  }

  const payload = {
    name,
    category: category || 'General',
    note,
    targetDays,
    createdAt: serverTimestamp(),
    completedDates: [],
  };

  try {
    await addDoc(collection(state.db, state.collectionName), payload);
    habitForm.reset();
    document.querySelector('#habit-target').value = '7';
    setFirebaseMessage(`Saved "${name}" to Firebase.`);
    await loadHabits();
  } catch (error) {
    setFirebaseMessage(getErrorMessage(error, 'Could not add habit.'), true);
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  const savedConfig = localStorage.getItem(STORAGE_KEYS.config);
  const savedCollection = localStorage.getItem(STORAGE_KEYS.collection);

  if (savedConfig) {
    firebaseConfigInput.value = savedConfig;
  }

  if (savedCollection) {
    collectionNameInput.value = savedCollection;
  }

  if (savedConfig) {
    try {
      await connectFirebase(JSON.parse(savedConfig), savedCollection || 'habits', false);
    } catch {
      setFirebaseMessage('Saved Firebase config could not be restored. Please reconnect.', true);
    }
  } else {
    renderHabits();
  }
});

async function connectFirebase(config, collectionName, announce = true) {
  try {
    const appName = `habitflow-${config.projectId}`;
    state.app = getApps().some((app) => app.name === appName) ? getApp(appName) : initializeApp(config, appName);
  } catch (error) {
    setFirebaseMessage(getErrorMessage(error, 'Could not initialize Firebase.'), true);
    return;
  }

  state.db = getFirestore(state.app);
  state.collectionName = collectionName;
  localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(config, null, 2));
  localStorage.setItem(STORAGE_KEYS.collection, collectionName);
  setConnectionUi(true);
  setFirebaseMessage(announce ? 'Firebase connected. Loading habits…' : 'Firebase restored. Loading habits…');
  await loadHabits();
}

async function loadHabits() {
  if (!state.db) {
    renderHabits();
    return;
  }

  try {
    const snapshot = await getDocs(collection(state.db, state.collectionName));
    state.habits = snapshot.docs
      .map((entry) => ({
        id: entry.id,
        ...entry.data(),
      }))
      .sort((left, right) => left.name.localeCompare(right.name));
    renderHabits();
    setFirebaseMessage(`Loaded ${state.habits.length} habit${state.habits.length === 1 ? '' : 's'} from Firebase.`);
  } catch (error) {
    setFirebaseMessage(getErrorMessage(error, 'Could not load habits.'), true);
  }
}

function renderHabits() {
  habitList.innerHTML = '';
  emptyState.classList.toggle('hidden', state.habits.length > 0);

  state.habits.forEach((habit) => {
    const fragment = habitTemplate.content.cloneNode(true);
    const card = fragment.querySelector('.habit-card');
    const category = fragment.querySelector('.habit-category');
    const name = fragment.querySelector('.habit-name');
    const note = fragment.querySelector('.habit-note');
    const target = fragment.querySelector('.target-pill');
    const streak = fragment.querySelector('.streak-pill');
    const completeBtn = fragment.querySelector('.complete-btn');
    const undoBtn = fragment.querySelector('.undo-btn');
    const deleteBtn = fragment.querySelector('.delete-btn');
    const historyDots = fragment.querySelector('.history-dots');

    category.textContent = habit.category || 'General';
    name.textContent = habit.name;
    note.textContent = habit.note || 'No note added yet.';
    target.textContent = `${habit.targetDays || 7} day${habit.targetDays === 1 ? '' : 's'} / week`;
    streak.textContent = `${calculateCurrentStreak(habit.completedDates || [])} day streak`;

    if (isCompletedToday(habit.completedDates || [])) {
      completeBtn.textContent = 'Completed today';
      completeBtn.disabled = true;
      card.classList.add('is-complete');
    }

    completeBtn.addEventListener('click', async () => {
      await toggleHabitCompletion(habit, true);
    });

    undoBtn.addEventListener('click', async () => {
      await toggleHabitCompletion(habit, false);
    });

    deleteBtn.addEventListener('click', async () => {
      await removeHabit(habit.id, habit.name);
    });

    getLastSevenDays().forEach((date) => {
      const dot = document.createElement('span');
      dot.className = 'history-dot';
      dot.dataset.label = weekdayFormatter.format(date).slice(0, 1);
      const dateKey = formatDateKey(date);

      if ((habit.completedDates || []).includes(dateKey)) {
        dot.classList.add('done');
      }

      if (dateKey === todayKey) {
        dot.classList.add('today');
      }

      historyDots.appendChild(dot);
    });

    habitList.appendChild(fragment);
  });

  updateSummary();
}

async function toggleHabitCompletion(habit, markComplete) {
  if (!state.db) {
    return;
  }

  const completedDates = new Set(habit.completedDates || []);

  if (markComplete) {
    completedDates.add(todayKey);
  } else {
    completedDates.delete(todayKey);
  }

  try {
    await updateDoc(doc(state.db, state.collectionName, habit.id), {
      completedDates: Array.from(completedDates).sort(),
    });
    setFirebaseMessage(markComplete ? `Great job! "${habit.name}" is complete today.` : `Removed today’s completion for "${habit.name}".`);
    await loadHabits();
  } catch (error) {
    setFirebaseMessage(getErrorMessage(error, 'Could not update habit.'), true);
  }
}

async function removeHabit(id, habitName) {
  if (!state.db) {
    return;
  }

  try {
    await deleteDoc(doc(state.db, state.collectionName, id));
    setFirebaseMessage(`Deleted "${habitName}".`);
    await loadHabits();
  } catch (error) {
    setFirebaseMessage(getErrorMessage(error, 'Could not delete habit.'), true);
  }
}

function updateSummary() {
  habitCount.textContent = String(state.habits.length);

  if (state.habits.length === 0) {
    completionRate.textContent = '0%';
    bestStreak.textContent = '0';
    return;
  }

  const completedToday = state.habits.filter((habit) => isCompletedToday(habit.completedDates || [])).length;
  const streaks = state.habits.map((habit) => calculateCurrentStreak(habit.completedDates || []));
  const completion = Math.round((completedToday / state.habits.length) * 100);

  completionRate.textContent = `${completion}%`;
  bestStreak.textContent = String(Math.max(...streaks));
}

function setConnectionUi(isConnected) {
  firebaseStatus.textContent = isConnected ? 'Connected' : 'Not connected';
  firebaseStatus.classList.toggle('online', isConnected);
  firebaseStatus.classList.toggle('offline', !isConnected);
}

function setFirebaseMessage(message, isError = false) {
  firebaseMessage.textContent = message;
  firebaseMessage.style.color = isError ? '#fecaca' : 'var(--muted)';
}

function isCompletedToday(completedDates) {
  return completedDates.includes(todayKey);
}

function getLastSevenDays() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    return date;
  });
}

function calculateCurrentStreak(completedDates) {
  const completedSet = new Set(completedDates);
  let streak = 0;

  for (let offset = 0; offset < 365; offset += 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - offset);
    const key = formatDateKey(date);

    if (!completedSet.has(key)) {
      break;
    }

    streak += 1;
  }

  return streak;
}

function formatDateKey(date) {
  return date.toISOString().split('T')[0];
}

function getErrorMessage(error, fallback) {
  return error?.message ? `${fallback} ${error.message}` : fallback;
}
