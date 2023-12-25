import './todos.scss';
import { deleteTodo, getTodos } from '../../data/todo-mgmt';
import { openTodoEditModal } from '../modals/modals';

export function updateTodosList(projectName) {
  const list = document.querySelector('.todos ul');
  list.innerHTML = '';

  const todos = getTodos(projectName);
  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.innerHTML = /* html */ `
      <button><span>✔</span></button>
      <div class="todo-title">${todo.title}</div>
      <div class="todo-date">${todo.dueDate ? todo.dueDate : ''}</div>
      <div class="todo-description">${
        todo.description ? todo.description : ''
      }</div>
    `;

    li.addEventListener('click', (e) => {
      function findParent(target) {
        if (target.tagName === 'LI') {
          return target;
        } else {
          return findParent(target.parentElement);
        }
      }
      const li = findParent(e.target);
      const projectName = li.querySelector('.todo-title').innerHTML;
      openTodoEditModal(projectName);
    });

    const closeButton = li.querySelector('button');
    li.addEventListener('mouseenter', () => {
      closeButton.classList.add('mouseover-bg');
    });
    li.addEventListener('mouseleave', () => {
      closeButton.classList.remove('mouseover-bg');
    });
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTodo(todo.title);
      updateTodosList();
    });

    list.appendChild(li);
  });
}
