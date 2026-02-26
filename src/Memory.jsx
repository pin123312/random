import "./App.css";
import "./speed.css";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Memory() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [matchedButton, setMatchedButton] = useState([]);
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [randomList, setRandomList] = useState(() =>
    Array.from({ length: 16 }, () => Math.floor(Math.random() * 6) + 1)
  );

  const [itemList, setItemList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let k = newArray.length - 1; k > 0; k--) {
      let j = Math.floor(Math.random() * (k + 1));
      [newArray[k], newArray[j]] = [newArray[j], newArray[k]];
    }
    return newArray;
  };

  const shuffle = () => {
    setItemList((prev) => shuffleArray(prev));
    setSelectedButton([]);
    setMatchedButton([]);
    setCount(0);
  };

  const [selectedButton, setSelectedButton] = useState([]);

  const toggleButton = (index, items) => {
    setIsClicked(!isClicked);
    setSelectedButton((prev) =>
      prev.some((obj) => obj.idx === index)
        ? prev.filter((obj) => obj.idx !== index)
        : [...prev, { idx: index, value: items }]
    );
  };

  useEffect(() => {
    if (selectedButton.length === 2) {
      const [first, second] = selectedButton;

      if (first.value === second.value) {
        setMatchedButton((prev) => [...prev, first.idx, second.idx]);
        setScore((prevScore) => prevScore + 1);
      } else {
        alert("wrong");
      }

      setTimeout(() => {
        setSelectedButton([]);
      }, 500);
      setCount((prevCount) => prevCount + 1);
    }
  }, [selectedButton]);

  const randomListItem = itemList.map((items, index) => {
    const isClicked = selectedButton.some((obj) => obj.idx === index);

    return (
      <button
        key={index}
        className={
          matchedButton.includes(index)
            ? "randomList-Matched"
            : isClicked
            ? "randomList-Clicked"
            : "randomList"
        }
        disabled={matchedButton.includes(index)}
        onClick={() => toggleButton(index, items)}
      >
        {isClicked || matchedButton.includes(index) ? items : "?"}
      </button>
    );
  });

  const placement = <div className="border">{randomListItem}</div>;

  return (
    <>
      <div>
        <button onClick={shuffle}>Click to randomize</button>
      </div>
      {placement}
      <div className="score">
        <div>Current Attempts {count}</div>
        <div>Current Scores {score} </div>
      </div>
      <button onClick={() => navigate("/")}>Return to Main Menu</button>
    </>
  );
}

export default Memory;
