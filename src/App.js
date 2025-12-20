import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App(props) {
  const money = useSelector((state) => state.money);
  //console.log("changed"); //khi nào mà state của mình change thì cái này sẽ hiện lên
  const dispatch = useDispatch(); //đẩy action lên trên store
  function dispatchDeposit(number) {
    dispatch({ type: "deposit", payload: number });
  }

  function dispatchWithdraw(number) {
    dispatch({ type: "withdraw", payload: number });
  }
  return (
    <div>
      <button onClick={() => dispatchDeposit(20)}>deposit $20</button>
      <button onClick={() => dispatchWithdraw(10)}>withdraw $10</button>
      <div>{money}</div>
      {/* <div>{props.increment}</div> */}
    </div>
  );
}

//mình mà dùng hook thì nó sẽ tiện lợi hơn
//cách này thì mình sẽ không sài connect
export default App;
