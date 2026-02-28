let tempId = crypto.randomUUID();
state = {
  tasks: [
    {
      id : tempId,
      title: 'get to work',
      status: 'todo'
    },
  ]
};

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

function createTasks() {
  let inputValue = inputField.value;
  if (isEmptyStr(inputValue)) {
    alert("Please enter a task!");
  } else {
    let task = {
    id: crypto.randomUUID(), 
    title: inputValue, 
    status: 'todo',
    };
    state.tasks.push(task);
    inputField.value = '';
    render();
  }
}

function handleClick(e) {
  let event = e.target;
  if (event.classList.contains('delete-button')) {
    let element = event.closest('.task-card');
    let elementId = element.dataset.id;
    
    state.tasks = state.tasks.filter((task) => {
      return task.id !== elementId;
    });
    render();
  } else if (event.classList.contains('move-button')) {
    let element = event.closest('.task-card');
    let elementId = element.dataset.id;
    
    state.tasks = state.tasks.map((task) => {
      let statusIndex = statusArr.indexOf(task.status);
      if (statusIndex === -1) {
        return task;
      }
      if (task.id === elementId) {
        if (statusIndex < statusArr.length - 1) {
          const nextStatus = statusArr[statusIndex + 1];
          return {...task, status: nextStatus};
        }else {
          return task;
        }
      } else {
        return task;
      }
    });
    render();
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

render();
