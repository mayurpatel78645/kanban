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

function clearTasks() {
  todoTasks.replaceChildren();
  doneTasks.replaceChildren();
  inProgressTasks.replaceChildren();
}

function appendTasks(element, str, taskContainer, newTask) {
  let deleteButton = document.createElement('button');
  let title = document.createElement('h2');
  deleteButton.innerHTML = 'X';
  deleteButton.className = 'delete-button';

  title.innerHTML = element.title;
  if (element.status === str){
    newTask.dataset.id = element.id;
    newTask.appendChild(title);
    newTask.appendChild(deleteButton);
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

function handleTodoTasks(e) {
  let event = e.target;
  if (event.classList.contains('delete-button')) {
    let element = event.closest('.task-card');
    let elementId = element.dataset.id;
    
    state.tasks = state.tasks.filter((task) => {
      return task.id !== elementId;
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

todoTasks.addEventListener('click', handleTodoTasks);
addTaskButton.addEventListener('click', createTasks);

render();
