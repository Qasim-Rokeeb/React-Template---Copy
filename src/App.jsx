import { useEffect, useRef, useState } from "react";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSeconds(0);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (totalSeconds) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">⏱️ Stopwatch App</h1>

      <div className="text-6xl font-mono mb-8">{formatTime(seconds)}</div>

      <div className="flex gap-4">
        <button
          onClick={start}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Start
        </button>
        <button
          onClick={stop}
          className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
        >
          Stop
        </button>
        <button
          onClick={reset}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
