export function getLS() {
  if (!JSON.parse(localStorage.getItem('todo-list-2'))) {
    setLS({ tasks: [], projects: [] });
  }
  return JSON.parse(localStorage.getItem('todo-list-2'));
}

export function setLS(obj) {
  localStorage.setItem('todo-list-2', JSON.stringify(obj));
}
