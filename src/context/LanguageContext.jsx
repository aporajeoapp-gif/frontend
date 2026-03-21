import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

// Programmatically trigger Google Translate to switch language
function applyGoogleTranslate(langCode) {
  // Google Translate sets a cookie named "googtrans" to control the language
  // Format: /en/<target> or /auto/<target>; clearing it restores original
  const domain = window.location.hostname;

  if (langCode === "en") {
    // Remove the cookie to restore original English
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
  } else {
    const val = `/en/${langCode}`;
    document.cookie = `googtrans=${val}; path=/`;
    document.cookie = `googtrans=${val}; path=/; domain=${domain}`;
    document.cookie = `googtrans=${val}; path=/; domain=.${domain}`;
  }

  // Reload the page so Google Translate picks up the new cookie
  window.location.reload();
}

// Read current language from the googtrans cookie
function getLangFromCookie() {
  const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
  return match ? match[1] : "en";
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const fromCookie = getLangFromCookie();
    return fromCookie !== "en"
      ? fromCookie
      : localStorage.getItem("language") || "en";
  });

  const toggleLanguage = () => {
    const next = language === "en" ? "bn" : "en";
    localStorage.setItem("language", next);
    setLanguage(next);
    applyGoogleTranslate(next);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
