# Cursor Playground — Your First AI-Assisted Project

A tiny **Daily Wins** app: add accomplishments, check them off, delete them. Data saves in your browser.

The real lesson is how to **build with Cursor**, not the app itself.

---

## Run it (30 seconds)

1. Open this folder in Cursor (`File → Open Folder → cursor-first-project`).
2. Open `index.html`.
3. Right-click the file tab → **Open with Live Preview** (or open the file in Chrome/Edge).

Add a few wins. Refresh the page — they should still be there (localStorage).

---

## What Cursor gives you

| Tool | When to use it |
|------|----------------|
| **Chat** (this panel) | Ask questions, get explanations, plan changes |
| **Agent** | "Do this for me" — edits files, runs commands |
| **@ mentions** | Point AI at specific files: `@app.js explain how wins are saved` |
| **Inline edit** | Select code → `Ctrl+K` → describe a small change |

You don't need to memorize syntax. Describe what you want in plain English.

---

## 5 exercises (try these in order)

### 1. Understand the code
**Prompt:** `@app.js explain this file like I'm new to JavaScript`

Notice how `@` attaches the file so answers match *your* code.

### 2. Make a visual change
**Prompt:** `In styles.css, change the accent color to purple and make the title slightly larger`

Review the diff before accepting. That's how you learn what changed.

### 3. Add a feature
**Prompt:** `Add a "Clear all" button that removes every win after confirming with the user`

Good features start with a clear sentence. AI handles the implementation.

### 4. Fix or improve something
**Prompt:** `Add a keyboard shortcut: pressing Escape clears the input field`

Small polish requests are perfect for AI-assisted dev.

### 5. Go further (your choice)
Pick one:
- `Add categories (Work, Personal, Learning) with colored tags`
- `Show wins grouped by today vs earlier days`
- `Add a confetti animation when I complete all wins for the day`

---

## Tips for working with AI

1. **Be specific** — "make it better" is vague; "add a delete confirmation dialog" is actionable.
2. **Iterate** — first version rarely perfect; follow up: "use a softer red for the delete button."
3. **Read the diff** — you stay in control; AI suggests, you approve.
4. **One thing at a time** — smaller requests = fewer mistakes.
5. **Ask why** — "why did you use localStorage instead of a variable?" builds understanding.

---

## Project structure

```
cursor-first-project/
├── index.html   ← page structure
├── styles.css   ← look and feel
├── app.js       ← logic (add, complete, delete, save)
└── README.md    ← you are here
```

---

## What's next?

When you're comfortable here, ask Cursor to scaffold something bigger:

- `"Create a Python CLI habit tracker with the same features"`
- `"Turn this into a React app"`
- `"Add unit tests for app.js"`

Welcome to AI-assisted development.
