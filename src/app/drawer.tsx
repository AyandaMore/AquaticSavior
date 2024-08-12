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
      <div className={styles.switchContainer}>
        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className={styles.themeSwitch}
        />
        <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
      </div>
    </Drawer>
  );
};

export default SettingsDrawer;
