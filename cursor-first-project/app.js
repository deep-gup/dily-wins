const STORAGE_KEY = "cursor-playground-wins";
const SETTINGS_KEY = "cursor-playground-settings";

const ACCENTS = {
  purple: { accent: "#c4b5fd", accentDim: "#a78bfa", btnText: "#1e1b4b" },
  green: { accent: "#6ee7b7", accentDim: "#34d399", btnText: "#052e1a" },
  blue: { accent: "#93c5fd", accentDim: "#60a5fa", btnText: "#1e3a5f" },
  coral: { accent: "#fdba74", accentDim: "#fb923c", btnText: "#431407" },
  pink: { accent: "#f9a8d4", accentDim: "#f472b6", btnText: "#500724" },
};

const form = document.getElementById("win-form");
const input = document.getElementById("win-input");
const list = document.getElementById("win-list");
const emptyState = document.getElementById("empty-state");
const totalCount = document.getElementById("total-count");
const doneCount = document.getElementById("done-count");
const settingsRoot = document.getElementById("settings");
const settingsToggle = document.getElementById("settings-toggle");
const settingsPanel = document.getElementById("settings-panel");
const themeOptions = document.getElementById("theme-options");
const accentOptions = document.getElementById("accent-options");

let wins = loadWins();
let settings = loadSettings();

applySettings(settings);
initSettingsMenu();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  wins.unshift({
    id: crypto.randomUUID(),
    text,
    done: false,
    createdAt: Date.now(),
  });

  input.value = "";
  saveAndRender();
});

list.addEventListener("click", (event) => {
  const item = event.target.closest(".win-item");
  if (!item) return;

  const id = item.dataset.id;

  if (event.target.matches(".win-checkbox")) {
    wins = wins.map((win) =>
      win.id === id ? { ...win, done: event.target.checked } : win
    );
    saveAndRender();
    return;
  }

  if (event.target.matches(".win-delete")) {
    wins = wins.filter((win) => win.id !== id);
    saveAndRender();
  }
});

function loadWins() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveWins() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wins));
}

function saveAndRender() {
  saveWins();
  render();
}

function render() {
  list.innerHTML = "";

  wins.forEach((win) => {
    const li = document.createElement("li");
    li.className = `win-item${win.done ? " done" : ""}`;
    li.dataset.id = win.id;

    li.innerHTML = `
      <input class="win-checkbox" type="checkbox" ${win.done ? "checked" : ""} aria-label="Mark complete" />
      <span class="win-text">${escapeHtml(win.text)}</span>
      <button type="button" class="win-delete" aria-label="Delete win">Delete</button>
    `;

    list.appendChild(li);
  });

  const hasWins = wins.length > 0;
  list.classList.toggle("hidden", !hasWins);
  emptyState.classList.toggle("hidden", hasWins);

  const completed = wins.filter((w) => w.done).length;
  totalCount.textContent = `${wins.length} win${wins.length === 1 ? "" : "s"}`;
  doneCount.textContent = `${completed} completed`;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function loadSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    const parsed = saved ? JSON.parse(saved) : {};
    return {
      theme: parsed.theme || "dark",
      accent: ACCENTS[parsed.accent] ? parsed.accent : "purple",
    };
  } catch {
    return { theme: "dark", accent: "purple" };
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function applySettings({ theme, accent }) {
  document.documentElement.dataset.theme = theme;

  const colors = ACCENTS[accent];
  const root = document.documentElement.style;
  root.setProperty("--accent", colors.accent);
  root.setProperty("--accent-dim", colors.accentDim);
  root.setProperty("--btn-text", colors.btnText);

  themeOptions.querySelector(`input[value="${theme}"]`).checked = true;
  accentOptions.querySelector(`input[value="${accent}"]`).checked = true;
}

function initSettingsMenu() {
  settingsToggle.addEventListener("click", () => {
    const isOpen = !settingsPanel.classList.contains("hidden");
    setSettingsOpen(!isOpen);
  });

  themeOptions.addEventListener("change", (event) => {
    if (event.target.name !== "theme") return;
    settings.theme = event.target.value;
    saveSettings();
    applySettings(settings);
  });

  accentOptions.addEventListener("change", (event) => {
    if (event.target.name !== "accent") return;
    settings.accent = event.target.value;
    saveSettings();
    applySettings(settings);
  });

  document.addEventListener("click", (event) => {
    if (
      !settingsPanel.classList.contains("hidden") &&
      !settingsRoot.contains(event.target)
    ) {
      setSettingsOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setSettingsOpen(false);
    }
  });
}

function setSettingsOpen(isOpen) {
  settingsPanel.classList.toggle("hidden", !isOpen);
  settingsToggle.setAttribute("aria-expanded", String(isOpen));
  settingsToggle.setAttribute(
    "aria-label",
    isOpen ? "Close settings" : "Open settings"
  );
}

render();
