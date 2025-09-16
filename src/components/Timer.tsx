// src/components/Timer.tsx
import React from 'react';

interface TimerProps {
  seconds: number;
}

const Timer: React.FC<TimerProps> = ({ seconds }) => {
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>
      Time Left: {formatTime()}
    </div>
  );
};

export default Timer;