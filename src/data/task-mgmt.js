import { getLS, setLS } from './local-storage';
import { Task } from './task';

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
  const newTitleDoesAlreadyExist =
    title !== newTitle && ls.tasks.some((task) => task.title === newTitle);
  if (newTitleDoesAlreadyExist) {
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

export function readTask(title) {
  if (!title) {
    return false;
  }
  const ls = getLS();
  const taskDoesNotExist = !ls.tasks.some((task) => task.title === title);
  if (taskDoesNotExist) {
    console.log(`Cannot update task, does not exist: ${title}`);
    return false;
  }
  const task = ls.tasks.filter((t) => t.title === title)[0];
  return task;
}

// addTask('test1', 'no project', undefined, undefined, 'project1');
// editTask(
//   'test2',
//   'test2',
//   'yea yea yea',
//   undefined,
//   undefined,
//   'a test project'
// );
// deleteTask('test1');
// console.log('readTask:', readTask('test2'));
// console.log(JSON.parse(localStorage.getItem('todo-list-2')));
