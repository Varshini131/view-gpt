const FEATURE_CARDS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
          fill="#5baee0" opacity="0" />
        <circle cx="12" cy="12" r="10" stroke="#5baee0" strokeWidth="1.5" fill="rgba(42,100,200,0.2)" />
        <path d="M8 10h8M8 14h5" stroke="#5baee0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 6 L18 12 L16 18" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    label: "Courses Offered",
    desc: "Explore UG & PG programs",
    query: "What courses are offered?",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="18" rx="3" fill="rgba(42,100,200,0.2)" stroke="#5baee0" strokeWidth="1.5" />
        <path d="M8 8h8M8 12h8M8 16h5" stroke="#5baee0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Hostel Facilities",
    desc: "Rooms, amenities & rules",
    query: "Tell me about hostel facilities",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="rgba(42,100,200,0.2)" stroke="#5baee0" strokeWidth="1.5" />
        <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#c8a96e" fontWeight="bold">₹</text>
      </svg>
    ),
    label: "Fee Structure",
    desc: "Detailed fee information",
    query: "What is the fee structure?",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M9 11l3 3L22 4" stroke="#5baee0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
          stroke="#5baee0" strokeWidth="1.5" strokeLinecap="round" fill="rgba(42,100,200,0.2)" />
      </svg>
    ),
    label: "Check Eligibility",
    desc: "See course-wise eligibility criteria",
    query: "Check my eligibility for admission",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"
          stroke="#5baee0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    label: "Placement Stats",
    desc: "Placement data & recruiters",
    query: "What are the placement statistics?",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="rgba(42,100,200,0.2)" stroke="#5baee0" strokeWidth="1.5" />
        <path d="M8 9a3 3 0 016 0c0 2-3 3-3 3" stroke="#5baee0" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="#5baee0" />
      </svg>
    ),
    label: "Contact Admissions",
    desc: "Talk to our admission team",
    query: "How do I contact admissions?",
  },
];

export default function WelcomeScreen({ onCardClick }) {
  return (
    <div className="welcome">
      <div className="welcome__badge">✦ AI Admission Assistant</div>

      <div className="welcome__line">How can we</div>
      <div className="welcome__line">
        <span className="welcome__accent">help you</span> today?
      </div>

      <p className="welcome__sub">
        Ask anything about admissions, courses, fees,<br />
        hostel, eligibility — in any language.
      </p>

      {/* Feature cards grid */}
      <div className="welcome__cards">
        {FEATURE_CARDS.map((card) => (
          <button
            key={card.label}
            className="welcome__card"
            onClick={() => onCardClick && onCardClick(card.query)}
          >
            <div className="welcome__card-icon">{card.icon}</div>
            <div className="welcome__card-label">{card.label}</div>
            <div className="welcome__card-desc">{card.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
