import './main.scss';
import { openProjectModal, openTodoAddModal } from './ui/modals/modals';
import { updateProjectsList } from './ui/projects/projects';
import { updateTodosList } from './ui/todos/todos';

document
  .querySelector('.create-project')
  .addEventListener('click', openProjectModal);

document
  .querySelector('.create-todo')
  .addEventListener('click', openTodoAddModal);

updateProjectsList();
updateTodosList();
