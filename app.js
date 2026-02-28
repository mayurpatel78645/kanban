
state = {
  tasks: [
    {
      id : 1,
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
  if (element.status === str){
    newTask.innerHTML = element.title;
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

function render() {
  clearTasks();

  state.tasks.forEach(element => {
    let newTask = document.createElement('div');
    appendTasks(element, 'todo', todoTasks, newTask);
    appendTasks(element, 'done', doneTasks, newTask);
    appendTasks(element, 'in-progress', inProgressTasks, newTask);
  });
}

addTaskButton.addEventListener('click', createTasks);

render();
