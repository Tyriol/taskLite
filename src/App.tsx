import { useState, useEffect } from 'react';

import Modal from './components/Modal/Modal.tsx';

import { todoDocuments } from './database/lokidb';
import { todosCompleteToday } from './utils/date.ts';
import './App.css';

function App() {
  interface Todos {
    id: number;
    todo: string;
    done: boolean;
    completedAt: number | null;
  }

  // state
  const [todo, setTodo] = useState<string>('');
  const [editTodo, setEditTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todos[]>([]);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [todosCompletedToday, setTodosCompletedToday] = useState<number>(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Delay by 2 second to allow db to initialise and give loading message a chance
    const timer = setTimeout(() => {
      const todosTodo = todoDocuments.find({ done: false });
      const doneTodos = todoDocuments.find({ done: true });
      const completedToday = todosCompleteToday();
      setTodos(todosTodo);
      setCompletedCount(doneTodos.length);
      setTodosCompletedToday(completedToday.length);
      setIsLoading(false);
    }, 2000);
    // TODO: Add Error Handling
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingId) {
      setEditTodo(e.target.value);
    } else {
      setTodo(e.target.value);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!todo) {
      setError('Please enter a todo');
      return;
    }
    const id = Date.now();
    todoDocuments.insert({ id, todo, done: false, completedAt: null });
    setTodos([...todos, { id, todo, done: false, completedAt: null }]);
    setTodo('');
  };

  const handleComplete = (id: number) => {
    const completedTodo = todoDocuments.findOne({ id });
    if (completedTodo) {
      completedTodo.done = true;
      completedTodo.completedAt = Date.now();
      todoDocuments.update(completedTodo);
      setCompletedCount(completedCount + 1);
      setTodosCompletedToday(todosCompletedToday + 1);
    }
    const todoToRemoveIndex = todos.findIndex(td => td.id === id);
    setTodos([
      ...todos.slice(0, todoToRemoveIndex),
      ...todos.slice(todoToRemoveIndex + 1),
    ]);
  };

  const handleDelete = (id: number) => {
    const todoToRemove = todoDocuments.findOne({ id });
    if (todoToRemove) {
      todoDocuments.remove(todoToRemove);
    }
    const todoToRemoveIndex = todos.findIndex(td => td.id === id);
    setTodos([
      ...todos.slice(0, todoToRemoveIndex),
      ...todos.slice(todoToRemoveIndex + 1),
    ]);
  };

  const openEdit = (id: number, todo: string) => {
    setEditingId(id);
    setEditTodo(todo);
  };

  const handleEdit = (id: number) => {
    if (!editTodo) {
      setEditingId(null);
      return;
    }
    const todoToEdit = todoDocuments.findOne({ id });
    if (todoToEdit) {
      todoToEdit.todo = editTodo;
      todoDocuments.update(todoToEdit);
    }
    const todoToEditIndex = todos.findIndex(td => td.id === id);
    if (todoToEditIndex === -1) return;
    const updatedTodos = [...todos];
    updatedTodos[todoToEditIndex] = {
      id: id,
      todo: editTodo,
      done: updatedTodos[todoToEditIndex].done,
      completedAt: updatedTodos[todoToEditIndex].completedAt,
    };
    setTodos(updatedTodos);
    setEditTodo('');
    setEditingId(null);
  };

  return (
    <div className="wrapper">
      <h1>TaskLite</h1>
      <h2>To The Point Todo's</h2>
      <Modal />
      {todos.length === 3 ? (
        <div className="enough-todos-text">
          I'd say that's enough for now...wouldn't you?
        </div>
      ) : (
        <form className="card" onSubmit={handleSubmit}>
          <label className="todo-label">
            What are your most important tasks today?
            <input
              className="todo-input"
              type="text"
              value={todo}
              onChange={handleChange}
              name="todo-input"
            />
          </label>
          <p className="error">{error}</p>

          <button type="submit">Add Todo</button>
        </form>
      )}
      <div>
        {isLoading ? (
          <p className="fade-out">Hi there, Welcome to TaskLite!</p>
        ) : (
          <ul className="list-todos fade-in">
            {todos.map(td => {
              return (
                <li
                  className="todo-item"
                  key={td.id}
                  onClick={() => handleComplete(td.id)}
                >
                  {editingId === td.id ? (
                    <>
                      <input
                        className="todo-input"
                        type="text"
                        value={editTodo}
                        onChange={handleChange}
                        onClick={e => e.stopPropagation()}
                        name="todo-input"
                      />
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          handleEdit(td.id);
                        }}
                      >
                        Update
                      </button>
                    </>
                  ) : (
                    <>
                      {td.todo}
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          openEdit(td.id, td.todo);
                        }}
                      >
                        <svg
                          width="1rem"
                          height="1rem"
                          viewBox="0 0 21.00 21.00"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          fill="#000"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <g
                              id="Page-1"
                              strokeWidth="0.00021000000000000004"
                              fill="none"
                              fillRule="evenodd"
                            >
                              {' '}
                              <g
                                id="Dribbble-Light-Preview"
                                transform="translate(-99.000000, -400.000000)"
                                fill="#fff"
                              >
                                <g
                                  id="icons"
                                  transform="translate(56.000000, 160.000000)"
                                >
                                  <path
                                    d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z"
                                    id="edit-[#1479]"
                                  ></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(td.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          fill="#fff"
                          version="1.1"
                          id="Capa_1"
                          width="1em"
                          height="1em"
                          viewBox="0 0 485 485"
                          xmlSpace="preserve"
                        >
                          <g>
                            <g>
                              <rect x="67.224" width="350.535" height="71.81" />
                              <path d="M417.776,92.829H67.237V485h350.537V92.829H417.776z M165.402,431.447h-28.362V146.383h28.362V431.447z M256.689,431.447    h-28.363V146.383h28.363V431.447z M347.97,431.447h-28.361V146.383h28.361V431.447z" />
                            </g>
                          </g>
                        </svg>
                      </button>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div>
        {completedCount === 1 ? (
          <p>Well done, you've completed your first todo!</p>
        ) : (
          <>
            <p>You've completed {todosCompletedToday} so far today</p>
            <p>And {completedCount} in total!</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

// TODO: Split into components
// TODO: Abstract Logic out
