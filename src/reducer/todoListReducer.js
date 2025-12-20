// [
//   { key: 1527, name: Task1 },
//   { key: 1927, name: Task2 },
// ];
//state tách rồi hoàn toàn với cái state cũ
const initalState = [];
const todoListReducer = (state = initalState, action) => {
  //state là trạng thái hiện tại
  let newState;
  switch (action.type) {
    case "add":
      newState = [];

      for (const el of state) {
        newState.push({ ...el }); //lấy từng cái thuộc tính của el vào đây
        // newState.push({ key: 1257, name: "Task1" });
      }
      newState.push({ ...action.payload }); //payload gồm key: 1927, name: Task2
      return newState;
    /*
      === là giống nhau cả về kiểu dữ liệu VÀ giá trị
      !== chỉ cần khác nhau về kiểu dữ liệu là true OR khác nhau về giá trị là true
      */
    case "remove":
      //later
      newState = [];

      for (const el of state) {
        const removeKey = Number(action.payload);
        if (el.key !== removeKey) {
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

export default todoListReducer;
