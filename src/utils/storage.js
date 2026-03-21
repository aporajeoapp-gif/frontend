export const getLanguagePreference = () => {
  const stored = localStorage.getItem("language");
  if (stored === "en" || stored === "bn") {
    return stored;
  }
  return "en";
};

export const setLanguagePreference = (language) => {
  if (language === "en" || language === "bn") {
    localStorage.setItem("language", language);
  }
};

export const clearLanguagePreference = () => {
  localStorage.removeItem("language");
};
