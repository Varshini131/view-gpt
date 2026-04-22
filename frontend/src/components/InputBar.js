import { useRef } from "react";

const QUICK_REPLIES = [
  "Courses offered",
  "Hostel facilities",
  "Fee structure",
  "Check eligibility",
  "Placement stats",
  "Contact admissions",
];

export default function InputBar({ input, setInput, onSend, isListening, onToggleVoice }) {
  const inputRef = useRef(null);

  const handleKey = (e) => {
    if (e.key === "Enter") onSend();
  };

  return (
    <>
      <div className="quick-row">
        {QUICK_REPLIES.map((q) => (
          <button key={q} className="quick-btn" onClick={() => onSend(q)}>
            {q}
          </button>
        ))}
      </div>

      <div className="input-area">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask anything..."
          className="input-area__field"
        />

        <button
          onClick={onToggleVoice}
          className={`icon-btn${isListening ? " icon-btn--listening" : ""}`}
          aria-label={isListening ? "Stop recording" : "Start voice input"}
        >
          {isListening ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#ff6b6b" strokeWidth="1.5" />
              <rect x="8" y="8" width="8" height="8" rx="1" fill="#ff6b6b" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="2" width="6" height="12" rx="3" stroke="#9d80ff" strokeWidth="1.5" />
              <path d="M5 10c0 3.866 3.134 7 7 7s7-3.134 7-7" stroke="#9d80ff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="17" x2="12" y2="22" stroke="#9d80ff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>

        <button onClick={() => onSend()} className="send-btn" aria-label="Send message">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M22 2L15 22 11 13 2 9l20-7z"
              stroke="white" strokeWidth="1.8" strokeLinejoin="round" fill="rgba(255,255,255,0.15)" />
          </svg>
        </button>
      </div>
    </>
  );
}
