import React, { useState, useCallback, useRef } from "react";
import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";

// ── Static star data ──────────────────────────────────────────────────────────
const STARS = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.2 + 0.4,
  opacity: Math.random() * 0.65 + 0.2,
  dur: 2 + Math.random() * 3,
  delay: Math.random() * 5,
}));

// ── Multilingual Responses ────────────────────────────────────────────────────
const RESPONSES = {
  EN: {
    hostel: "We offer separate hostel facilities for girls with 24/7 security, Wi-Fi, hygienic food, laundry and recreation areas. 🏠",
    course: "We offer B.Tech programs in:\n• CSE (Computer Science)\n• ECE (Electronics & Communication)\n• EEE (Electrical & Electronics)\n• Civil Engineering\n• Mechanical Engineering\n\nAll AICTE approved with excellent placements! 🎓",
    fee: "Annual fee structure:\n• CSE — ₹95,000/year\n• ECE — ₹90,000/year\n• EEE — ₹85,000/year\n• Civil/Mech — ₹80,000/year\n\nScholarships available for rank < 10,000! 💰",
    placement: "Our placement highlights:\n• 92%+ placement rate\n• Top recruiters: TCS, Infosys, Wipro, Cognizant\n• Average package: ₹4.2 LPA\n• Highest package: ₹12 LPA 🚀",
    contact: "Our Admissions Team:\n📞 08922-247911\n📧 admissions@vignanwomen.ac.in\n⏰ Mon–Sat, 9 AM – 5 PM",
    eligib: "Please share:\n1️⃣ AP EAMCET Rank\n2️⃣ Marks percentage (10+2)\n3️⃣ Category (OC/BC/SC/ST)\n\nI'll instantly check your eligibility! ✦",
    default: "Thank you for your question! For the most accurate answer, please contact admissions:\n📞 08922-247911\n📧 admissions@vignanwomen.ac.in",
  },
  "తె": {
    hostel: "మేము బాలికలకు ప్రత్యేక హాస్టల్ సౌకర్యాలు అందిస్తున్నాము - 24/7 భద్రత, Wi-Fi, పోషకమైన ఆహారం, లాండ్రీ మరియు వినోద ప్రాంతాలు. 🏠",
    course: "మేము ఈ B.Tech కోర్సులు అందిస్తున్నాము:\n• CSE (కంప్యూటర్ సైన్స్)\n• ECE (ఎలక్ట్రానిక్స్ & కమ్యూనికేషన్)\n• EEE (ఎలక్ట్రికల్ & ఎలక్ట్రానిక్స్)\n• సివిల్ ఇంజనీరింగ్\n• మెకానికల్ ఇంజనీరింగ్\n\nఅన్నీ AICTE ఆమోద పొందినవి! 🎓",
    fee: "వార్షిక ఫీజు నిర్మాణం:\n• CSE — ₹95,000/సంవత్సరం\n• ECE — ₹90,000/సంవత్సరం\n• EEE — ₹85,000/సంవత్సరం\n• Civil/Mech — ₹80,000/సంవత్సరం\n\nర్యాంక్ < 10,000 కోసం స్కాలర్‌షిప్‌లు అందుబాటులో ఉన్నాయి! 💰",
    placement: "మా ప్లేస్‌మెంట్ విశేషాలు:\n• 92%+ ప్లేస్‌మెంట్ రేట్\n• టాప్ రిక్రూటర్లు: TCS, Infosys, Wipro, Cognizant\n• సగటు ప్యాకేజ్: ₹4.2 LPA\n• అత్యధిక ప్యాకేజ్: ₹12 LPA 🚀",
    contact: "మా అడ్మిషన్స్ టీమ్:\n📞 08922-247911\n📧 admissions@vignanwomen.ac.in\n⏰ సోమ–శని, ఉదయం 9 – సాయంత్రం 5",
    eligib: "దయచేసి పంచుకోండి:\n1️⃣ AP EAMCET ర్యాంక్\n2️⃣ మార్కుల శాతం (10+2)\n3️⃣ కేటగిరీ (OC/BC/SC/ST)\n\nమీ అర్హతను వెంటనే తనిఖీ చేస్తాను! ✦",
    default: "మీ ప్రశ్నకు ధన్యవాదాలు! సరైన సమాచారానికి అడ్మిషన్స్‌ని సంప్రదించండి:\n📞 08922-247911\n📧 admissions@vignanwomen.ac.in",
  },
  "हि": {
    hostel: "हम लड़कियों के लिए अलग छात्रावास सुविधाएं प्रदान करते हैं - 24/7 सुरक्षा, Wi-Fi, स्वच्छ भोजन, लॉन्ड्री और मनोरंजन क्षेत्र। 🏠",
    course: "हम ये B.Tech कोर्स प्रदान करते हैं:\n• CSE (कंप्यूटर साइंस)\n• ECE (इलेक्ट्रॉनिक्स & कम्युनिकेशन)\n• EEE (इलेक्ट्रिकल & इलेक्ट्रॉनिक्स)\n• सिविल इंजीनियरिंग\n• मैकेनिकल इंजीनियरिंग\n\nसभी AICTE स्वीकृत! 🎓",
    fee: "वार्षिक शुल्क संरचना:\n• CSE — ₹95,000/वर्ष\n• ECE — ₹90,000/वर्ष\n• EEE — ₹85,000/वर्ष\n• Civil/Mech — ₹80,000/वर्ष\n\nरैंक < 10,000 के लिए छात्रवृत्ति उपलब्ध! 💰",
    placement: "हमारी प्लेसमेंट विशेषताएं:\n• 92%+ प्लेसमेंट दर\n• शीर्ष भर्तीकर्ता: TCS, Infosys, Wipro, Cognizant\n• औसत पैकेज: ₹4.2 LPA\n• सर्वोच्च पैकेज: ₹12 LPA 🚀",
    contact: "हमारी प्रवेश टीम:\n📞 08922-247911\n📧 admissions@vignanwomen.ac.in\n⏰ सोम–शनि, सुबह 9 – शाम 5",
    eligib: "कृपया साझा करें:\n1️⃣ AP EAMCET रैंक\n2️⃣ अंक प्रतिशत (10+2)\n3️⃣ श्रेणी (OC/BC/SC/ST)\n\nमैं तुरंत आपकी पात्रता जांचूंगा! ✦",
    default: "आपके प्रश्न के लिए धन्यवाद! सटीक जानकारी के लिए प्रवेश से संपर्क करें:\n📞 08922-247911\n📧 admissions@vignanwomen.ac.in",
  },
  "ଓ": {
    hostel: "ଆମେ ଝିଅମାନଙ୍କ ପାଇଁ ଅଲଗା ହଷ୍ଟେଲ ସୁବିଧା ପ୍ରଦାନ କରୁ - 24/7 ସୁରକ୍ଷା, Wi-Fi, ସ୍ୱାସ୍ଥ୍ୟକର ଖାଦ୍ୟ, ଲଣ୍ଡ୍ରି ଓ ମନୋରଞ୍ଜନ ଅଞ୍ଚଳ। 🏠",
    course: "ଆମେ ଏହି B.Tech ପ୍ରୋଗ୍ରାମ ଅଫର କରୁ:\n• CSE (କମ୍ପ୍ୟୁଟର ସାଇନ୍ସ)\n• ECE (ଇଲେକ୍ଟ୍ରୋନିକ୍ସ & କମ୍ୟୁନିକେସନ)\n• EEE (ଇଲେକ୍ଟ୍ରିକ୍ୟାଲ & ଇଲେକ୍ଟ୍ରୋନିକ୍ସ)\n• ସିଭିଲ ଇଞ୍ଜିନିୟରିଂ\n• ମେକାନିକ୍ୟାଲ ଇଞ୍ଜିନିୟରିଂ\n\nସମସ୍ତ AICTE ଅନୁମୋଦିତ! 🎓",
    fee: "ବାର୍ଷିକ ଫି ସଂରଚନା:\n• CSE — ₹95,000/ବର୍ଷ\n• ECE — ₹90,000/ବର୍ଷ\n• EEE — ₹85,000/ବର୍ଷ\n• Civil/Mech — ₹80,000/ବର୍ଷ\n\nRank < 10,000 ପାଇଁ ବୃତ୍ତି ଉପଲବ୍ଧ! 💰",
    placement: "ଆମର ପ୍ଲେସ୍‌ମେଣ୍ଟ ବିବରଣ:\n• 92%+ ପ୍ଲେସ୍‌ମେଣ୍ଟ ହାର\n• ଶୀର୍ଷ ନିଯୁକ୍ତିଦାତା: TCS, Infosys, Wipro, Cognizant\n• ହାରାହାରି ପ୍ୟାକେଜ: ₹4.2 LPA\n• ସର୍ବୋଚ୍ଚ ପ୍ୟାକେଜ: ₹12 LPA 🚀",
    contact: "ଆମର ପ୍ରବେଶ ଦଳ:\n📞 08922-247911\n📧 admissions@vignanwomen.ac.in\n⏰ ସୋମ–ଶନି, ସକାଳ 9 – ସନ୍ଧ୍ୟା 5",
    eligib: "ଦୟାକରି ଶେୟାର କରନ୍ତୁ:\n1️⃣ AP EAMCET Rank\n2️⃣ ଅଙ୍କ ଶତକଡ଼ା (10+2)\n3️⃣ ବର୍ଗ (OC/BC/SC/ST)\n\nଆପଣଙ୍କ ଯୋଗ୍ୟତା ତୁରନ୍ତ ଯାଞ୍ଚ କରିବି! ✦",
    default: "ଆପଣଙ୍କ ପ୍ରଶ୍ନ ପାଇଁ ଧନ୍ୟବାଦ! ସଠିକ ଉତ୍ତର ପାଇଁ ପ୍ରବେଶ ଦଳ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ:\n📞 08922-247911\n📧 admissions@vignanwomen.ac.in",
  },
};

