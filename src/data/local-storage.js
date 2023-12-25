export function getLS() {
  if (!JSON.parse(localStorage.getItem('todo-list-2'))) {
    setLS({ todos: sampleTodos, projects: ['Sample Project'] });
  }
  return JSON.parse(localStorage.getItem('todo-list-2'));
}

export function setLS(obj) {
  localStorage.setItem('todo-list-2', JSON.stringify(obj));
}

const sampleTodos = [
  {
    title: 'Sample Todo',
    description: 'A sample todo to demonstrate the UI',
    dueDate: '2023-12-25',
  },
  {
    title: 'Feed the dog',
    project: 'Sample Project',
  },
];
