import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Die from './components/Die';
import './App.css';

const App = () => {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [highScores, setHighScores] = useState([]);
  const [gameStarted, setGameStarted] = useState(false); // New state to track if the game has started
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    if (modal) {
      const storedScores = JSON.parse(localStorage.getItem('highScores')) || [];
      setHighScores(storedScores);
    }
  }, [modal]);

  useEffect(() => {
    const firstValue = dice[0].value;
    const allHeld = dice.every(die => die.isHeld);
    const allSameNumber = dice.every(die => die.value === firstValue);

    if (!gameStarted && dice.some(die => die.isHeld)) {
      setGameStarted(true); // Start the game when the first die is held
      setTimerRunning(true); // Start the timer
    }

    if (allHeld && allSameNumber) {
      setTenzies(true);
      setTimerRunning(false);
      const storedScores = JSON.parse(localStorage.getItem('highScores')) || [];
      const updatedScores = [...storedScores, { rollCount, time: timer }].sort((a, b) => {
        if (a.rollCount !== b.rollCount) {
          return a.rollCount - b.rollCount;
        } else {
          return a.time - b.time;
        }
      }).slice(0, 10);
  
      localStorage.setItem('highScores', JSON.stringify(updatedScores));
    }
  }, [dice, rollCount, timer, gameStarted]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setRollCount(prevCount => prevCount + 1);
      setDice(oldDice => oldDice.map(die => (die.isHeld ? die : generateNewDie())));
    } else {
      setRollCount(0);
      setTenzies(false);
      setDice(allNewDice());
      setTimer(0);
      setGameStarted(false); // Reset the game started state
    }
  }

  function holdDice(id) {
    !tenzies &&
    setDice(prevDice =>
      prevDice.map(die => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  const diceElements = dice.map(die => (
    <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ));

  function showHideModal() {
    setModal(prevModal => !prevModal);
  }

  return (
    <>
      {tenzies && <Confetti />}
      <main>
        <div className='score-popup'>
          <i className="fa fa-bars" onClick={showHideModal}></i>
        </div>

        <div className={modal ? 'modal show' : 'modal'}>
          <i className="fa fa-close" onClick={showHideModal}></i>
          <h2 className="highscore">High Scores</h2>
          {highScores.length > 0 ? (
            <div className="table-score">
              <table>
                  <thead>
                      <tr>
                          <th>No.</th>
                          <th>Rolls</th>
                          <th>Time (seconds)</th>
                      </tr>
                  </thead>
                  <tbody>
                    {highScores.map((score, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{score.rollCount}</td>
                        <td>{score.time}s</td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            </div>
          ) : (
            <p className='nohighscore'>No high scores available.</p>
          )}
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its current value
          between rolls.
        </p>
        <div className='dice-container'>{diceElements}</div>

        <button className='roll-dice' onClick={rollDice}>
          {tenzies ? 'New Game' : 'Roll'}
        </button>

        <h3 className='score-display'>Total Rolls: {rollCount} <span style={{ paddingLeft: '20px' }}>Time: {timer}s</span></h3>
      </main>
    </>
  );
};

export default App;
