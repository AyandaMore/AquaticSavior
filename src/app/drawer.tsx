import React from "react";
import { Drawer, Switch } from "antd";
import styles from "./page.module.css";

interface SettingsDrawerProps {
  visible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleDarkMode: (checked: boolean) => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  visible,
  onClose,
  isDarkMode,
  toggleDarkMode,
}) => {
  return (
    <Drawer
      title="Settings"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <div className={styles.instructions}>
        <h3>How to Play the Game</h3>
        <p>
          Welcome to Aquatic Savior game! Here are some instructions to get you started:
        </p>
        <ul>
          <li>
            <strong>Use VS Code Shortcuts:</strong> Learn and apply VS Code
            shortcuts to progress through the game.
          </li>
          <li>
            <strong>Visual Studio Shortcuts:</strong> Utilize Visual Studio
            shortcuts to unlock new levels.
          </li>
          <li>
            <strong>Complete Challenges:</strong> Each level will present
            challenges that require you to use specific shortcuts.
          </li>
          <li>
            <strong>Earn Points:</strong> Points are awarded based on your
            accuracy and speed.
          </li>
          <li>
            <strong>Leaderboard:</strong> Compete with others by aiming for a
            top score on the leaderboard.
          </li>
        </ul>
      </div>
      <br></br>
      <div className={styles.switchContainer}>
        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className={styles.themeSwitch}
        />
        <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
      </div>
    </Drawer>
  );
};

export default SettingsDrawer;
