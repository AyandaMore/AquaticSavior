import React from "react";
import { Modal, List } from "antd";
import { motion } from "framer-motion";
import { TrophyOutlined } from "@ant-design/icons";

interface ScoreboardProps {
  visible: boolean;
  onClose: () => void;
  scores: { name: string; score: number }[];
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  visible,
  onClose,
  scores,
}) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Modal
      title={
        <span>
          <TrophyOutlined style={{ marginRight: 8 }} />
          Leaderboard
        </span>
      }
      visible={visible}
      onCancel={onClose}
      footer={null}
      bodyStyle={{ padding: 0 }}
    >
      <motion.div
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {scores.length === 0 ? (
          <p style={{ padding: '16px', textAlign: 'center' }}>
            No scores available. Play the game to add scores to the leaderboard.
          </p>
        ) : (
          <List
            dataSource={scores}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={`${index + 1}. ${item.name}`}
                  description={`Score: ${item.score}`}
                />
              </List.Item>
            )}
          />
        )}
      </motion.div>
    </Modal>
  );
};
