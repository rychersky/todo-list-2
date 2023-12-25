import './projects.scss';
import { getProjects } from '../../data/project-mgmt';
import { openProjectCloseModal } from '../modals/modals';
import { updateTodosList } from '../todos/todos';

export function updateProjectsList() {
  const menu = document.querySelector('.projects-menu ul');
  const nonDefaults = menu.querySelectorAll('li:not(.default-project)');
  nonDefaults.forEach((node) => {
    menu.removeChild(node);
  });

  const projects = getProjects();
  projects.forEach((project) => {
    const li = document.createElement('li');
    li.innerHTML = /* html */ `
      <button class="project" type="button">${project}</button>
    `;
    menu.appendChild(li);
  });

  const allProjects = menu.querySelectorAll('li');
  allProjects.forEach((node) => {
    node.addEventListener('click', (e) => {
      const projectName = e.target.innerHTML;
      document.querySelector('h1').innerHTML = projectName;
      updateTodosList();
    });

    node.addEventListener('mouseenter', (e) => {
      if (!['Inbox', 'Today'].includes(e.target.firstElementChild.innerText)) {
        const deleteButton = document.createElement('button');
        deleteButton.addEventListener('click', (event) => {
          console.log(e.target);
          event.stopPropagation();
          const projectName = node.querySelector('.project').innerText;
          openProjectCloseModal(projectName);
          updateProjectsList();
        });
        deleteButton.addEventListener('mouseenter', () => {
          node.querySelector('.project').classList.add('maintain-bg');
        });
        deleteButton.addEventListener('mouseleave', () => {
          node.querySelector('.project').classList.remove('maintain-bg');
        });
        deleteButton.innerHTML = 'X';
        deleteButton.classList.add('delete-project');
        e.target.appendChild(deleteButton);
      }
    });

    node.addEventListener('mouseleave', (e) => {
      if (!['Inbox', 'Today'].includes(e.target.firstElementChild.innerText)) {
        const deleteButton = e.target.querySelector('.delete-project');
        e.target.removeChild(deleteButton);
      }
    });
  });
}
