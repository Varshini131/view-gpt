const LANGS = [
  { code: "EN",  name: "English", native: "English" },
  { code: "తె",  name: "Telugu",  native: "తెలుగు"  },
  { code: "हि",  name: "Hindi",   native: "हिन्दी"   },
  { code: "ଓ",   name: "Odia",    native: "ଓଡ଼ିଆ"   },
];

export default function LanguageSelect({ activeLang, setActiveLang }) {
  return (
    <div className="lang-row">
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setActiveLang(lang.code)}
          className={`lang-pill${activeLang === lang.code ? " lang-pill--active" : ""}`}
        >
          {lang.native}
        </button>
      ))}
    </div>
  );
}
