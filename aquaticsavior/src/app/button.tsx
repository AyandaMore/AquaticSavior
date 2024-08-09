import React from 'react';
import { Button as AntButton } from 'antd';
import styles from './page.module.css'; // Import your custom styles

interface ButtonProps {
  onClick: () => void;
  variant: 'outline' | 'solid';
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, variant, disabled, children }) => {
  const buttonClass = variant === 'solid' ? styles.solidButton : styles.outlineButton;

  return (
    <AntButton
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
    >
      {children}
    </AntButton>
  );
};
