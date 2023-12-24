import './main.scss';
import { openProjectModal, openTodoEditModal } from './ui/modals/modals';
import { updateProjectsList } from './ui/projects/projects';
import { updateTodosList } from './ui/todos/todos';

document
  .querySelector('.create-project')
  .addEventListener('click', openProjectModal);

updateProjectsList();
updateTodosList();
openTodoEditModal('Sample Todo');
