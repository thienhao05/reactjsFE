const { createStore } = window.Redux;

//action là object vd: {type: 'increment'}
// [
//   { key: 1527, name: Task1 },
//   { key: 1927, name: Task2 },
// ];
//state tách rồi hoàn toàn với cái state cũ
const initalState = [];
const todoListReducer = (state = initalState, action) => {
  //state là trạng thái hiện tại
  switch (action.type) {
    case "add":
      var newState = [];

      for (const el of state) {
        newState.push({ ...el }); //lấy từng cái thuộc tính của el vào đây
        // newState.push({ key: 1257, name: "Task1" });
      }
      newState.push({ ...action.payload }); //payload gồm key: 1927, name: Task2
      return newState;
    case "remove":
      //later
      var newState = [];

      for (const el of state) {
        const removeKey = Number(action.payload);
        if (el.key != removeKey) {
          newState.push({ ...el });
        }
        //lấy từng cái thuộc tính của el vào đây
        // newState.push({ key: 1257, name: "Task1" });
      }
      return newState;

    default:
      return state;
  }
};

let store = createStore(todoListReducer);
//thằng đăng kí phải đứng trước dispatch
store.subscribe(() => {
  const todoList = store.getState();
  const olTag = document.querySelector("#view-todolist");
  olTag.innerHTML = "";
  let key = 1;
  for (const todo of todoList) {
    const liTag = document.createElement("li");
    liTag.textContent = todo.name;
    liTag.setAttribute("key", todo.key);
    const btnEl = document.createElement("button");
    btnEl.textContent = "Xóa";
    btnEl.setAttribute("type", "button");

    btnEl.addEventListener("click", deleteTodo);
    liTag.appendChild(btnEl);
    //Add thêm checkbox để hỗ trợ xóa item
    const chkEl = document.createElement("input");
    chkEl.setAttribute("type", "checkbox");

    liTag.prepend(chkEl);

    olTag.appendChild(liTag);
    key++;
  }

  const qtyEl = document.querySelector(".qty");
  qtyEl.innerHTML = todoList.length;
});

const deleteTodo = (event) => {
  const key = event.target.parentElement.getAttribute("key");
  store.dispatch({ type: "remove", payload: key });
};

const formTag = document.querySelector("form");
formTag.onsubmit = function (e) {
  //
  e.preventDefault();
  const inputTag = formTag.querySelector("input");
  const taskName = inputTag.value;
  const keyName = Math.floor(Math.random() * 10000);
  store.dispatch({ type: "add", payload: { key: keyName, name: taskName } });
  this.reset();
};

const chkAllEl = document.querySelector(".chk-all");
chkAllEl.onclick = function () {
  const olEl = document.querySelector("#view-todolist");
  const unChkEls = olEl.querySelectorAll("input[type=checkbox]:not(:checked)");
  for (const unChkEl of unChkEls) {
    unChkEl.checked = true;
  }
};

const deleteTodoList = document.querySelector(".delete-todolist");
deleteTodoList.onclick = function () {
  const olEl = document.querySelector("#view-todolist");

  const checkedEls = olEl.querySelectorAll("input[type=checkbox]:checked");
  for (const checkedEl of checkedEls) {
    const liTag = checkedEl.parentElement;
    const removeKey = liTag.getAttribute("key");
    store.dispatch({ type: "remove", payload: removeKey });
  }
};
