import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";

function App(props) {
  console.log("component re-render");

  return (
    <div>
      <button onClick={() => props.dispatchDeposit(20)}>deposit $20</button>
      <button onClick={() => props.dispatchWithdraw(10)}>withdraw $10</button>
      <div id="result">{props.money}</div>
      {/* <div>{props.increment}</div> */}
    </div>
  );
}

//gõ map

//ownProps là {increment: 5}

const mapStateToProps = (state, ownProps) => {
  //money của state trên store mà change thì component sẽ được re-render
  //nghĩa là trong giao diện của mình có nhiều thuộc tính, khi mà có 1
  //cái nào đó bị thay đổi thì nó sẽ không render lại tất cả mà chỉ render
  //cái component nào thay đổi thôi
  //ownProps
  //hàm mapStateToProps luôn luôn chạy để nó mới kiểm tra đc
  //cái state nó bị change và khi mà cái state nó bị change thì lúc đó nó
  //sẽ re-render lại cái này => nó luôn chạy nếu có state bất kì thay đổi
  //có nghĩa là nó luôn luôn chạy, có chạy hay không là phụ thuộc vào, cái giá trị của cái
  //thuộc tính này có tạo hay không
  //có nghĩa là cái hàm này luôn luôn lắng nghe cái stateChange đó
  //nó phải luôn luôn chạy thì nó mới biết trong đây có change hay không
  //và khi mà cái này có change thì nó mới đc re-render lại
  // if(ownProps.increment == 5){
  //   return {teoem: state.teoem}
  // }
  console.log("chạy hàm mapStateToProps");
  return {
    money: state.money,
    // money: 1, //test thử số 1 thì web của mình mặc định là 1 luôn
    //nên nó sẽ không có re-render lại nha
    // teoem: 222
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchDeposit: (number) => {
      dispatch({ type: "deposit", payload: number });
    },
    dispatchWithdraw: (number) => {
      // dispatch({ type: "withdraw1", payload: number });
      dispatch({ type: "withdraw", payload: number });
    },
  };
};

export default connect(
  mapStateToProps, //
  mapDispatchToProps
)(App);
