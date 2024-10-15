import { useState } from 'react';
import './App.css';

function App() {
  interface Todos {
    id: number;
    todo: string;
  }

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Todos[]>([]);

  // capture input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  // add todo to todos array
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const id = Date.now();
    setTodos([...todos, { id, todo }]);
    setTodo('');
  };

  // delete todo from list
  const handleDelete = (id: number) => {
    const todoToRemove = todos.findIndex(td => td.id === id);
    setTodos([
      ...todos.slice(0, todoToRemove),
      ...todos.slice(todoToRemove + 1),
    ]);
  };

  return (
    <div className="wrapper">
      <h1>What ToDo</h1>
      <form className="card" onSubmit={handleSubmit}>
        <label>
          What is on your todo list?:
          <br />
          <input className="todo-input" type="text" value={todo} onChange={handleChange} />
        </label>
        <button className="todo-submit" type="submit">
          Add Todo
        </button>
      </form>
      <div>
        <ul className="list-todos">
          {todos.map(td => {
            return (
              <li className="todo-item" key={td.id}>
                {td.todo}
                <button type="button" onClick={() => handleDelete(td.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#fff" version="1.1" id="Capa_1" width="1em" height="1em" viewBox="0 0 485 485" xmlSpace="preserve"><g><g><rect x="67.224" width="350.535" height="71.81"/><path d="M417.776,92.829H67.237V485h350.537V92.829H417.776z M165.402,431.447h-28.362V146.383h28.362V431.447z M256.689,431.447    h-28.363V146.383h28.363V431.447z M347.97,431.447h-28.361V146.383h28.361V431.447z"/></g></g></svg>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
