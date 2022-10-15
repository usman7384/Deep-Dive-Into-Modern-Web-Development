import { useState } from 'react';
import './style.css'
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      {All({ bad, neutral, good }) > 0 ? (
        <Statistics good={good} bad={bad} neutral={neutral} />
      ) : (
        <p> No Feedback Given </p>
      )}
    </div>
  );
};

const All = ({ bad, neutral, good }) => bad + neutral + good;
const Average = ({ bad, neutral, good }) =>
  (good - bad) / All({ bad, neutral, good })
    ? (good - bad) / All({ bad, neutral, good })
    : 0;
const Positive = ({ bad, neutral, good }) =>
  (good / All({ bad, neutral, good })) * 100
    ? (good / All({ bad, neutral, good })) * 100
    : 0;

const StatisticLine = (props) => (
  <table>
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  </table>
);

const Statistics = ({ bad, neutral, good }) => {
  return (
     <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={All({ bad, neutral, good })} />
      <StatisticLine text="average" value={Average({ bad, neutral, good })} />
      <StatisticLine text="positive" value={Positive({ bad, neutral, good })} />
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);



export default App;