//redux thì nó sẽ ko liên quan gì đến reactJS mà
//nó chỉ là thư viện giúp cho mình quản lý state
const { createStore } = window.Redux;

//action là object vd: {type: 'increment'}
const initalState = []; //danh sách là array công việc

const todoListReducer = (state = initalState, action) => {
  //state là trạng thái hiện tại
  switch (action.type) {
    case "add":
      var newState = [...state]; //newState = state //ghi đè vào bộ nhớ ăn mày luôn
      newState.push(action.payload);
      return newState;
    case "remove":
      if (typeof action.payload == "number") {
        var newState = [...state]; //copy ra 1 cái state mới
        const key = action.payload; //danh sách của mình tính là 0 nhưng mà mình lưu là 1
        const index = key - 1; //danh sách tính từ 0
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
  olTag.innerHTML = ""; //nhiều cái lặp lại quá, nội dung của nó về rỗng
  //lần 1 thêm thẻ li, refresh mỗi lần lại
  let key = 0;
  for (const todo of todoList) {
    const liTag = document.createElement("li");
    liTag.textContent = todo;
    //add button
    const btnEl = document.createElement("button");
    btnEl.textContent = "Xóa";
    btnEl.setAttribute("type", "button");
    btnEl.setAttribute("key", key);
    //xóa nút
    btnEl.addEventListener("click", deleteTodo);
    //bỏ nó vô trong liTag
    liTag.appendChild(btnEl);
    //
    //add checkbox for supporting to delete item
    const chkEL = document.createElement("input");
    chkEL.setAttribute("type", "checkbox");
    chkEL.setAttribute("key", key);
    liTag.prepend(chkEL);
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
  e.preventDefault();
  const inputTag = formTag.querySelector("input");
  const tagName = inputTag.value;
  store.dispatch({ type: "add", payload: tagName });
  this.reset(); //reset lại
};

const chkAll = document.querySelector(".chk-all");
chkAll.onclick = function () {
  const olEl = document.querySelector("#view-todolist");
  //những thằng nào mà chưa check thì mình lấy ra check cho nó
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
    //state bị change rồi => mình xóa bị sai
    //những thằng check rồi thì xóa
    keys.push(Number(key));
  }
  if (keys.length > 0) {
    store.dispatch({ type: "remove", payload: keys }); //khi mà mình xóa thì cái
  }
};
