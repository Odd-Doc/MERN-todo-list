import { useState, useEffect } from "react";

const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false)
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    GetTodos();
    return () => {
      abortController.abort()
    }

  }, []);

  const GetTodos = () => {
    fetch(API_BASE + '/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  }

  const completeTodo = async (todoId) => {
    const data = await fetch(API_BASE + '/todo/complete/' + todoId)
      .then((res) => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete
      }
      return todo;
    }))

  }
  const deleteTodo = async (todoId) => {
    // const data = await fetch(API_BASE + '/todo/delete/' + todoId, { method: "DELETE" })
    //   .then((res) => res.json());
    const data = await fetch(API_BASE + '/todo/delete/' + todoId, { method: "DELETE" }).then(res => res.json());


    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }

  const addTodo = async () => {
    const data = await fetch(API_BASE + '/todo/new/', {
      method: 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newTodo })
    })
      .then((res) => res.json()).catch(err => console.error("Error: ", err));
    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  }

  return (
    <div className="App">
      <h1>Hey Odd Doc</h1>
      <h4>Your Tasks:</h4>
      <div className="todos">
        {
          todos.length > 0 ? todos.map(todo => (
            <div className={
              "todo" + (todo.complete ? " is-complete" : "")
            } key={todo._id} onClick={() => completeTodo(todo._id)}>
              <div className="checkbox"></div>

              <div className="text">{todo.text}</div>

              <div className="delete-todo" onClick={(e) => { e.stopPropagation(); deleteTodo(todo._id) }}>x</div>
            </div>
          )) : <div><h4>You have no pending tasks at this time..</h4></div>}

      </div>
      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            x
          </div>
          <div className="content">
            <h3>
              Add Task
            </h3>

            <input type="text" className="add-todo-input" onChange={(e) => setNewTodo(e.target.value)} value={newTodo} />
            <div className="button" onClick={() => { addTodo(newTodo) }}>Create Task</div>
          </div>
        </div>
      ) : ''
      }
    </div >
  );
}

export default App;
