
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

function render() {
  clearTasks();

  state.tasks.forEach(element => {
    let newTask = document.createElement('div');
    appendTasks(element, 'todo', todoTasks, newTask);
    appendTasks(element, 'done', doneTasks, newTask);
    appendTasks(element, 'in-progress', inProgressTasks, newTask);
  });
}

render();
