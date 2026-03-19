let tempId = crypto.randomUUID();

let state = {
  tasks: []
};

async function loadTasks() {

  const response = await fetch("api/get_tasks.php");

  const tasks = await response.json();

  state.tasks = tasks;

  render();
}

let todoTasks = document.querySelector('.todo-tasks');
let doneTasks = document.querySelector('.done-tasks');
let inProgressTasks = document.querySelector('.in-progress-tasks');
let inputField = document.querySelector('.input-field');
let addTaskButton = document.querySelector('.add-task-button');
let container = document.querySelector('.container');
let statusArr = ['todo', 'in-progress', 'done'];

function clearTasks() {
  todoTasks.replaceChildren();
  doneTasks.replaceChildren();
  inProgressTasks.replaceChildren();
}
function createTaskCard(task) {
  let newTask = document.createElement('div');
  let deleteButton = document.createElement('button');
  let moveButton = document.createElement('button');
  let title = document.createElement('h2');

  newTask.className = 'task-card';
  newTask.dataset.id = task.id;
  deleteButton.className = 'delete-button';
  moveButton.className = 'move-button';
  deleteButton.innerHTML = 'X';
  moveButton.innerHTML = '→';
  title.innerHTML = task.title;
  title.className = "task-title";

  title.addEventListener('dblclick', () => {
    let input = document.createElement('input');
    input.value = task.title;
    input.className = "edit-input";
    newTask.replaceChild(input, title);
    input.focus();
    input.addEventListener('blur', () => saveEdit(input, task.id));
    input.addEventListener('keydown', (e) => {
      if (e.key === "Enter") {
        saveEdit(input, task.id);
      }
    });
  });

  let buttonRow = document.createElement('div');

  buttonRow.className = "button-row";
  buttonRow.appendChild(moveButton);
  buttonRow.appendChild(deleteButton);
  newTask.appendChild(title);
  newTask.appendChild(buttonRow);

  return newTask;
}

async function saveEdit(input, id) {
  let newTitle = input.value.trim();

  if (!newTitle) return loadTasks();

  await fetch("api/update_task.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id,
      title: newTitle
    })
  });

  loadTasks();
}

function getColumnByStatus(status) {
  const columns = {
    'todo': todoTasks,
    'in-progress': inProgressTasks,
    'done': doneTasks,
  }
  return columns[status];
}

function isEmptyStr(str) {
  return !str || str.trim().length === 0;
}

async function createTasks() {
  let inputValue = inputField.value;
  if (isEmptyStr(inputValue)) {
    alert("Please enter a task!");
  } else {
    let task = {
    id: crypto.randomUUID(), 
    title: inputValue, 
    status: 'todo',
    };
    await fetch("api/add_task.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  });
    //state.tasks.push(task);
    inputField.value = '';
    //render();
    loadTasks();
  }
}

async function handleClick(e) {
  let event = e.target;
  if (event.classList.contains('delete-button')) {
    let element = event.closest('.task-card');
    let elementId = element.dataset.id;
    await fetch("api/delete_task.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: elementId })
    });
    loadTasks();
  }
  else if (event.classList.contains('move-button')) {
    let element = event.closest('.task-card');
    let elementId = element.dataset.id;
    let task = state.tasks.find(t => t.id === elementId);
    let statusIndex = statusArr.indexOf(task.status);
    if (statusIndex === -1 || statusIndex === statusArr.length - 1) {
      return;
    }
    const nextStatus = statusArr[statusIndex + 1];
    await fetch("api/update_status.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: elementId,
        status: nextStatus
      })
    });
    loadTasks();
  }
}

function render() {
  clearTasks();

  let counts = {
    todo: 0,
    "in-progress": 0,
    done: 0
  };

  state.tasks.forEach(task => {
    counts[task.status]++;
    const card = createTaskCard(task);
    const column = getColumnByStatus(task.status);
    column.appendChild(card);
  });

  document.querySelector('.todo-container h1').innerText = `ToDo (${counts.todo})`;
  document.querySelector('.in-progress-container h1').innerText = `In Progress (${counts["in-progress"]})`;
  document.querySelector('.done-container h1').innerText = `Done (${counts.done})`;

  if (state.tasks.length === 0) {
    todoTasks.innerHTML = "<p>No tasks yet</p>";
  }
}

container.addEventListener('click', handleClick);
addTaskButton.addEventListener('click', createTasks);

loadTasks();
