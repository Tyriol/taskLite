import { useState, useRef, useEffect } from 'react';

import { todoDocuments } from './database/lokidb';
import './App.css';
// TODO: Add ability to mark as done without deleting
function App() {
  interface Todos {
    id: number;
    todo: string;
  }
  // state
  const [todo, setTodo] = useState('');
  const [editTodo, setEditTodo] = useState('');
  const [todos, setTodos] = useState<Todos[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  // console.log(todoDocuments);

  useEffect(() => {
    const allDocuments = todoDocuments.find();
    console.log(allDocuments);

    setTodos(allDocuments);
  }, []);

  // modal component
  const ModalDialog = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
      dialogRef.current?.showModal();
    };

    const closeModal = () => {
      dialogRef.current?.close();
    };

    return (
      <div>
        <button onClick={openModal}>About the App</button>
        <dialog ref={dialogRef}>
          <h2>About TaskLite</h2>
          <div>
            <p>
              Ever feel overwhelmed by a never ending todo list that you keep
              adding to, but never seem able to complete?
            </p>
            <p>
              That's why I created this todo list, that only allows you to add
              your 3 most important tasks for the day. You can only add more
              once you've ticked something off, so the most you'll ever have is
              3!
            </p>
            <p>Get out there and get it done!</p>
          </div>
          <button onClick={closeModal}>Close</button>
        </dialog>
      </div>
    );
  };

  // capture input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingId) {
      setEditTodo(e.target.value);
    } else {
      setTodo(e.target.value);
      setError('');
    }
  };

  // add todo to todos array
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!todo) {
      setError('Please enter a todo');
      return;
    }
    const id = Date.now();
    const newTodo = todoDocuments.insert({ id, todo });
    console.log('New Todo', newTodo);
    const allDocuments = todoDocuments.find();
    setTodos(allDocuments);
    setTodo('');
  };

  // delete todo from list
  // TODO: Delete item from local storage
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

  // handle edit initial open
  const openEdit = (id: number) => {
    setEditingId(id);
  };

  // To handle a todo item being clicked
  // TODO: Update local storage item
  const handleEdit = (id: number) => {
    if (!editTodo) {
      setEditingId(null);
      return;
    }
    const todoToEditIndex = todos.findIndex(td => td.id === id);
    if (todoToEditIndex === -1) return;
    const updatedTodos = [...todos];
    updatedTodos[todoToEditIndex] = {
      id: id,
      todo: editTodo,
    };
    setTodos(updatedTodos);
    setEditTodo('');
    setEditingId(null);
  };

  return (
    <div className="wrapper">
      <h1>TaskLite</h1>
      <h2>To The Point Todo's</h2>
      <ModalDialog />
      {todos.length === 3 ? (
        <div className="todo-submit">You've got enough to get on with</div> // TODO: Update this text
      ) : (
        <form className="card" onSubmit={handleSubmit}>
          <label className="todo-label">
            What are your most important tasks today?:
            <input
              className="todo-input"
              type="text"
              value={todo}
              onChange={handleChange}
            />
          </label>
          <p className="error">{error}</p>

          <button className="todo-submit" type="submit">
            Add Todo
          </button>
        </form>
      )}
      <div>
        <ul className="list-todos">
          {todos.map(td => {
            return (
              <li className="todo-item" key={td.id}>
                {editingId === td.id ? (
                  <>
                    <input
                      className="todo-input"
                      type="text"
                      value={editTodo}
                      // TODO: Show previous value when editing
                      onChange={handleChange}
                    />
                    <button type="button" onClick={() => handleEdit(td.id)}>
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    {td.todo}
                    <button type="button" onClick={() => openEdit(td.id)}>
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
                    <button type="button" onClick={() => handleDelete(td.id)}>
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
      </div>
    </div>
  );
}

export default App;
