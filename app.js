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
  deleteButton.className = 'delete-button';
  moveButton.className = 'move-button';
  deleteButton.innerHTML = 'X';
  moveButton.innerHTML = 'move-->';
  title.innerHTML = task.title;
  newTask.dataset.id = task.id;
  newTask.appendChild(title);
  newTask.appendChild(deleteButton);
  newTask.appendChild(moveButton);
  return newTask;
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

  state.tasks.forEach(task => {
    const card = createTaskCard(task);
    const column = getColumnByStatus(task.status);
    column.appendChild(card);
  });
}

container.addEventListener('click', handleClick);
addTaskButton.addEventListener('click', createTasks);

//render();
loadTasks();
