# Kanban Next

A modern, responsive Kanban board built with Next.js, Zustand, and TailwindCSS.  
Easily manage your tasks with drag-and-drop columns and cards, persistent state, and a clean, fast UI.

---

## 🚀 Tech Stack

- **Next.js 15** – App Router, React 19, SSR/CSR hybrid
- **React 19** – Component-based UI
- **Zustand** (+ Immer middleware) – State management and local storage persistence
- **TailwindCSS 4** – Utility-first, responsive styling
- **dnd-kit** – Drag-and-drop for tasks and columns
- **Radix UI** – Accessible dialogs, popovers, overlays
- **uuid** – Unique IDs for columns and tasks
- **react-icons** – Iconography
- **react-timeago** – Human-readable timestamps

---

## 📝 Features

- **Drag & Drop**: Move tasks between columns with smooth drag-and-drop (powered by dnd-kit).
- **Persistent Storage**: Your board stays in your browser using Zustand's persist middleware.
- **Custom Columns**: Add, rename, and remove columns (except core status columns).
- **Task Management**: Create, update, and delete tasks.
- **Task Details**: Edit task title, description, status; add comments.
- **Responsive UI**: Works well on desktop and mobile.
- **Accessible Components**: Built with Radix UI for dialogs and popovers.
- **Guest User**: Each session gets a random username for task attribution.

---

## 🖥️ Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/t3developer/kanban-next.git
cd kanban-next
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use your Kanban board.

---

## 📁 Project Structure

```
app/
  components/kanban/      # Kanban board, columns, tasks, dialogs
  globals.css             # Tailwind & global styles
lib/
  stores/kanban/          # Zustand store, actions, types
  data/columns.ts         # Default columns, enums
...
```

---

## 🛠️ Customization

- **Change default columns**: Edit `lib/data/columns.ts`.
- **Update styles/theme**: Edit `app/globals.css` (Tailwind + custom classes).
- **Expand features**: Add fields to `Task`/`Column` types, or extend the Zustand store for new actions.

---

## 🙏 Credits

- [Next.js](https://nextjs.org/)
- [Zustand](https://docs.pmnd.rs/zustand)
- [TailwindCSS](https://tailwindcss.com/)
- [dnd-kit](https://docs.dndkit.com/)
- [Radix UI](https://www.radix-ui.com/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [uuid](https://www.npmjs.com/package/uuid)
- [react-timeago](https://www.npmjs.com/package/react-timeago)

---

## 📄 License

MIT

---