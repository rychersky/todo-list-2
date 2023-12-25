import './modals.scss';
import {
  createProject,
  deleteProject,
  getProjects,
} from '../../data/project-mgmt';
import { addTodo, editTodo, readTodo } from '../../data/todo-mgmt';
import { updateProjectsList } from '../projects/projects';
import { updateTodosList } from '../todos/todos';

const body = document.querySelector('body');

export function openProjectModal() {
  const container = baseModal('project-modal');
  const modal = container.firstElementChild;
  modal.innerHTML = /* html */ `
    <h2>New Project</h2>
    <input type="text" maxlength="20"/>
    <button type="button" disabled>Create</button>
  `;
  const inputField = modal.querySelector('input');
  const createButton = modal.querySelector('button');

  function enterKeyPress(e) {
    if (e.key === 'Enter') {
      createButtonClick();
    }
  }

  function createButtonClick() {
    createProject(inputField.value);
    closeModal();
    document.removeEventListener('keydown', enterKeyPress);
    updateProjectsList();
  }

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
  body.appendChild(container);
  inputField.focus();
}

export function openProjectCloseModal(projectName) {
  const container = baseModal('project-close-modal');
  const modal = container.firstElementChild;
  modal.innerHTML = /* html */ `
    <h2>Are you sure you want to delete project: <span>${projectName}</span>?</h2>
    <ul>
      <li><button class="project-close-modal--yes" type="button">Yes</button></li>
      <li><button class="project-close-modal--no" type="button">No</button></li>
    </ul>
  `;
  const yes = modal.querySelector('.project-close-modal--yes');
  const no = modal.querySelector('.project-close-modal--no');

  yes.addEventListener('click', () => {
    deleteProject(projectName);
    closeModal();
    document.querySelector('h1').innerHTML = 'Inbox';
    updateProjectsList('Inbox');
  });

  no.addEventListener('click', () => {
    closeModal();
  });

  body.appendChild(container);
}

export function openTodoEditModal(title) {
  const container = baseModal('todo-edit-modal');
  const modal = container.firstElementChild;
  const todoOriginal = readTodo(title);
  modal.innerHTML = /* html */ `
    <h2>Edit Todo</h2>
    <div class="todo-title-container">
      <label for="todo-title">Title:</label>
      <input id="todo-title" type="text" value="${todoOriginal.title}" />
      <p class="title-empty">Please enter a title for your todo.</p>
      <p class="title-already-taken">A todo with this title already exists.</p>
    </div>

    <label for="todo-description">Description:</label>
    <input id="todo-description" type="text" value="${
      todoOriginal.description || ''
    }" />

    <label for="todo-date">Due Date:</label>
    <input id="todo-date" type="date" value="${todoOriginal.dueDate || ''}" />

    <label for="todo-project">Project:</label>
    <select id="todo-project">
      <option value="">None</option>
    </select>

    <div class="edit-buttons">
      <button type="button" class="edit-submit">Submit</button>
      <button type="button" class="edit-cancel">Cancel</button>
    </div>
  `;
  const titleField = modal.querySelector('#todo-title');
  const titleEmptyWarning = modal.querySelector('.title-empty');
  const titleMissingWarning = modal.querySelector('.title-already-taken');
  const descriptionField = modal.querySelector('#todo-description');
  const dateField = modal.querySelector('#todo-date');
  const projectField = modal.querySelector('#todo-project');
  const submitButton = modal.querySelector('.edit-submit');
  const cancelButton = modal.querySelector('.edit-cancel');

  const projects = getProjects();
  projects.forEach((p) => {
    const option = document.createElement('option');
    option.value = p;
    option.innerHTML = p;
    projectField.appendChild(option);
  });
  projectField.value = todoOriginal.project || '';

  titleField.addEventListener('input', (e) => {
    if (e.target.value) {
      submitButton.disabled = false;
      submitButton.classList.remove('disabled');
      titleField.classList.remove('title-required');
      titleEmptyWarning.classList.remove('show-warning');
    } else {
      submitButton.disabled = true;
    }
  });

  titleField.addEventListener('change', (e) => {
    if (!e.target.value) {
      titleField.classList.add('title-required');
      titleEmptyWarning.classList.add('show-warning');
    }
  });

  function addTodoEnterKeyPress(e) {
    if (e.key === 'Enter') {
      submitButtonClick();
    }
  }

  function submitButtonClick() {
    const nameHasChanged = todoOriginal.title !== titleField.value;
    const newNameAlreadyTaken = !!readTodo(titleField.value);

    if (nameHasChanged && newNameAlreadyTaken) {
      titleField.classList.add('title-required');
      titleMissingWarning.classList.add('show-warning');
    } else {
      editTodo(
        title,
        titleField.value,
        descriptionField.value,
        dateField.value,
        projectField.value
      );
      closeModal();
      document.removeEventListener('keydown', addTodoEnterKeyPress);
      updateTodosList();
    }
  }
  submitButton.addEventListener('click', submitButtonClick);
  cancelButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', addTodoEnterKeyPress);

  document.querySelector('body').appendChild(container);
  titleField.focus();
  const value = titleField.value;
  titleField.value = '';
  titleField.value = value;
}

