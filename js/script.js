const { createStore } = window.Redux;

//action là object vd: {type: 'increment'}
const initalState = [];
const todoListReducer = (state = initalState, action) => {
  //state là trạng thái hiện tại
  switch (action.type) {
    case "add":
      var newState = [...state];
      newState.push(action.payload);
      return newState;
    case "remove":
      if (typeof action.payload == "number") {
        var newState = [...state];
        const key = action.payload;
        const index = key - 1; //đã tính từ 0
        newState.splice(index, 1);
        return newState;
      } else {
        var newState = [];
        const keyList = action.payload;
        for (let i = 0; i <= state.length - 1; i++) {
          const key = i + 1;
          if (!keyList.includes(key)) {
            const task = state[i];
            newState.push(task);
          }
        }
        return newState;
      }

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
    liTag.textContent = todo;
    const btnEl = document.createElement("button");
    btnEl.textContent = "Xóa";
    btnEl.setAttribute("type", "button");
    btnEl.setAttribute("key", key);

    btnEl.addEventListener("click", deleteTodo);
    liTag.appendChild(btnEl);
    //Add thêm checkbox để hỗ trợ xóa item
    const chkEl = document.createElement("input");
    chkEl.setAttribute("type", "checkbox");
    chkEl.setAttribute("key", key);

    liTag.prepend(chkEl);

    olTag.appendChild(liTag);
    key++;
  }

  const qtyEl = document.querySelector(".qty");
  qtyEl.innerHTML = todoList.length;
});

const deleteTodo = (event) => {
  const key = event.target.getAttribute("key");
  store.dispatch({ type: "remove", payload: key });
};

const formTag = document.querySelector("form");
formTag.onsubmit = function (e) {
  //
  e.preventDefault();
  const inputTag = formTag.querySelector("input");
  const taskName = inputTag.value;
  store.dispatch({ type: "add", payload: taskName });
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
  const keys = [];
  for (const checkedEl of checkedEls) {
    let key = checkedEl.getAttribute("key");
    keys.push(Number(key));
  }
  if (keys.length > 0) {
    store.dispatch({ type: "remove", payload: keys });
  }
};
