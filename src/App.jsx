import { useState } from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
let nextTodoId = 0;
const addTodo = (text) => ({
  type: ADD_TODO,
  id: nextTodoId++,
  text,
});
const deleteTodo = (id) => ({
  type: DELETE_TODO,
  id,
});
const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});
const initialState = {
  todos: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            completed: false,
          },
        ],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    default:
      return state;
  }
};
const store = createStore(reducer);
const Todo = ({ id, text, completed }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };
  const handleToggle = () => {
    dispatch(toggleTodo(id));
    if (!completed) {
      alert("You done this work");
    }
  };
  return (
    <li>
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {text}
      </span>
      <input
        type="checkbox"
        className="translate-x-7 w-3"
        checked={completed}
        onChange={handleToggle}
      />
      <button onClick={handleDelete} className="btn ml-[100px] h-3 btn-primary">
        <FaRegTrashAlt></FaRegTrashAlt>
      </button>
    </li>
  );
};
const App = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const todoCount = todos.length;
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      dispatch(addTodo(inputValue));
      setInputValue("");
    }
  };
  return (
    <div className="">
      <div className="border border-purple-500 w-[800px] ml-[350px] rounded-xl border-[5px] mt-[250px] h-[300px]">
        <h1 className="-translate-y-14 translate-x-80 font-bold text-white text-2xl">
          Todo App
        </h1>
        <input
          type="text"
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Type here"
          className="input input-bordered input-secondary  ml-[180px] mr-5 w-[400px]"
        />
        <button className="btn bg-[#9E78CF]" onClick={handleAddTodo}>
          <TiPlus></TiPlus>
        </button>
        <div className="ml-[180px] mt-5">
          <p>Tasks to do - {todoCount}</p>
        </div>
        <div className="w-[450px] bg-[#15101C] justify-between ml-[180px] rounded-xl ">
          <ul className="ml-[180px]  mt-4">
            {todos.map((todo) => (
              <Todo key={todo.id} className="pl-5" {...todo} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
const AppWithRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
export default AppWithRedux;
