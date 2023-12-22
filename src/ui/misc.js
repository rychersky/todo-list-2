import { getProjects } from '../data/projects';
import { deleteProject } from '../data/projects';

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
      // TODO: filter task list
      console.log(`Clicked [${e.target.innerText}] button`);
    });

    node.addEventListener('mouseenter', (e) => {
      if (!['Inbox', 'Today'].includes(e.target.firstElementChild.innerText)) {
        const deleteButton = document.createElement('button');
        deleteButton.addEventListener('click', (event) => {
          event.stopPropagation();
          const projectName = node.querySelector('.project').innerText;
          deleteProject(projectName);
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
