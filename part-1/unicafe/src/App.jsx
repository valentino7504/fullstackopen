import { useState } from 'react'

const FeedButton = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, bad, neutral, finalStats }) => {
  if (finalStats.total == 0) {
    return (
      <p>No feedback given</p>
    );
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={finalStats.total} />
          <StatisticLine text={"average"} value={finalStats.average} />
          <StatisticLine text={"positive"} value={finalStats.percentage} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [finalStats, setFinalStats] = useState(
    {
      total: 0,
      average: 0,
      percentage: ''
    }
  );

  const updateStats = (good, bad, neutral) => {
    let total = good + bad + neutral;
    let average = (good * 1 + bad * -1) / total;
    let percentage = '' + ((good / total) * 100) + ' %';
    setFinalStats(
      {
        total: total,
        average: average,
        percentage: percentage
      }
    );
  };

  const handleGoodlick = () => {
    setGood(good + 1);
    updateStats(good + 1, bad, neutral);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    updateStats(good, bad + 1, neutral);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    updateStats(good, bad, neutral + 1);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <FeedButton handleClick={handleGoodlick} text={"good"} />
      <FeedButton handleClick={handleNeutralClick} text={"neutral"} />
      <FeedButton handleClick={handleBadClick} text={"bad"} />
      <Statistics good={good} bad={bad} neutral={neutral} finalStats={finalStats} />
    </div>
  )
};

export default App;
