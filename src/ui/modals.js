import './modals.scss';
import { createProject } from '../data/projects';
import { updateProjectsList } from './misc';

export function openProjectModal() {
  document.activeElement.blur();
  const container = document.createElement('div');
  const body = document.querySelector('body');
  container.classList.add('modal-container');
  container.innerHTML = /* html */ `
    <div class="project-modal">
      <h2>New Project</h2>
      <input type="text" maxlength="20"/>
      <button type="button" disabled>Create</button>
    </div>
  `;

  const projectModal = container.querySelector('.project-modal');
  const inputField = projectModal.querySelector('input');
  const createButton = projectModal.querySelector('button');

  projectModal.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  inputField.addEventListener('input', (e) => {
    if (e.target.value) {
      createButton.disabled = false;
      document.addEventListener('keydown', enterKeyPress, { once: true });
    } else {
      createButton.disabled = true;
      document.removeEventListener('keydown', enterKeyPress);
    }
  });

  function enterKeyPress(e) {
    if (e.key === 'Enter') {
      createButtonClick();
    }
  }

  function createButtonClick() {
    createProject(inputField.value);
    closeModal();
    updateProjectsList();
  }

  createButton.addEventListener('click', createButtonClick);

  container.addEventListener('click', closeModal);
  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    { once: true }
  );

  body.appendChild(container);
}

function closeModal() {
  const container = document.querySelector('.modal-container');
  const body = document.querySelector('body');
  body.removeChild(container);
}
