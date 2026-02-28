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

function clearTasks() {
  todoTasks.replaceChildren();
  doneTasks.replaceChildren();
  inProgressTasks.replaceChildren();
}

function appendTasks(element, str, taskContainer, newTask) {
  let deleteButton = document.createElement('button');
  let moveButton = document.createElement('button');
  let title = document.createElement('h2');
  deleteButton.innerHTML = 'X';
  deleteButton.className = 'delete-button';
  moveButton.innerHTML = 'move-->';
  moveButton.className = 'move-button';

  title.innerHTML = element.title;
  if (element.status === str){
    newTask.dataset.id = element.id;
    newTask.appendChild(title);
    newTask.appendChild(deleteButton);
    newTask.appendChild(moveButton);
    taskContainer.appendChild(newTask);
  }
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
    let statusArr = ['todo', 'in-progress', 'done'];
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

  state.tasks.forEach(element => {
    let newTask = document.createElement('div');
    newTask.className = 'task-card';
    appendTasks(element, 'todo', todoTasks, newTask);
    appendTasks(element, 'done', doneTasks, newTask);
    appendTasks(element, 'in-progress', inProgressTasks, newTask);
  });
}

container.addEventListener('click', handleClick);
addTaskButton.addEventListener('click', createTasks);

render();
