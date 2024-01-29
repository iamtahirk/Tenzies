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
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [windowSize, setWindowSize] = useState({width: undefined, height: undefined})

  // Timer interval effect
  useEffect(() => {
    let interval;

    // Start timer if running
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000); // Update timer every second
    }
    // Cleanup function to clear interval
    return () => clearInterval(interval);
  }, [timerRunning]); // 'timerRunning' dependency ensures this effect runs when 'timerRunning' changes

  useEffect(() => {
    // Effect to load high scores from localStorage when modal is opened
    const storedScores = JSON.parse(localStorage.getItem('highScores')) || [];
    setHighScores(storedScores);
  }, [modal]); // 'modal' dependency ensures this effect runs when 'modal' changes

  useEffect(() => {
    // Effect to check for tenzies and update high scores
    const firstValue = dice[0].value;

    // Check to see if all dice are held, returns boolean
    const allHeld = dice.every(die => die.isHeld);

    // Check if all held dice are equal, returns boolean
    const allSameNumber = dice.every(die => die.value === firstValue);

    // Check if the game has started and a die is held to start the timer
    // This basically starts the timer as soon as the user helds the first dice
    if (!gameStarted && dice.some(die => die.isHeld)) {
      setGameStarted(true);
      setTimerRunning(true);
    }

    // Check if all dice are held and have the same value
    if (allHeld && allSameNumber && !tenzies) {
      setTenzies(true);
      setTimerRunning(false);

      // Retrieve existing high scores from local storage (if exists) or initialize an empty array (if empty)
      const storedScores = JSON.parse(localStorage.getItem('highScores')) || [];

      // Create a new score entry and sort the scores by roll count and time
      const updatedScores = [...storedScores, { rollCount, time: timer }].sort((a, b) => {
        if (a.rollCount !== b.rollCount) {
          return a.rollCount - b.rollCount;
        } else {
          return a.time - b.time;
        }
      }).slice(0, 10); // Keep only the top 10 scores
  
      // Save updated high scores to local storage
      localStorage.setItem('highScores', JSON.stringify(updatedScores));
    }
  }, [dice, rollCount, timer, gameStarted, tenzies])

  // Function to generate a new die with a random value, not held, and a unique ID
  function generateNewDie() {
    return {
      // Generate a random value between 1 and 6
      value: Math.ceil(Math.random() * 6),
      
      // Initially set to not held
      isHeld: false,

      // Generate a unique ID for the die
      id: nanoid()
    };
  }

  // Function to generate an array of 10 new dice (initial setup for a new game)
  function allNewDice() {
    // Initialize an empty array to store new dice
    const newDice = []

    for (let i = 0; i < 10; i++) {
      // Add a new die to the array
      newDice.push(generateNewDie())
    }
    return newDice
  }

  // Function to simulate rolling the dice
  function rollDice() {
    // Check if the game is not won
    if (!tenzies) {
      // Increment the roll count (when the user clicks on the roll button)
      setRollCount(prevCount => prevCount + 1)
      
      // Make sure to roll only the non-held dice
      setDice(oldDice => oldDice.map(die => (die.isHeld ? die : generateNewDie())))
    } 
    // If the game is won (Tenzies)
    else {
      // Reset the roll count
      setRollCount(0)
      // Set Tenzies state to false to start a new game
      setTenzies(false)
      // Reset the dice to new ones
      setDice(allNewDice())
      // Reset the timer
      setTimer(0)
      // Reset the game started state
      setGameStarted(false)
    }
  }

  // Function to toggle the held state of a die when clicked
  function holdDice(id) {
    // Only allow holding if the game is not won (Tenzies not achieved)
    !tenzies &&
    setDice(prevDice =>
      // Toggle the isHeld property of the clicked die
      prevDice.map(die => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  // Map each die to a Die component with its value, held state, and holdDice function as props
  const diceElements = dice.map(die => (
    <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ));

  // Function to show or hide the modal by toggling its state
  function showHideModal() {
    setModal(prevModal => !prevModal);
  }

  // Function to handle window size changes for confetti
  function handleWindowSize () {
    // Update window size state with the current inner width and height
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }
  
  useEffect(() => {
    // Check for window resize and call handleWindowSize function. To be used with Confetti
    window.onresize = () => handleWindowSize()
  },[tenzies]) // Tenzies Dependency ensures this effect runs when 'tenzies' changes

  return (
    <>
      {/* Render confetti, only if Tenzies is achieved */}
      {tenzies && <Confetti numberOfPieces={200} width={windowSize.width} height={windowSize.height} />}
      <main>
        {/* High Score popup modal show icon */}
        <div className='score-popup'>
          <i className="fa fa-bars" onClick={showHideModal}></i>
        </div>

        {/* Modal for displaying high scores */}
        <div className={modal ? 'modal show' : 'modal'}>
          <i className="fa fa-close" onClick={showHideModal}></i>
          <h2 className="highscore">High Scores</h2>
          {/* Display high scores table or message if no scores */}
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
                    {/* Map over scores and display */}
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

        {/* Render dice elements */}
        <div className='dice-container'>{diceElements}</div>

        {/* Button to roll dice or start new game */}
        <button className='roll-dice' onClick={rollDice}>
          {tenzies ? 'New Game' : 'Roll'}
        </button>

        {/* Display total rolls and timer */}
        <h3 className='score-display'>Total Rolls: {rollCount} <span style={{ paddingLeft: '20px' }}>Time: {timer}s</span></h3>
      </main>
    </>
  );
};

export default App;
