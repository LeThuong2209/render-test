import { useState } from "react";

const Display = (props) => {
  return <div>{props.counter}</div>;
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    const newLeft = left + 1;
    setLeft(left + 1);
    setTotal(newLeft + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const newRight = right + 1;
    setRight(right + 1);
    setTotal(left + newRight);
  };

  const reset = () => {
    setLeft(0);
    setRight(0);
    setTotal(0);
    setAll([]);
  };

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text='left'/>
      <Button onClick={handleRightClick} text = 'right'/>
      {right}
      <Button onClick={reset} text = 'reset'/>
      <History allClicks={allClicks}/>
    </div>
  );
};

export default App;
