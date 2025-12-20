import logo from "./logo.svg";
import "./App.css";
import todoListReducer from "./reducer/todoListReducer";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const todoList = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault(); //ngăn chặn submit form lên server
    //event.target chính là cái form của mình
    const newTodo = event.target.querySelector("input").value.trim();
    // alert(todo.value);
    if (newTodo) {
      const keyName = Math.floor(Math.random() * 10000);
      const objNewTodo = { key: keyName, name: newTodo };
      dispatch({ type: "add", payload: objNewTodo });
    }
    event.target.reset();
  }

  function handleRemove(event) {
    //event.target là cái button .parentElement là thằng li, getAttribute là nó lấy ra data của thẻ li
    const keyName = event.target.parentElement.getAttribute("data");
    // alert(keyName);
    if (keyName) {
      dispatch({ type: "remove", payload: keyName });
    }
  }
  console.log(todoList);
  return (
    <div>
      <h1>Danh sách công việc phải làm</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        Nhập tên công việc: <input type="text" />
      </form>
      <div></div>
      <ol id="view-todolist">
        {todoList.map((el) => {
          return (
            <li key={el.key} data={el.key}>
              {el.name}
              <button onClick={(e) => handleRemove(e)}>Xóa</button>
            </li>
          );
        })}
      </ol>
      <div>
        Số lượng: <span className="qty">{todoList.length}</span>
      </div>
    </div>
  );
}

export default App;
