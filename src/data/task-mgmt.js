import { getLS, setLS } from './local-storage';

class Task {
  description;
  dueDate;
  project;

  constructor(title) {
    this.title = title;
  }
}

export function addTask(title, description, dueDate, project) {
  if (!title) {
    return false;
  }
  const ls = getLS();
  const taskAlreadyExists = ls.tasks.some((task) => task.title === title);
  if (taskAlreadyExists) {
    console.log(`Cannot add task, already exists: [${title}]`);
    return false;
  }
  const newTask = new Task(title);
  newTask.description = description;
  newTask.dueDate = dueDate;
  newTask.project = project;
  ls.tasks.push(newTask);
  setLS(ls);
  console.log(`Added task: [${title}]`);
  return true;
}

export function deleteTask(title) {
  const ls = getLS();
  const taskDoesNotExist = !ls.tasks.some((task) => task.title === title);
  if (taskDoesNotExist) {
    console.log(`Cannot delete task, does not exist: [${title}]`);
    return false;
  }
  ls.tasks = ls.tasks.filter((task) => task.title !== title);
  setLS(ls);
  console.log(`Removed task: [${title}]`);
  return true;
}

export function editTask(title, newTitle, description, dueDate, project) {
  if (!title) {
    return false;
  }
  const ls = getLS();
  const taskDoesNotExist = !ls.tasks.some((task) => task.title === title);
  if (taskDoesNotExist) {
    console.log(`Cannot update task, does not exist: [${title}]`);
    return false;
  }
  const newTitleAlreadyExists =
    title !== newTitle && ls.tasks.some((task) => task.title === newTitle);
  if (newTitleAlreadyExists) {
    console.log(
      `Cannot update task [${title}], new title already exists: [${newTitle}]`
    );
    return false;
  }
  const task = ls.tasks[ls.tasks.findIndex((task) => task.title === title)];
  task.title = newTitle ? newTitle : title;
  task.description = description;
  task.dueDate = dueDate;
  task.project = project;
  setLS(ls);
  console.log(`Updated task: [${title}]`);
  return true;
}

export function getTodos(projectName) {
  const ls = getLS();
  if (projectName) {
    const filtered = ls.tasks.filter((task) => task.project === projectName);
    return filtered;
  }
  return ls.tasks;
}
