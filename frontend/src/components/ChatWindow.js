import { useRef, useEffect } from "react";
import Message, { TypingIndicator } from "./Message";
import WelcomeScreen from "./WelcomeScreen";

const FAQS = [
  "What are the admission requirements?",
  "How do I apply for hostel accommodation?",
  "What is the annual fee structure?",
  "Are merit scholarships available?",
  "What B.Tech branches are offered?",
  "What is the EAMCET cutoff rank?",
  "How are placement drives conducted?",
  "Is there transportation from the city?",
];

function FAQBar({ onSelect }) {
  return (
    <div className="faq-bar">
      <div className="faq-bar__title">Frequently Asked Questions</div>
      <div className="faq-bar__grid">
        {FAQS.map((q, i) => (
          <button key={i} onClick={() => onSelect(q)} className="faq-bar__chip">
            <span style={{ color: "#5baee0", fontSize: 10 }}>✦</span>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChatWindow({ messages, typing, showFaqBar, onFaqSelect, hasChat }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  if (!hasChat && !showFaqBar) {
    return <WelcomeScreen onCardClick={onFaqSelect} />;
  }

  return (
    <>
      {showFaqBar && <FAQBar onSelect={onFaqSelect} />}
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <Message key={msg.id} msg={msg} index={idx} />
        ))}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </>
  );
}
