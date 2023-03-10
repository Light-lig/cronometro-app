import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const intervalRef = useRef(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [appear, setAppear] = useState(false);

  const [alarm, setAlarm] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setAlarm({
      ...alarm,
      [name]: value,
    });
  };
  useEffect(() => {
    if (seconds === 60) {
      setMinutes((el) => el + 1);
      setSeconds(0);
    }
    if (minutes === 60) {
      setHours((el) => el + 1);
      setMinutes(0);
      setSeconds(0);
    }
    if (hours === 24) {
      handleClickReiniciar();
    }
    handleAlertAlarm();
  }, [seconds]);

  const handleStartClick = () => {
    setAppear(false);
    const intervalId = setInterval(() => {
      setSeconds((el) => el + 1);
    }, 1000);
    intervalRef.current = intervalId;
  };
  const handleAlertAlarm = () => {
    if (
      hours == alarm.hours &&
      minutes == alarm.minutes &&
      seconds == alarm.seconds
    ) {
      alert("Wake up!!!!");
      handleStopClick();
      handleClickReiniciar();
    }
  };
  const handleStopClick = () => {
    const intervalId = intervalRef.current;
    clearInterval(intervalId);
  };
  const handleClickReiniciar = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>
        {hours} : {minutes} : {seconds}
      </h1>
      <div className="card">
        {appear ? (
          <div>
            <label htmlFor="hours">Hours</label>
            <input
              type="number"
              name="hours"
              onChange={handleChange}
              value={alarm.hours}
            />
            <label htmlFor="minutes">Minutes</label>
            <input
              type="number"
              name="minutes"
              onChange={handleChange}
              value={alarm.minutes}
            />
            <label htmlFor="seconds">Secods</label>
            <input
              type="number"
              name="seconds"
              onChange={handleChange}
              value={alarm.seconds}
            />
            <button onClick={handleStartClick}>accept</button>
            <button onClick={() => setAppear(false)}>cancel</button>
          </div>
        ) : (
          <div>
            <button onClick={handleStartClick}>Start</button>
            <button onClick={handleStopClick}>Stop</button>
            <button onClick={handleClickReiniciar}>restart</button>
            <button onClick={() => setAppear(true)}>alarm</button>
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
