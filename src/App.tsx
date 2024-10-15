import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  interface Todos {
    id: number;
    todo: string;
  }

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState<Todos[]>([]);
  
  // capture input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  }

  // add todo to todos array
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const id = Date.now();
    setTodos([...todos, {id, todo}]);
    setTodo('');
  }

  // delete todo from list
  const handleDelete = (id: number) => {
    const todoToRemove = todos.findIndex(td => td.id === id)
    setTodos([...todos.slice(0, todoToRemove), ...todos.slice(todoToRemove + 1)]);
  }

  return (
    <>
      <h1>What ToDo</h1>
      <form className="card" onSubmit={handleSubmit}>
        <label>
          What is on your todo list?:<br />
          <input type="text" value={todo} onChange={handleChange} />
        </label>
        <button className="todo-submit" type="submit">Add Todo</button>
      </form>
      <div>
          <ul className="list-todos">
            {todos.map((td) => {
              return(
                <li className="todo-item" key={td.id}>{td.todo}
                  <button type="button" onClick={() => handleDelete(td.id)}>Delete</button>
                </li>
              )
            })}
          </ul>
      </div>
      <div>
        <p>Built with:</p>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  )
}

export default App
