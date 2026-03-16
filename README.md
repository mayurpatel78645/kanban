# 🗂️ Kanban Board (Vanilla JS)

A fully functional Kanban board built using **HTML, CSS, and Vanilla JavaScript**, designed to practice deep DOM manipulation and state-driven UI architecture — without any frameworks.

This project follows a **React-style mental model**, where:

> UI is always derived from state.

---

## 🚀 Live Features

* ✅ Add tasks
* ✅ Delete tasks
* ✅ Move tasks across columns (Todo → In Progress → Done)
* ✅ Immutable state updates
* ✅ Event delegation
* ✅ Clean component-style DOM architecture
* ✅ Fully responsive layout

---

## 🧠 Architecture Philosophy

This project was intentionally built to mimic how modern frameworks like **React** think internally.

Key architectural principles used:

### 1️⃣ Single Source of Truth

All tasks are stored in one central `state` object.

```js
state = {
  tasks: []
}
```

The DOM never stores truth.
The UI is always rebuilt from state.

---

### 2️⃣ Immutable State Updates

* `filter()` for deleting tasks
* `map()` for updating task status
* No direct mutation of objects

Example:

```js
state.tasks = state.tasks.map(task =>
  task.id === id
    ? { ...task, status: 'in-progress' }
    : task
);
```

This mirrors how React state updates work.

---

### 3️⃣ Single Render Function

All UI rendering happens inside:

```js
render()
```

The render process:

1. Clears columns
2. Loops through state
3. Creates task cards
4. Appends to correct column

This ensures:

> UI = f(state)

---

### 4️⃣ Component-Style DOM Creation

Each task is created via:

```js
createTaskCard(task)
```

This simulates how React components return UI elements.

---

### 5️⃣ Event Delegation

Instead of attaching many event listeners:

```js
container.addEventListener('click', handleClick);
```

All actions (delete & move) are handled centrally.

This improves performance and scalability.

---

## 🛠️ Technologies Used

* HTML5
* CSS3 (Grid + Flexbox)
* Vanilla JavaScript (ES6+)

No libraries. No frameworks. Pure fundamentals.

---

## 📂 Project Structure

```
kanban/
│
├── index.html
├── style.css
├── app.js
└── README.md
```

---

## 🎯 What This Project Demonstrates

* Deep understanding of DOM manipulation
* Event bubbling & delegation
* Immutable state logic
* Functional array methods (`map`, `filter`)
* Component-style UI thinking
* Clean separation of concerns

This project was built as preparation for transitioning into React.

---

## 📈 Possible Improvements

* Drag and drop functionality
* Task editing
* LocalStorage persistence
* Dark mode toggle
* Animation when moving tasks
* Backend integration

---

## 💡 Why This Project Matters

Instead of relying on frameworks, this Kanban board was built to:

* Master core JavaScript
* Understand rendering cycles
* Practice state-driven UI design

Frameworks become much easier once these fundamentals are solid.

---

## 📜 License

Open-source. Free to use and modify.
