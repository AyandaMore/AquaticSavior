import React from "react";
import { Modal, List } from "antd";

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
  return (
    <Modal title="Scoreboard" visible={visible} onCancel={onClose} footer={null}>
      <List
        dataSource={scores}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={`#${index + 1} ${item.name}`}
              description={`Score: ${item.score}`}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};
