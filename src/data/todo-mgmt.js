import { getLS, setLS } from './local-storage';

class Todo {
  description;
  dueDate;
  project;

  constructor(title) {
    this.title = title;
  }
}

export function addTodo(title, description, dueDate, project) {
  if (!title) {
    return false;
  }
  const ls = getLS();
  const todoAlreadyExists = ls.todos.some((todo) => todo.title === title);
  if (todoAlreadyExists) {
    console.log(`Cannot add todo, already exists: [${title}]`);
    return false;
  }
  const newTodo = new Todo(title);
  newTodo.description = description;
  newTodo.dueDate = dueDate;
  newTodo.project = project;
  ls.todos.push(newTodo);
  setLS(ls);
  console.log(`Added todo: [${title}]`);
  return true;
}

export function deleteTodo(title) {
  const ls = getLS();
  const todoDoesNotExist = !ls.todos.some((todo) => todo.title === title);
  if (todoDoesNotExist) {
    console.log(`Cannot delete todo, does not exist: [${title}]`);
    return false;
  }
  ls.todos = ls.todos.filter((todo) => todo.title !== title);
  setLS(ls);
  console.log(`Removed todo: [${title}]`);
  return true;
}

export function editTodo(title, newTitle, description, dueDate, project) {
  const ls = getLS();
  const newTitleAlreadyExists =
    title !== newTitle && ls.todos.some((todo) => todo.title === newTitle);
  if (newTitleAlreadyExists) {
    console.log(
      `Cannot update todo [${title}], new title already exists: [${newTitle}]`
    );
    return false;
  }
  const todo = ls.todos[ls.todos.findIndex((todo) => todo.title === title)];
  todo.title = newTitle || title;
  todo.description = description;
  todo.dueDate = dueDate;
  todo.project = project;
  setLS(ls);
  console.log(`Updated todo: [${title}]`);
  return true;
}

export function readTodo(title) {
  const ls = getLS();
  const todo = ls.todos[ls.todos.findIndex((todo) => todo.title === title)];
  return todo;
}

export function getTodos(projectName) {
  const ls = getLS();
  if (projectName) {
    const filtered = ls.todos.filter((todo) => todo.project === projectName);
    return filtered;
  }
  return ls.todos;
}
