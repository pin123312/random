import "./App.css";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTimer } from 'react-timer-hook';

function Speed() {
   
    const time = new Date();
    time.setSeconds(time.getSeconds() + 20); // 10 minutes
    const {
    totalSeconds,
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
    } = useTimer({ expiryTimestamp: time, onExpire: () => alert('Time expired, Total Score is '+ score), interval: 20 });

    const navigate = useNavigate();
    const [rndNumber, setRndNumber] = useState(0);
    const [availableNumber, setAvailableNumber] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [score, setScore] = useState(0);
    const [clickedItem, setClickedItem] = useState(null);

    const toggleButton = (item) => {
        setClickedItem(item);
        if (item === rndNumber) {
            setTimeout(() => {
            toggleOption();
            setClickedItem(null);
            }, 500);
            setScore((prev) => prev + 1);
        } else {
            alert("Wrong!");
            setClickedItem(null);
        }
    };

  const toggleOption = () => {
    const newSet = new Set();
    while (newSet.size < 4) {
        newSet.add(Math.floor(Math.random() * 100));
    }
    const newRndNumber = ([...newSet][Math.floor(Math.random()*4)]);
    setRndNumber(newRndNumber)
    setAvailableNumber([...newSet]);
  };  

  useEffect(() => {
    toggleOption(); 
  }, []);

  const newGame = () => {
    toggleOption()
    const time = new Date();
    time.setSeconds(time.getSeconds() + 20);
    restart(time);
  }

  const game = 
    <div className="game-box">
        <div className="box"><div className="game-number">{rndNumber}</div></div>    
        <div className="row">
            {availableNumber.map((item, index) => (
                <button className="game-list-item" key={index} onClick={() => toggleButton(item,index)}>{item}</button>       
            ))}
        </div>
    </div>

  return (
    <>
      <div style={{fontSize: '50px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>:<span>{milliseconds}</span>
      </div>
      <div className="game-border">{game}</div>
      <div className="menuButton">
        <button onClick={toggleOption} className="menuButton">Click change option</button>
        <button onClick={newGame} className="menuButton">New Game</button>
        <button onClick={() => navigate("/")} className="menuButton">Return to Main Menu</button>
        score {score}
      </div>
    
    </>
  );
}

export default Speed;
