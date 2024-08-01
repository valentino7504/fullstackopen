import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const DisplayAnecdote = ({ anecdote, vote }) => (
  <>
    <p>{anecdote}</p>
    <p>has {vote} {vote === 1 ? 'vote' : 'votes'}</p>
  </>
);

const DailyAnecdote = ({ anecdotes, selected, votes }) => (
  <>
    <h1>Anecdote of the day</h1>
    <DisplayAnecdote anecdote={anecdotes[selected]} vote={votes[selected]} />
  </>
);

const PopularAnecdote = ({ popularIndex, anecdotes, votes }) => (
  <>
    <h1>Anecdote with most votes</h1>
    <DisplayAnecdote anecdote={anecdotes[popularIndex]} vote={votes[popularIndex]} />
  </>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  const getRandomIndex = () => Math.floor(Math.random() * anecdotes.length);

  const [selected, setSelected] = useState(getRandomIndex());
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [popularIndex, setPopular] = useState(0);
  const refreshPopular = (newVotes) => setPopular(newVotes.indexOf(Math.max(...newVotes)));

  const handleNextClick = () => setSelected(getRandomIndex());
  const handleVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    refreshPopular(newVotes);
  };

  return (
    <div>
      <DailyAnecdote anecdotes={anecdotes} selected={selected} votes={votes} />
      <Button handleClick={handleNextClick} text='next anecdote' />
      <Button handleClick={handleVoteClick} text='vote' />
      <PopularAnecdote popularIndex={popularIndex} anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