function getResponse(text, lang = "EN") {
  const l = text.toLowerCase();
  const r = RESPONSES[lang] || RESPONSES.EN;
  if (l.includes("hostel") || l.includes("accommodation") || l.includes("హాస్టల్") || l.includes("छात्रावास") || l.includes("ହଷ୍ଟେଲ")) return r.hostel;
  if (l.includes("course") || l.includes("branch") || l.includes("program") || l.includes("కోర్స్") || l.includes("कोर्स") || l.includes("ପ୍ରୋଗ୍ରାମ")) return r.course;
  if (l.includes("fee") || l.includes("cost") || l.includes("tuition") || l.includes("ఫీజు") || l.includes("शुल्क") || l.includes("ଫି")) return r.fee;
  if (l.includes("placement") || l.includes("job") || l.includes("recrui") || l.includes("ప్లేస్‌మెంట్") || l.includes("प्लेसमेंट")) return r.placement;
  if (l.includes("contact") || l.includes("officer") || l.includes("admission") || l.includes("సంప్రదించ") || l.includes("संपर्क")) return r.contact;
  if (l.includes("eligib") || l.includes("rank") || l.includes("qualif") || l.includes("అర్హత") || l.includes("पात्रता") || l.includes("ଯୋଗ୍ୟ")) return r.eligib;
  return r.default;
}

function nowTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function speakText(text, lang = "en-US", onStart, onEnd) {
  if (!window.speechSynthesis) {
    if (onEnd) onEnd();
    return;
  }
  const cleanText = text.replace(/[^\w\s.,!?₹]/g, "");
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  const speak = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.name.includes("Google UK English Female") ||
      v.name.includes("Samantha") ||
      v.name.includes("Microsoft Zira")
    );
    if (preferred) utterance.voice = preferred;
    utterance.onstart = () => { if (onStart) onStart(); };
    utterance.onend = () => { if (onEnd) onEnd(); };
    utterance.onerror = () => { if (onEnd) onEnd(); };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = speak;
  } else {
    speak();
  }
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [activeLang, setActiveLang] = useState("EN");
  const [activeSide, setActiveSide] = useState("home");
  const [showFaqBar, setShowFaqBar] = useState(false);
  const [activeHistId, setActiveHistId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesRef = useRef(messages);
  const currentChatIdRef = useRef(currentChatId);
  const activeLangRef = useRef(activeLang);

  React.useEffect(() => { messagesRef.current = messages; }, [messages]);
  React.useEffect(() => { currentChatIdRef.current = currentChatId; }, [currentChatId]);
  React.useEffect(() => { activeLangRef.current = activeLang; }, [activeLang]);

  const hasChat = messages.length > 0;

  const speakBotMessage = useCallback((text) => {
    const langMap = {
      EN: "en-US",
      "తె": "te-IN",
      "हि": "hi-IN",
      "ଓ": "or-IN",
    };
    const speechLang = langMap[activeLangRef.current] || "en-US";
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    speakText(
      text,
      speechLang,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  }, []);

  const sendMessage = useCallback((text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput("");
    setShowFaqBar(false);
    setActiveSide("home");

    const newMessages = [
      ...messagesRef.current,
      { id: Date.now(), role: "user", text: msg, time: nowTime() },
    ];
    setMessages(newMessages);
    setTyping(true);
    setIsLoading(true);

    setTimeout(() => {
      setTyping(false);
      const botResponse = getResponse(msg, activeLangRef.current);
      const botMsg = { id: Date.now() + 1, role: "bot", text: botResponse, time: nowTime() };
      const updatedMessages = [...newMessages, botMsg];
      setMessages(updatedMessages);
      setIsLoading(false);
      speakBotMessage(botResponse);

      if (currentChatIdRef.current === null) {
        const newChatId = Date.now();
        setChatHistory((prev) => [
          { id: newChatId, title: msg.slice(0, 30), preview: msg.slice(0, 40), messages: updatedMessages },
          ...prev,
        ]);
        setCurrentChatId(newChatId);
      } else {
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id === currentChatIdRef.current
              ? { ...chat, messages: updatedMessages, title: updatedMessages[0]?.text?.slice(0, 30) || chat.title }
              : chat
          )
        );
      }
    }, 1100 + Math.random() * 700);
  }, [input, speakBotMessage]);

  const handleNavClick = useCallback((id) => {
    if (id === "faq") {
      const next = !showFaqBar;
      setShowFaqBar(next);
      setActiveSide(next ? "faq" : "home");
    } else if (id === "newchat") {
      setMessages([]);
      setActiveSide("home");
      setShowFaqBar(false);
      setActiveHistId(null);
      setCurrentChatId(null);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsLoading(false);
    } else {
      setActiveSide(id);
      setShowFaqBar(false);
    }
  }, [showFaqBar]);

  const handleHistoryClick = useCallback((item) => {
    setActiveHistId(item.id);
    setActiveSide("home");
    setShowFaqBar(false);
    setMessages(item.messages || []);
    setCurrentChatId(item.id);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsLoading(false);
  }, []);

  const handleVoiceToggle = useCallback(() => {
    if (!isListening) {
      setIsListening(true);
      const langMap = { EN: "en-US", "తె": "te-IN", "हि": "hi-IN", "ଓ": "or-IN" };
      const recogLang = langMap[activeLangRef.current] || "en-US";

      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = recogLang;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
          setTimeout(() => sendMessage(transcript), 100);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognition.start();
      } else {
        setTimeout(() => {
          setIsListening(false);
          const demo = "Tell me about hostel facilities";
          setInput(demo);
          setTimeout(() => sendMessage(demo), 100);
        }, 2000);
      }
    } else {
      setIsListening(false);
    }
  }, [isListening, sendMessage]);

  return (
    <div className="app-root">
      <div className="starfield">
  {Array.from({ length: 80 }).map((_, i) => {
    const size = Math.random() < 0.6 ? "small" : Math.random() < 0.85 ? "medium" : "large";
    return (
      <div
        key={i}
        className={`star ${size}`}
        style={{
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          animationDuration: 2 + Math.random() * 3 + "s"
        }}
      />
    );
  })}
</div>
      <div className="glow glow--tl" />
      <div className="glow glow--br" />

      <div className="shell" >
        <Header activeLang={activeLang} setActiveLang={setActiveLang} />
        <div className="shell__body">
          <Sidebar
            activeSide={activeSide}
            activeHistId={activeHistId}
            onNavClick={handleNavClick}
            onHistoryClick={handleHistoryClick}
            chatHistory={chatHistory}
            isLoading={isLoading}
            isSpeaking={isSpeaking}
          />
          <div className="shell__main">
            <ChatWindow
              messages={messages}
              typing={typing}
              showFaqBar={showFaqBar}
              onFaqSelect={sendMessage}
              hasChat={hasChat}
            />
            <InputBar
              input={input}
              setInput={setInput}
              onSend={sendMessage}
              isListening={isListening}
              onToggleVoice={handleVoiceToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}