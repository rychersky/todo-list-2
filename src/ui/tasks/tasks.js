import './tasks.scss';
import { getTodos } from '../../data/task-mgmt';

export function updateTodosList(projectName) {
  const list = document.querySelector('.todos ul');
  list.innerHTML = '';

  const todos = getTodos(projectName);
  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.innerHTML = /* html */ `
      <button><span>✔</span></button>
      <div class="todo-title">${todo.title ? todo.title : ''}</div>
      <div class="todo-date">${todo.dueDate ? todo.dueDate : ''}</div>
      <div class="todo-description">${
        todo.description ? todo.description : ''
      }</div>
    `;
    list.appendChild(li);
  });
}
