import React, { memo } from "react";

// BotMascot with frequency wave rings when speaking
const BotMascot = memo(({ isLoading, isSpeaking }) => {
  return (
    <div style={{ position: "relative", display: "inline-block", width: "72px", height: "90px" }}>
      {/* Loading spinner */}
      {isLoading && !isSpeaking && (
        <svg
          style={{
            position: "absolute",
            top: "-10px",
            left: "-10px",
            width: "92px",
            height: "110px",
            animation: "spinLogo 1s linear infinite",
          }}
          viewBox="0 0 100 120"
          fill="none"
        >
          <circle cx="50" cy="60" r="46" stroke="#2d6fc4" strokeWidth="2.5"
            strokeDasharray="200 100" strokeLinecap="round" fill="none" opacity="0.8" />
          <circle cx="50" cy="60" r="40" stroke="#5baee0" strokeWidth="1.5"
            strokeDasharray="150 150" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>
      )}

      {/* Frequency wave rings when speaking */}
      {isSpeaking && (
        <>
          {/* Wave ring 1 */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "72px", height: "90px",
            borderRadius: "40%",
            border: "2px solid rgba(42,100,200,0.95)",
            animation: "speakWave 1.2s ease-out infinite",
            pointerEvents: "none",
          }} />
          {/* Wave ring 2 */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "72px", height: "90px",
            borderRadius: "40%",
            border: "2px solid rgba(91,174,224,0.75)",
            animation: "speakWave 1.2s ease-out 0.3s infinite",
            pointerEvents: "none",
          }} />
          {/* Wave ring 3 */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "72px", height: "90px",
            borderRadius: "40%",
            border: "2px solid rgba(200,169,110,0.55)",
            animation: "speakWave 1.2s ease-out 0.6s infinite",
            pointerEvents: "none",
          }} />
          {/* Wave ring 4 */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "72px", height: "90px",
            borderRadius: "40%",
            border: "1.5px solid rgba(42,100,200,0.35)",
            animation: "speakWave 1.2s ease-out 0.9s infinite",
            pointerEvents: "none",
          }} />
          {/* Inner glow pulse */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80px", height: "98px",
            borderRadius: "42%",
            background: "radial-gradient(ellipse, rgba(42,100,200,0.25) 0%, rgba(42,100,200,0) 70%)",
            animation: "speakGlow 0.6s ease-in-out infinite alternate",
            pointerEvents: "none",
          }} />
        </>
      )}

      {/* Bot SVG */}
      <div style={{
        filter: isSpeaking
          ? "drop-shadow(0 0 10px rgba(42,100,200,0.9)) drop-shadow(0 0 4px rgba(200,169,110,0.4))"
          : "none",
        transition: "filter 0.2s ease",
        position: "relative",
        zIndex: 1,
      }}>
        <svg viewBox="0 0 80 100" fill="none" width="72" height="90">
          <ellipse cx="40" cy="97" rx="20" ry="4" fill="#061628" opacity="0.4" />
          <rect x="22" y="48" width="36" height="40" rx="12" fill="#e8f4ff" />
          <rect x="30" y="56" width="20" height="24" rx="7" fill="#2d6fc4" opacity="0.18" />
          <circle cx="40" cy="62" r="4.5" fill="#2d6fc4" opacity="0.85" />
          <circle cx="40" cy="62" r="2" fill="#fff" opacity="0.55" />
          <path
            d="M40 70 C40 70 35 65.5 35 62 C35 59.5 37.5 58 40 60 C42.5 58 45 59.5 45 62 C45 65.5 40 70 40 70Z"
            fill="#ff6b9d" opacity="0.75"
          />
          <rect x="8" y="52" width="15" height="8" rx="4" fill="#d0eaf8" transform="rotate(-12 8 52)" />
          <rect x="57" y="52" width="15" height="8" rx="4" fill="#d0eaf8" transform="rotate(12 72 52)" />
          <path d="M63 49 Q70 43 72 49" stroke="#d0eaf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="40" cy="34" r="19" fill="#e8f4ff" />
          <circle cx="33" cy="32" r="5.5" fill="#081832" />
          <circle cx="47" cy="32" r="5.5" fill="#081832" />
          <circle cx="34.5" cy="30.5" r="2" fill="white" />
          <circle cx="48.5" cy="30.5" r="2" fill="white" />
          <circle cx="40" cy="38" r="1.8" fill="#ffb3c6" />
          <line x1="40" y1="15" x2="40" y2="7" stroke="#2d6fc4" strokeWidth="1.8" />
          <circle cx="40" cy="5" r="3" fill="#2d6fc4" opacity="0.95" />
          <rect x="28" y="84" width="9" height="13" rx="4.5" fill="#c8e2f8" />
          <rect x="43" y="84" width="9" height="13" rx="4.5" fill="#c8e2f8" />
          <rect x="26" y="91" width="13" height="7" rx="3.5" fill="#8abce0" />
          <rect x="41" y="91" width="13" height="7" rx="3.5" fill="#8abce0" />
        </svg>
      </div>
    </div>
  );
});

const NAV_BUTTONS = [
  { id: "home",    icon: "⌂", label: "Home"    },
  { id: "newchat", icon: "+", label: "New Chat" },
  { id: "faq",     icon: "?", label: "FAQs"     },
];

function Sidebar({ activeSide, activeHistId, onNavClick, onHistoryClick, chatHistory = [], isLoading = false, isSpeaking = false }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__nav">
        {NAV_BUTTONS.map((btn) => (
          <button
            key={btn.id}
            onClick={() => onNavClick(btn.id)}
            className={`sidebar__btn${activeSide === btn.id ? " sidebar__btn--active" : ""}`}
          >
            <span className="sidebar__btn-icon">{btn.icon}</span>
            <span className="sidebar__btn-label">{btn.label}</span>
          </button>
        ))}
      </div>

      <div className="sidebar__sep" />
      <div className="sidebar__history-label">Recent Chats</div>

      <div className="sidebar__hist-list">
        {chatHistory.map((item) => (
          <button
            key={item.id}
            onClick={() => onHistoryClick(item)}
            title={item.title}
            className={`sidebar__hist-btn${activeHistId === item.id ? " sidebar__hist-btn--active" : ""}`}
          >
            <span className="sidebar__hist-icon">💬</span>
            <span className="sidebar__hist-title">{item.title}</span>
          </button>
        ))}
        {chatHistory.length === 0 && (
          <div style={{ padding: "12px 14px", fontSize: "10px", color: "rgba(255,255,255,0.3)", textAlign: "center", lineHeight: 1.6 }}>
            No chat history yet<br />Start a conversation!
          </div>
        )}
      </div>

      {/* Mascot + AI label below it */}
      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0 8px" }}>
        <div className="mascot">
          <BotMascot isLoading={isLoading} isSpeaking={isSpeaking} />
        </div>
        <div style={{
          fontSize: "10px", color: "#5baee0",
          background: "rgba(42,100,200,0.12)",
          border: "1px solid rgba(58,143,212,0.28)",
          borderRadius: "20px",
          padding: "3px 10px",
          marginTop: "10px",
          letterSpacing: "0.4px",
        }}>
          ✦ AI Admission Assistant
        </div>
      </div>
    </aside>
  );
}

export default memo(Sidebar);
