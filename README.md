# 🗂️ Kanban Board (Full-Stack Web Application)

A full-stack Kanban Board built using **HTML, CSS, JavaScript, PHP, and MySQL**.  
This application allows users to manage tasks across different stages with persistent database storage.

---

## 🚀 Features

### ✅ Core Features
- Add new tasks
- Delete tasks
- Move tasks (Todo → In Progress → Done)
- Persistent storage using MySQL

### ⭐ Advanced Features
- Edit tasks (double-click to modify)
- Dynamic task count per column
- Responsive UI
- Clean and modern design

---

## 🧠 How It Works

The application follows a **client-server architecture**:

```

Frontend (JavaScript)
↓
Fetch API
↓
PHP Backend (API)
↓
MySQL Database
↓
JSON Response
↓
UI Re-render

```

- The frontend sends requests using `fetch()`
- PHP handles the request and interacts with MySQL
- Data is returned in JSON format
- UI updates dynamically based on state

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Flexbox & Grid)
- JavaScript (ES6, DOM, Fetch API)

### Backend
- PHP
- MySQL
- XAMPP

### Tools
- Git & GitHub

---

## 📂 Project Structure

```

kanban/
│
├── index.html
├── style.css
├── app.js
├── db.php
│
├── api/
│   ├── get_tasks.php
│   ├── add_task.php
│   ├── delete_task.php
│   ├── update_status.php
│   └── update_task.php
│
└── README.md

````

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/mayurpatel78645/kanban.git
````

### 2️⃣ Move project to XAMPP

Place the folder inside:

```
xampp/htdocs/
```

### 3️⃣ Start XAMPP

* Start Apache
* Start MySQL

### 4️⃣ Create Database

Open phpMyAdmin and create:

```
Database: kanban_db
Table: tasks
```

### Table structure:

| Field  | Type        |
| ------ | ----------- |
| id     | VARCHAR(36) |
| title  | TEXT        |
| status | VARCHAR(20) |

---

### 5️⃣ Run the project

```
http://localhost/kanban
```

---

## 🎯 Key Concepts Demonstrated

* DOM Manipulation
* Event Delegation
* State-driven UI
* Fetch API (AJAX)
* PHP API development
* MySQL CRUD operations
* Full-stack integration

---

## 📈 Future Improvements

* Drag & drop tasks
* User authentication
* Task priorities
* Deadlines and reminders
* Cloud deployment

---

## 💡 Why This Project Matters

This project was built to:

* Understand how frontend and backend communicate
* Practice real-world CRUD operations
* Simulate modern web application architecture
* Prepare for frameworks like React

---

## 👨‍💻 Author

**Mayur Patel**
🔗 GitHub: [https://github.com/mayurpatel78645](https://github.com/mayurpatel78645)

---

## 📸 Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/0f8a5298-b5f0-47a0-8fa9-c7d5cd51ec38" width="800"/>
</p>

---

## 📜 License

This project is open-source and available for learning and development purposes.

````

