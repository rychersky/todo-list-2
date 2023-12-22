import './main.scss';
import { openProjectModal } from './ui/modals';
import { updateProjectsList } from './ui/misc';

document
  .querySelector('.new-project')
  .addEventListener('click', openProjectModal);

updateProjectsList();