export function openTodoAddModal() {
  const container = baseModal('todo-add-modal');
  const modal = container.firstElementChild;
  modal.innerHTML = /* html */ `
    <h2>Add Todo</h2>
    <div class="todo-title-container">
      <label for="todo-title">Title:</label>
      <input id="todo-title" type="text" />
      <p class="title-empty">Please enter a title for your todo.</p>
      <p class="title-already-taken">A todo with this title already exists.</p>
    </div>

    <label for="todo-description">Description:</label>
    <input id="todo-description" type="text" />

    <label for="todo-date">Due Date:</label>
    <input id="todo-date" type="date" />

    <label for="todo-project">Project:</label>
    <select id="todo-project">
      <option value="">None</option>
    </select>

    <div class="edit-buttons">
      <button type="button" class="edit-submit disabled-btn">Submit</button>
      <button type="button" class="edit-cancel">Cancel</button>
    </div>
  `;
  const titleField = modal.querySelector('#todo-title');
  const titleEmptyWarning = modal.querySelector('.title-empty');
  const titleMissingWarning = modal.querySelector('.title-already-taken');
  const descriptionField = modal.querySelector('#todo-description');
  const dateField = modal.querySelector('#todo-date');
  const projectField = modal.querySelector('#todo-project');
  const submitButton = modal.querySelector('.edit-submit');
  const cancelButton = modal.querySelector('.edit-cancel');

  const projects = getProjects();
  projects.forEach((p) => {
    const option = document.createElement('option');
    option.value = p;
    option.innerHTML = p;
    projectField.appendChild(option);
  });

  titleField.addEventListener('input', (e) => {
    if (e.target.value) {
      submitButton.disabled = false;
      submitButton.classList.remove('disabled-btn');
      titleField.classList.remove('title-required');
      titleEmptyWarning.classList.remove('show-warning');
    } else {
      submitButton.disabled = true;
    }
  });

  titleField.addEventListener('change', (e) => {
    if (!e.target.value) {
      titleField.classList.add('title-required');
      titleEmptyWarning.classList.add('show-warning');
    }
  });

  function addTodoEnterKeyPress(e) {
    if (e.key === 'Enter') {
      submitButtonClick();
    }
  }

  function submitButtonClick() {
    const todoNameAlreadyTaken = !!readTodo(titleField.value);

    if (!titleField.value) {
      titleField.classList.add('title-required');
      titleEmptyWarning.classList.add('show-warning');
    } else if (todoNameAlreadyTaken) {
      titleField.classList.add('title-required');
      titleMissingWarning.classList.add('show-warning');
    } else {
      addTodo(
        titleField.value,
        descriptionField.value,
        dateField.value,
        projectField.value
      );
      closeModal();
      document.removeEventListener('keydown', addTodoEnterKeyPress);
      updateTodosList();
    }
  }

  submitButton.addEventListener('click', submitButtonClick);
  cancelButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', addTodoEnterKeyPress);

  body.appendChild(container);
  titleField.focus();
}

function baseModal(modalClassName) {
  document.activeElement.blur();
  const container = document.createElement('div');
  container.classList.add('modal-container');
  container.innerHTML = /* html */ `
    <div class="modal ${modalClassName}">
    </div>
  `;

  const modal = container.querySelector('.modal');
  modal.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  container.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModalEsc);

  return container;
}

function closeModalEsc(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  const container = document.querySelector('.modal-container');
  body.removeChild(container);
  document.removeEventListener('keydown', closeModalEsc);
}
