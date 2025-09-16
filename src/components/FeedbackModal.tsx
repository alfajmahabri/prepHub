// src/components/FeedbackModal.tsx
import React from 'react';

interface FeedbackModalProps {
  feedback: string;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ feedback, onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '80%', maxWidth: '600px' }}>
        <h2>Discussion Feedback</h2>
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', background: '#f4f4f4', padding: '15px', borderRadius: '4px', maxHeight: '300px', overflowY: 'auto' }}>
          {feedback}
        </pre>
        <button onClick={onClose} style={{ marginTop: '10px', padding: '10px 15px' }}>Close</button>
      </div>
    </div>
  );
};

export default FeedbackModal;   