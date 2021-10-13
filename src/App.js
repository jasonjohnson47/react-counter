import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(1);
  const [direction, setDirection] = useState("up");
  const [isPaused, setIsPaused] = useState(false);

  const increment = (amt) => {
    setCount(count + amt);
  };
  const decrement = (amt) => {
    setCount(count - amt);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!isPaused) {
        if (direction === "up") {
          increment(amount);
        } else {
          decrement(amount);
        }
      }
    }, 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  });

  return (
    <div className="App">
      <div className="count">{count}</div>
      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
          value={amount}
        />
      </div>
      <fieldset>
        <legend>Manual Increment/Decrement</legend>
        <button
          aria-label="decrement"
          onClick={() => {
            decrement(amount);
          }}
        >
          -
        </button>
        <button
          aria-label="increment"
          onClick={() => {
            increment(amount);
          }}
        >
          +
        </button>
      </fieldset>

      <fieldset>
        <legend>Automatic Counting Controls</legend>
        <label htmlFor="direction">Direction:</label>
        <select
          value={direction}
          onChange={(e) => {
            setDirection(e.target.value);
          }}
        >
          <option value="up">Up</option>
          <option value="down">Down</option>
        </select>
        {isPaused ? (
          <button
            onClick={() => {
              setIsPaused(false);
            }}
          >
            Continue
          </button>
        ) : (
          <button
            onClick={() => {
              setIsPaused(true);
            }}
          >
            Pause
          </button>
        )}
      </fieldset>
      <button
        onClick={() => {
          setCount(0);
          setIsPaused(true);
        }}
      >
        Reset Count
      </button>
    </div>
  );
}

export default App;
