import React, { useState, useEffect } from "react";
import { LinearProgress, Alert, AlertTitle, Button } from "@mui/material";
import { Refresh, PlayArrow, Pause } from "@mui/icons-material";

interface ShortcutItem {
  key: string;
  description: string;
}

const shortcuts: ShortcutItem[] = [
  { key: "Q+W", description: "Quick Write" },
  { key: "E+R", description: "Edit Redo" },
  { key: "T+Y", description: "Toggle Yield" },
  { key: "U+I", description: "Update Interface" },
  { key: "O+P", description: "Open Project" },
  { key: "A+S", description: "Add Snippet" },
  { key: "D+F", description: "Debug Function" },
  { key: "G+H", description: "Generate Header" },
  { key: "J+K", description: "Jump to Keyword" },
  { key: "L+Z", description: "List Zoom" },
];

const FishBowlGame: React.FC = () => {
  const [waterLevel, setWaterLevel] = useState(100);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentShortcut, setCurrentShortcut] = useState<ShortcutItem>(
    shortcuts[0]
  );

  const [gameStarted, setGameStarted] = useState(false);
  const [pressedKeys, setPressedKeys] = useState(new Set<string>());
  const [level, setLevel] = useState(1);
  const [successfulTries, setSuccessfulTries] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const getWaterDecrease = (level: number) => 0.5 + (level - 1) * 0.1;
  const getTriesForNextLevel = (level: number) => 5 + level * 2;

  useEffect(() => {
    if (gameStarted && !gameOver && !isPaused) {
      const interval = setInterval(() => {
        setWaterLevel((prevLevel) => {
          const newLevel = prevLevel - getWaterDecrease(level);

          if (newLevel <= 0) {
            setGameOver(true);

            return 0;
          }

          return newLevel;
        });

        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            setGameOver(true);

            return 0;
          }

          return prevTime - 0.1;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver, level, isPaused]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gameStarted) {
        setGameStarted(true);

        return;
      }

      if (gameOver || isPaused) return;

      const key = event.key.toUpperCase();

      setPressedKeys((prev) => new Set(prev).add(key));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      setPressedKeys((prev) => {
        const newSet = new Set(prev);

        newSet.delete(key);

        return newSet;
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameStarted, gameOver, isPaused]);

  useEffect(() => {
    const pressedKeysString = Array.from(pressedKeys).sort().join("+");

    if (pressedKeysString === currentShortcut.key) {
      setScore((prevScore) => prevScore + level * 10);

      setWaterLevel((prevLevel) => Math.min(prevLevel + 20, 100));

      setCurrentShortcut(
        shortcuts[Math.floor(Math.random() * shortcuts.length)]
      );

      setPressedKeys(new Set());

      setSuccessfulTries((prev) => {
        const newTries = prev + 1;

        if (newTries >= getTriesForNextLevel(level)) {
          setLevel((prevLevel) => prevLevel + 1);

          setTimeLeft((prevTime) => prevTime + 10);

          return 0;
        }

        return newTries;
      });
    }
  }, [pressedKeys, currentShortcut, level]);

  const resetGame = () => {
    setWaterLevel(100);

    setScore(0);

    setGameOver(false);

    setGameStarted(false);

    setPressedKeys(new Set());

    setCurrentShortcut(shortcuts[Math.floor(Math.random() * shortcuts.length)]);

    setLevel(1);

    setSuccessfulTries(0);

    setIsPaused(false);

    setTimeLeft(30);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-4">
      <style jsx>{`
        @keyframes swim {
          0%,
          100% {
            transform: translate(0, 0);
          }

          25% {
            transform: translate(40px, -20px);
          }

          50% {
            transform: translate(80px, 0);
          }

          75% {
            transform: translate(40px, 20px);
          }
        }

        @keyframes sway {
          0%,
          100% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(5deg);
          }
        }

        @keyframes bubble {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }

          50% {
            opacity: 1;
          }

          100% {
            transform: translateY(-80px) scale(1.5);
            opacity: 0;
          }
        }

        .fish-container {
          width: 100px;

          height: 100px;

          position: absolute;

          bottom: 20%;

          left: 40%;

          animation: swim 20s ease-in-out infinite;
        }

        .fish {
          font-size: 3rem;

          transform-origin: center;

          animation: sway 2s ease-in-out infinite;
        }

        .bubble {
          position: absolute;

          background: rgba(255, 255, 255, 0.5);

          border-radius: 50%;

          animation: bubble 5s ease-in-out infinite;
        }
      `}</style>

      <h1 className="text-4xl font-bold mb-6 text-blue-800">
        Fish Bowl Shortcut Game
      </h1>

      <div className="w-80 h-80 bg-blue-400 rounded-full relative overflow-hidden shadow-lg">
        <div
          className="absolute bottom-0 left-0 right-0 bg-blue-600 transition-all duration-100"
          style={{ height: `${waterLevel}%` }}
        />

        {/* Underwater plants */}

        <div
          className="absolute bottom-0 left-1/4 w-8 h-24 bg-green-700 rounded-t-full"
          style={{ transform: "skew(-5deg)" }}
        />

        <div
          className="absolute bottom-0 right-1/4 w-8 h-32 bg-green-800 rounded-t-full"
          style={{ transform: "skew(5deg)" }}
        />

        {/* Fish */}

        <div
          className="fish-container"
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          <div className="fish">🐠</div>
        </div>

        {/* Bubbles */}

        <div
          className="bubble"
          style={{
            width: "10px",
            height: "10px",
            left: "30%",
            animationDelay: "0s",
          }}
        />

        <div
          className="bubble"
          style={{
            width: "15px",
            height: "15px",
            left: "50%",
            animationDelay: "2s",
          }}
        />

        <div
          className="bubble"
          style={{
            width: "8px",
            height: "8px",
            left: "70%",
            animationDelay: "4s",
          }}
        />

        {/* Water surface with waves */}

        <svg
          className="absolute top-0 left-0 w-full"
          height="20"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "rgb(59, 130, 246)", stopOpacity: 0.5 }}
              />

              <stop
                offset="100%"
                style={{ stopColor: "rgb(59, 130, 246)", stopOpacity: 0.8 }}
              />
            </linearGradient>
          </defs>

          <path
            fill="url(#grad)"
            d="M0 10 Q 25 5, 50 10 T 100 10 V 0 H 0 V 10 Z"
          >
            <animate
              attributeName="d"
              values="M0 10 Q 25 5, 50 10 T 100 10 V 0 H 0 V 10 Z;

                      M0 10 Q 25 15, 50 10 T 100 10 V 0 H 0 V 10 Z;

                      M0 10 Q 25 5, 50 10 T 100 10 V 0 H 0 V 10 Z"
              dur="5s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      <div className="mt-6 text-2xl font-semibold text-blue-800">
        {!gameStarted ? (
          <p>Press any key to start!</p>
        ) : (
          <>
            Press: <strong>{currentShortcut.key}</strong>
            <br />
            <span className="text-lg">({currentShortcut.description})</span>
          </>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold">Score</p>

          <p className="text-3xl font-bold text-blue-700">{score}</p>
        </div>

        <div>
          <p className="text-lg font-semibold">Level</p>

          <p className="text-3xl font-bold text-blue-700">{level}</p>
        </div>
      </div>

      <div className="mt-4 w-full max-w-md">
        <p className="text-sm mb-1">Next level progress:</p>

        <LinearProgress
          value={(successfulTries / getTriesForNextLevel(level)) * 100}
          className="h-2"
        />
      </div>

      <div className="mt-4 w-full max-w-md">
        <p className="text-sm mb-1">Time left:</p>
        <LinearProgress
          variant="determinate"
          value={(timeLeft / 30) * 100}
          className="h-2"
        />
      </div>

      {gameOver && (
        <Alert severity="error" className="mt-6">
          <AlertTitle>Game Over!</AlertTitle>
          You reached level {level} with a score of {score}.
        </Alert>
      )}

      <div className="mt-6 space-x-4">
        <Button onClick={resetGame} variant="outlined" startIcon={<Refresh />}>
          New Game
        </Button>

        <Button
          onClick={togglePause}
          variant="outlined"
          disabled={!gameStarted || gameOver}
          startIcon={isPaused ? <PlayArrow /> : <Pause />}
        >
          {isPaused ? "Resume" : "Pause"}
        </Button>
      </div>
    </div>
  );
};

export default FishBowlGame;
