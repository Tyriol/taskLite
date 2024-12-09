import { useState } from 'react';
import './App.css';

function App() {
  interface Todos {
    id: number;
    todo: string;
  }
  // state
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Todos[]>([]);
  const [editTodo, setEditTodo] = useState(false);
  const [error, setError] = useState('');

  // capture input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
    setError('');
  };

  // add todo to todos array
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!todo) {
      setError('Please enter a todo');
      return;
    }
    const id = Date.now();
    setTodos([...todos, { id, todo }]);
    setTodo('');
  };

  // delete todo from list
  const handleDelete = (id: number) => {
    const todoToRemove = todos.findIndex(td => td.id === id);
    console.log(todoToRemove);
    setTodos([
      ...todos.slice(0, todoToRemove),
      ...todos.slice(todoToRemove + 1),
    ]);
  };

  // handle edit initial open
  const openEdit = () => {
    setEditTodo(true);
  };

  // To handle a todo item being clicked
  const handleEdit = (id: number) => {
    // const todoToEditIndex = todos.findIndex(td => td.id === id);
    const todoToEdit = todos.find(td => td.id === id);

    console.log(todoToEdit);
    setEditTodo(false);

    // if (todoToEdit) {
    //   setEditTodo(true);

    //   // create an input field
    //   // update the todo item with the new value
    //   // remove the input field and display the updated todo item
    // }
  };
  // select the todo item being updated
  // create an input field to update the todo item
  // update the todo item with the new value
  // remove the input field and display the updated todo item

  return (
    <div className="wrapper">
      <h1>What ToDo</h1>
      <form className="card" onSubmit={handleSubmit}>
        <label>
          What is on your todo list?:
          <br />
          <input
            className="todo-input"
            type="text"
            value={todo}
            onChange={handleChange}
          />
        </label>
        <p className="error">{error}</p>
        {todos.length === 3 ? (
          <div className="todo-submit">You've got enough to get on with</div>
        ) : (
          <button className="todo-submit" type="submit">
            Add Todo
          </button>
        )}
      </form>
      <div>
        <ul className="list-todos">
          {todos.map(td => {
            return (
              <li className="todo-item" key={td.id}>
                {editTodo ? (
                  <>
                    <input
                      className="todo-input"
                      type="text"
                      value={todo}
                      onChange={handleChange}
                    />
                    <button type="button" onClick={() => handleEdit(td.id)}>
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    {td.todo}
                    <button type="button" onClick={() => openEdit()}>
                      <svg
                        width="1rem"
                        height="1rem"
                        viewBox="0 0 21.00 21.00"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#000"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
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
