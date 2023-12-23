import './modals.scss';
import { createProject, deleteProject } from '../data/projects';
import { updateProjectsList } from './misc';

export function openProjectModal() {
  document.activeElement.blur();
  const container = document.createElement('div');
  const body = document.querySelector('body');
  container.classList.add('modal-container');
  container.innerHTML = /* html */ `
    <div class="modal project-modal">
      <h2>New Project</h2>
      <input type="text" maxlength="20"/>
      <button type="button" disabled>Create</button>
    </div>
  `;

  const projectModal = container.querySelector('.project-modal');
  const inputField = projectModal.querySelector('input');
  const createButton = projectModal.querySelector('button');

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

  function closeModalEsc(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  function closeModal() {
    body.removeChild(container);
    document.removeEventListener('keydown', closeModalEsc);
    document.removeEventListener('keydown', enterKeyPress);
  }

  projectModal.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  inputField.addEventListener('input', (e) => {
    if (e.target.value) {
      createButton.disabled = false;
      document.addEventListener('keydown', enterKeyPress);
    } else {
      createButton.disabled = true;
      document.removeEventListener('keydown', enterKeyPress);
    }
  });

  createButton.addEventListener('click', createButtonClick);
  container.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModalEsc);

  body.appendChild(container);
  inputField.focus();
}

export function openProjectCloseModal(projectName) {
  document.activeElement.blur();
  const container = document.createElement('div');
  const body = document.querySelector('body');
  container.classList.add('modal-container');
  container.innerHTML = /* html */ `
    <div class="modal project-close-modal">
      <h2>Are you sure you want to delete project: <span>${projectName}</span>?</h2>
      <ul>
        <li><button class="project-close-modal--yes" type="button">Yes</button></li>
        <li><button class="project-close-modal--no" type="button">No</button></li>
      </ul>
    </div>
  `;

  const projectCloseModal = container.querySelector('.project-close-modal');
  const yes = projectCloseModal.querySelector('.project-close-modal--yes');
  const no = projectCloseModal.querySelector('.project-close-modal--no');

  function closeModalEsc(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  function closeModal() {
    body.removeChild(container);
    document.removeEventListener('keydown', closeModalEsc);
  }

  projectCloseModal.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  yes.addEventListener('click', () => {
    deleteProject(projectName);
    closeModal();
    updateProjectsList();
  });
  no.addEventListener('click', () => {
    closeModal();
  });
  container.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModalEsc);

  body.appendChild(container);
}
