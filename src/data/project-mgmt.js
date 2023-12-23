import { getLS, setLS } from './local-storage';

export function createProject(name) {
  const ls = getLS();
  ls.projects.push(name);
  setLS(ls);
  console.log(`Created project: [${name}]`);
}

export function getProjects() {
  const ls = getLS();
  return ls.projects;
}

export function deleteProject(name) {
  const ls = getLS();
  const filtered = ls.projects.filter((project) => {
    return project !== name;
  });
  ls.projects = filtered;
  ls.tasks.forEach((task) => {
    if (task.project === name) {
      task.project = '';
    }
  });
  setLS(ls);
  console.log(`Removed project: [${name}]`);
}
