import { use } from "react";
import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  );
};

const Statistic = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No feedback given.
      </div>
    );
  }
  return (
    <div>
      <table>
        <th>Statistics</th>
        <tr>
          <StatisticLine text="Good:" value={props.good} />
        </tr>
        <tr>
          <StatisticLine text="Neutral: " value={props.neutral} />
        </tr>
        <tr>
          <StatisticLine text="Bad: " value={props.bad} />
        </tr>
        <tr>
          <StatisticLine text="Total feedback(s)" value={props.total} />
        </tr>
        <tr>
          <StatisticLine text="Average" value={props.average} />
        </tr>
      </table>
    </div>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const score = good - bad;
  const average = total === 0 ? 0 : score / total;

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <Statistic
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
      />
    </div>
  );
};

export default App;
