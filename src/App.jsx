import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
  };
  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };
  const reset = () => {
    clearInterval(intervalRef.current);
    setSeconds(0);
    setIsRunning(false);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const pct = (seconds % 3600) / 3600; // hour-loop

  return (
    <main className="min-h-screen flex items-center justify-center
                     bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100
                     dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
                     font-inter p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-10 rounded-3xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl shadow-2xl"
      >
        <h1 className="font-poppins text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
          ⏱️ Stopwatch
        </h1>

        {/* ring + digits */}
        <div className="relative w-full h-64 mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              strokeWidth="6"
              className="stroke-gray-300/40 dark:stroke-gray-700/40"
              fill="transparent"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              strokeWidth="6"
              strokeLinecap="round"
              className="stroke-accent-white dark:stroke-accent-white drop-shadow-[0_0_8px_rgba(255,255,255,.5)] dark:drop-shadow-[0_0_8px_rgba(200,200,255,.5)]"
              strokeDasharray={283}
              strokeDashoffset={283 * (1 - pct)}
              transition={{ duration: 1, ease: "linear" }}
            />
          </svg>
          <motion.div
            key={seconds}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center
                       font-mono text-6xl font-bold tracking-widest
                       text-gray-900 dark:text-gray-100"
          >
            {mins}:{secs}
          </motion.div>
        </div>

        {/* buttons */}
        <div className="flex gap-4 justify-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={start}
            disabled={isRunning}
            className="w-28 py-3 rounded-xl bg-accent-start text-white font-semibold
                       disabled:bg-gray-400 disabled:cursor-not-allowed
                       hover:bg-emerald-600 transition"
          >
            Start
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={stop}
            disabled={!isRunning}
            className="w-28 py-3 rounded-xl bg-accent-stop text-white font-semibold
                       disabled:bg-gray-400 disabled:cursor-not-allowed
                       hover:bg-amber-600 transition"
          >
            Stop
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={reset}
            className="w-28 py-3 rounded-xl bg-accent-reset text-white font-semibold
                       hover:bg-rose-600 transition"
          >
            Reset
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}