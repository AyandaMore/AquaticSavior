"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import {
  Alert as AntAlert,
  Button as AntButton,
  Progress as AntProgress,
  Modal,
  Input,
} from "antd";
import { Pause, Play, RefreshCw, Settings } from "lucide-react";
import { Button } from "./button";
import { Scoreboard } from "./scoreboard";
import SettingsDrawer from "./drawer";
import { Howl } from "howler";

//Sound instances
const startSound = new Howl({
  src: ["/sounds/start.wav"],
  volume: 1.0,
});

const gameOverSound = new Howl({
  src: ["/sounds/fail.wav"],
  volume: 1.0,
});

interface ShortcutItem {
  key: string;
  description: string;
}

const shortcuts: ShortcutItem[] = [
  { key: "F5", description: "Debug Function" },
  { key: "F12", description: "Go to Definition" },
  { key: "F8", description: "Go to Next or Previous Result in List" },
  { key: "F9", description: "Toggle Breakpoint" },
  { key: "F10", description: "Step Over" },
  { key: "Ctrl+S", description: "Save" },
  { key: "Ctrl+Shift+S", description: "Save All" },
  { key: "Ctrl+F", description: "Find" },
  { key: "Ctrl+G", description: "Go to Line" },
  { key: "Shift+F12", description: "Find All References" },
  { key: "Ctrl+Shift+.", description: "Peek Definition" },
  { key: "Ctrl+Shift+F", description: "Find in Files" }, // VS Code and Visual Studio
  { key: "Ctrl+.", description: "Quick Actions and Refactorings" },
  { key: "Alt+Shift+F10", description: "Show Smart Tag" },
];

