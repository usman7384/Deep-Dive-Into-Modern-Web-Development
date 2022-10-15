import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients."
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);
  return (
    <div>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        <Button
          handleClick={() => {
            setVotes(addVote(votes, selected));
          }}
          text="vote"
        />
        <Button
          handleClick={() => setSelected(GenerateRandom)}
          text="next anecdote"
        />
      </div>
      <h2>Anecdote with most votes</h2>
      {anecdotes[Largest(votes)]}
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const GenerateRandom = () => Math.floor(Math.random() * 7);

const addVote = (votes, selected) => {
  const copy = [...votes];
  copy[selected] += 1;
  return copy;
};

const Largest = (votes) => {
  var largest = 0;
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > largest) {
      largest = votes[i];
    }
  }
  const isLargest = (element) => element === largest;
  return votes.findIndex(isLargest);
};
export default App

