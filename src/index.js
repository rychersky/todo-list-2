import './main.scss';
import { openProjectModal } from './ui/modals/modals';
import { updateProjectsList } from './ui/projects/projects';
import { updateTodosList } from './ui/tasks/tasks';

document
  .querySelector('.create-project')
  .addEventListener('click', openProjectModal);

updateProjectsList();
updateTodosList();
