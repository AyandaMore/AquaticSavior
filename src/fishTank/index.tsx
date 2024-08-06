import React, { useState, useEffect, useCallback } from "react";
import { AlertCircle } from "lucide-react";
//import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const shortcuts = [
  { name: "Go to All", keys: ["Control", "T"] },
  { name: "Navigate Backward", keys: ["Control", "-"] },
  { name: "Go to Definition", keys: ["F12"] },
  { name: "Quick Actions", keys: ["Alt", "Enter"] },
  { name: "Delete Line", keys: ["Control", "Shift", "L"] },
  { name: "Move Code Up", keys: ["Alt", "ArrowUp"] },
  { name: "Format Document", keys: ["Control", "K", "Control", "D"] },
  { name: "Rename", keys: ["Control", "R", "Control", "R"] },
  { name: "Debug", keys: ["F5"] },
  { name: "Toggle Breakpoint", keys: ["F9"] },
];

const FishTankSurvivalGame = () => {
  const [waterLevel, setWaterLevel] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isTapOpen, setIsTapOpen] = useState(false);
  const [currentShortcut, setCurrentShortcut] = useState(shortcuts[0]);
  const [pressedKeys, setPressedKeys] = useState<any>([]);
  const [message, setMessage] = useState("");

  const getNextShortcut = useCallback(() => {
    const index = Math.floor(Math.random() * shortcuts.length);
    setCurrentShortcut(shortcuts[index]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver) {
        setWaterLevel((prev) => {
          const newLevel = prev - 1 + (isTapOpen ? 2 : 0);
          if (newLevel <= 0) {
            setIsGameOver(true);
            return 0;
          }
          return Math.min(newLevel, 100);
        });
        if (isTapOpen) {
          setScore((prev) => prev + 1);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isGameOver, isTapOpen]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      event.preventDefault();
      if (!isGameOver) {
        setPressedKeys((prev: any) => [...prev, event.key]);
      }
    };

    const handleKeyUp = (event: any) => {
      if (!isGameOver) {
        const currentKeys = pressedKeys.join("+");
        const correctKeys = currentShortcut.keys.join("+");

        if (currentKeys === correctKeys) {
          setIsTapOpen(true);
          setMessage("Correct! Water refilled.");
          setTimeout(() => {
            setIsTapOpen(false);
            setMessage("");
            getNextShortcut();
          }, 1000);
        } else if (pressedKeys.length === currentShortcut.keys.length) {
          setMessage(
            `Incorrect. The correct shortcut was: ${currentShortcut.keys.join(
              " + "
            )}`
          );
          setTimeout(() => {
            setMessage("");
            getNextShortcut();
          }, 3000);
        }
        setPressedKeys([]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isGameOver, pressedKeys, currentShortcut, getNextShortcut]);

  const restartGame = () => {
    setWaterLevel(100);
    setIsGameOver(false);
    setScore(0);
    setIsTapOpen(false);
    getNextShortcut();
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-3xl font-bold mb-4">
        VS Shortcut Fish Tank Survival
      </h1>
      <div className="w-64 h-64 bg-blue-200 relative overflow-hidden rounded-lg border-4 border-blue-500">
        <div
          className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-100"
          style={{ height: `${waterLevel}%` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🐠</span>
          </div>
        </div>
        {isTapOpen && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-4xl">
            🚰
          </div>
        )}
        <div className="absolute bottom-0 right-0 text-4xl animate-bounce">
          💧
        </div>
        {isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl">
            Game Over!
          </div>
        )}
      </div>
      <p className="mt-4 text-xl">Water Level: {waterLevel}%</p>
      <p className="mt-2 text-xl">Score: {score}</p>
      <p className="mt-2 text-xl font-bold">
        Current Shortcut: {currentShortcut.name}
      </p>
      {message && <p className="mt-2 text-lg text-green-600">{message}</p>}
      {isGameOver && (
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={restartGame}
        >
          Restart Game
        </button>
      )}
      {/* <Alert className="mt-4 max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>How to play</AlertTitle>
        <AlertDescription>
          Press the correct Visual Studio shortcut shown to refill the fish tank! The water is constantly leaking, so act fast to keep your fish alive!
        </AlertDescription>
      </Alert> */}
    </div>
  );
};

export default FishTankSurvivalGame;
