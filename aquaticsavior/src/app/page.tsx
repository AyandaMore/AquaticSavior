"use client";
"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import {
  Alert as AntAlert,
  Button as AntButton,
  Progress as AntProgress,
  Typography,
} from "antd";
import { AlertCircle, Pause, Play, RefreshCw } from "lucide-react";
import { Button } from "./button";
import { Scoreboard } from "./scoreboard"; // Import the Scoreboard component

const { Title, Paragraph } = Typography;

interface ShortcutItem {
  key: string;
  description: string;
}

const shortcuts: ShortcutItem[] = [
  { key: "Q+W", description: "Quick Write" },
  { key: "E+R", description: "Edit Redo" },
  { key: "T+Y", description: "Toggle Yield" },
  { key: "O+P", description: "Open Project" },
  { key: "A+S", description: "Add Snippet" },
  { key: "D+F", description: "Debug Function" },
  { key: "G+H", description: "Generate Header" },
  { key: "J+K", description: "Jump to Keyword" },
  { key: "L+Z", description: "List Zoom" },
];

const initialScores = [
  { name: "Alice", score: 500 },
  { name: "Bob", score: 450 },
  { name: "Charlie", score: 400 },
  { name: "Dave", score: 350 },
  { name: "Eve", score: 300 },
];

export default function Home() {
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
  const [showScoreboard, setShowScoreboard] = useState(false); // State to control the scoreboard modal
  const [scores, setScores] = useState(initialScores); // State to store the high scores

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
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <main className={styles.main}>
      <div
        className={styles.bubble}
        style={{
          width: "10px",
          height: "10px",
          left: "30%",
          animationDelay: "0s",
        }}
      />
      <div
        className={styles.bubble}
        style={{
          width: "15px",
          height: "15px",
          left: "50%",
          animationDelay: "2s",
        }}
      />
      <div
        className={styles.bubble}
        style={{
          width: "8px",
          height: "8px",
          left: "70%",
          animationDelay: "4s",
        }}
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Fish Bowl Challenge</h1>
        <div className={styles.bowl}>
          <svg
            className={styles.wave}
            height="230"
            viewBox="0 0 100 230"
            preserveAspectRatio="none"
            style={{ top: `${100 - waterLevel}%` }}
          >
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "rgb(24, 106, 237)", stopOpacity: 0.8 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "rgb(24, 106, 237)", stopOpacity: 0.8 }}
                />
              </linearGradient>
            </defs>
            <path
              fill="url(#grad)"
              d="M0 30 Q 10 10, 20 30 T 40 30 T 60 30 T 80 30 T 100 30 V 230 H 0 V 30 Z"
            >
              <animate
                attributeName="d"
                values="M0 30 Q 10 10, 20 30 T 40 30 T 60 30 T 80 30 T 100 30 V 230 H 0 V 30 Z;
              M0 30 Q 15 20, 30 30 T 60 30 T 90 30 V 230 H 0 V 30 Z;
              M0 30 Q 10 10, 20 30 T 40 30 T 60 30 T 80 30 T 100 30 V 230 H 0 V 30 Z"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
          <div className={styles.plant1} />
          <div className={styles.plant2} />
          <div
            className={styles.fishContainer}
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            <div className={styles.fish}>🐠</div>
          </div>
          <div
            className={styles.bubble}
            style={{
              width: "10px",
              height: "10px",
              left: "30%",
              animationDelay: "0s",
            }}
          />
          <div
            className={styles.bubble}
            style={{
              width: "15px",
              height: "15px",
              left: "50%",
              animationDelay: "2s",
            }}
          />
          <div
            className={styles.bubble}
            style={{
              width: "8px",
              height: "8px",
              left: "70%",
              animationDelay: "4s",
            }}
          />
        </div>
        <div className={styles.shortcutInfo}>
          {!gameStarted ? (
            <p>Press any key to start!</p>
          ) : (
            <>
              Press: <strong>{currentShortcut.key}</strong>
              <br />
              <span className={styles.shortcutDescription}>
                ({currentShortcut.description})
              </span>
            </>
          )}
        </div>
        <div className={styles.stats}>
          <div>
            <p className={styles.statsLabel}>Score</p>
            <p className={styles.statsValue}>{score}</p>
          </div>
          <div>
            <p className={styles.statsLabel}>Level</p>
            <p className={styles.statsValue}>{level}</p>
          </div>
        </div>
        <div className={styles.progressContainer}>
          <p className={styles.progressLabel}>Next level progress:</p>
          <AntProgress
            percent={Math.round(
              (successfulTries / getTriesForNextLevel(level)) * 100
            )}
            className={styles.progress}
          />
        </div>
        {gameOver && (
          <AntAlert
            message="Game Over!"
            description={`You reached level ${level} with a score of ${score}.`}
            type="error"
            showIcon
            className={styles.alert}
          />
        )}
        <div className={styles.buttons}>
          <Button onClick={resetGame} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> New Game
          </Button>
          <Button
            onClick={togglePause}
            variant="outline"
            disabled={!gameStarted || gameOver}
          >
            {isPaused ? (
              <Play className="mr-2 h-4 w-4" />
            ) : (
              <Pause className="mr-2 h-4 w-4" />
            )}
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Button
            onClick={() => setShowScoreboard(true)}
            variant="outline"
            disabled={gameStarted && !gameOver} // Disable the button during gameplay
          >
            Scoreboard
          </Button>
        </div>
        <Scoreboard
          visible={showScoreboard}
          onClose={() => setShowScoreboard(false)}
          scores={scores}
        />
      </div>
    </main>
  );
}