export default function Home() {
  const [waterLevel, setWaterLevel] = useState(90);
  const [fishPosition, setFishPosition] = useState(60); // Fish position state
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
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [scores, setScores] = useState<{ name: string; score: number }[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [playerRank, setPlayerRank] = useState<number | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const getWaterDecrease = (level: number) => 1 + (level - 1) * 0.1;
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
          if (newLevel <= fishPosition) {
            setFishPosition((prev) => prev + 0.3); // Move fish down if water level is below fish
          }
          return newLevel;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver, level, isPaused, fishPosition]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isInputFocused) return;
      event.preventDefault(); // Prevent default browser actions

      if (!gameStarted) {
        startSound.play();
        setGameStarted(true);
        return;
      }
      if (gameOver || isPaused) return;

      setPressedKeys((prevKeys) => {
        const newPressedKeys = new Set(prevKeys);

        // Add modifier keys
        if (event.ctrlKey) newPressedKeys.add("Ctrl");
        if (event.shiftKey) newPressedKeys.add("Shift");
        if (event.altKey) newPressedKeys.add("Alt");

        // Add the actual key pressed
        let key = event.key.toUpperCase();
        if (key === "CONTROL") key = "Ctrl";
        if (key === "ALT") key = "Alt";
        if (key === "SHIFT") key = "Shift";
        if (key !== "CTRL" && key !== "ALT" && key !== "SHIFT") {
          newPressedKeys.add(key);
        }

        return newPressedKeys;
      });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (isInputFocused) return;
      event.preventDefault(); // Prevent default browser actions

      setPressedKeys((prevKeys) => {
        const newPressedKeys = new Set(prevKeys);

        // Remove the actual key released
        let key = event.key.toUpperCase();
        if (key === "CONTROL") key = "Ctrl";
        if (key === "ALT") key = "Alt";
        if (key === "SHIFT") key = "Shift";
        newPressedKeys.delete(key);

        // Remove modifier keys if they are not held down anymore
        if (!event.ctrlKey) newPressedKeys.delete("Ctrl");
        if (!event.shiftKey) newPressedKeys.delete("Shift");
        if (!event.altKey) newPressedKeys.delete("Alt");

        return newPressedKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameStarted, gameOver, isPaused, isInputFocused]);

  useEffect(() => {
    const pressedKeysString = Array.from(pressedKeys)
      .sort((a, b) => {
        const modifierOrder = { Ctrl: 1, Alt: 2, Shift: 3 };
        if (a in modifierOrder && b in modifierOrder) {
          return (
            modifierOrder[a as keyof typeof modifierOrder] -
            modifierOrder[b as keyof typeof modifierOrder]
          );
        }
        if (a in modifierOrder) return -1;
        if (b in modifierOrder) return 1;
        return a.localeCompare(b);
      })
      .join("+");

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
      setFishPosition(60); // Reset fish position when successful
    }
  }, [pressedKeys, currentShortcut, level]);

  useEffect(() => {
    if (global?.window !== undefined) {
      const storedScores = JSON.parse(localStorage.getItem("scores") || "[]");
      setScores(storedScores);
    }
  }, []);

  useEffect(() => {
    if (gameOver) {
      gameOverSound.play(); // Play game over sound

      if (global?.window !== undefined) {
        const storedScores = JSON.parse(localStorage.getItem("scores") || "[]");

        // If there are no scores in the leaderboard, directly ask for the name
        if (storedScores.length === 0) {
          setIsNameModalVisible(true);
        } else {
          setScores(storedScores);

          // Check if the score is higher than any existing scores
          const isHighScore = storedScores.some(
            (scoreEntry: { score: number }) => score > scoreEntry.score
          );

          if (isHighScore) {
            setIsNameModalVisible(true); // Show name entry modal only if it's a high score
          }
        }
      }
    }
  }, [gameOver, score]);

  const handleNameSubmit = () => {
    if (!playerName.trim()) {
      return; // Optionally, you can show an error if the name is empty
    }
    const newScore = { name: playerName, score: score };
    if (global?.window !== undefined) {
      const storedScores = JSON.parse(localStorage.getItem("scores") || "[]");
      setScores(storedScores);
      storedScores.push(newScore);
      storedScores.sort((a: any, b: any) => b.score - a.score); // Sort scores in descending order
      storedScores.splice(5); // Keep only top 10 scores
      localStorage.setItem("scores", JSON.stringify(storedScores));

      // Update the state and close the modal
      setScores(storedScores);
      setIsNameModalVisible(false);
      setPlayerName("");
      setGameOver(true); // Reset game over state if needed
    }
  };

  useEffect(() => {
    if (global?.window !== undefined) {
      const storedScores = JSON.parse(localStorage.getItem("scores") || "[]");
      storedScores.push({ name: "Current Player", score }); // Add current score to the list
      storedScores.sort((a: any, b: any) => b.score - a.score); // Sort by score
      const rank =
        storedScores.findIndex((entry: any) => entry.score === score) + 1;
      setPlayerRank(rank);
    }
  }, [score]);

  const resetGame = () => {
    if (gameOver) {
      setIsNameModalVisible(false); // Hide the name entry modal
      setWaterLevel(100);
      setScore(0);
      setGameOver(false);
      setGameStarted(false);
      setPressedKeys(new Set());
      setCurrentShortcut(
        shortcuts[Math.floor(Math.random() * shortcuts.length)]
      );
      setLevel(1);
      setSuccessfulTries(0);
      setIsPaused(false);
      setFishPosition(60); // Reset fish position
      return;
    }

    // Handle the case when game is not over
    setWaterLevel(100);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setPressedKeys(new Set());
    setCurrentShortcut(shortcuts[Math.floor(Math.random() * shortcuts.length)]);
    setLevel(1);
    setSuccessfulTries(0);
    setIsPaused(false);
    setFishPosition(60); // Reset fish position
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  return (
    <main className={isDarkMode ? styles.darkMode : styles.lightMode}>
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
        <AntButton
          icon={<Settings />}
          onClick={toggleDrawer}
          className={styles.settingsButton}
        ></AntButton>
        <SettingsDrawer
          visible={isDrawerVisible}
          onClose={toggleDrawer}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <div className={styles.header}>
          <h1 className={styles.title}>Aquatic Savior</h1>
        </div>
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
                  style={{ stopColor: "rgb(15,94,156)", stopOpacity: 0.5 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "rgb(15,94,156)", stopOpacity: 0.5 }}
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
          <div className={styles.underwaterElements}>
            <div className={styles.seaweed1} />
            <div className={styles.seaweed2} />
            <div className={styles.coral1} />
            <div className={styles.coral2} />
            <div className={styles.rock1} />
            <div className={styles.rock2} />
          </div>
          <div
            className={styles.fishContainer}
            style={{
              animationPlayState: isPaused ? "paused" : "running",
              top: `${fishPosition}%`, // Adjust fish position dynamically
            }}
          >
            <div
              className={`${styles.fish} ${gameOver ? styles.deadFish : ""}`}
            >
              {gameOver ? (
                "☣︎"
              ) : (
                <img
                  src="/images/fish.png"
                  alt="Fish"
                  className={styles.realisticFish}
                />
              )}
            </div>
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
              <strong> {currentShortcut.description}</strong>
              <br />
              <span className={styles.shortcutDescription}>
                Hint: {currentShortcut.key}
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
            trailColor="#c2c2c242"
            format={(percent) => (
              <span style={{ color: "#004d99" }}>{percent}%</span>
            )}
          />
        </div>
        {gameOver && (
          <AntAlert
            message="Game Over!"
            description={`You have reached level ${level} with a score of ${score}.`}
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
            Leaderboard
          </Button>
        </div>
        <Scoreboard
          visible={showScoreboard}
          onClose={() => setShowScoreboard(false)}
          scores={scores}
        />
      </div>

      <Modal
        title="Enter Your Name"
        open={isNameModalVisible}
        onOk={handleNameSubmit}
        onCancel={() => setIsNameModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            backgroundColor: "transparent",
            border: "1px solid #1890ff",
            color: "#1890ff", // Set the text color
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "transparent",
            color: "#1890ff", // Set the text color
          },
        }}
      >
        <Input
          // placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <div
          style={{
            margin: "3px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#f0f2f5",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <p>Your current score is: {score}</p>
          <p>
            Your rank: {playerRank}
            {playerRank === 1
              ? "st"
              : playerRank === 2
              ? "nd"
              : playerRank === 3
              ? "rd"
              : "th"}
          </p>
        </div>
      </Modal>
    </main>
  );
}
