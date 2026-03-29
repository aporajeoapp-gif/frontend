import { createContext, useContext, useEffect, useState } from "react";

const COLORS = [
  { name: "Indigo", value: "#6366f1" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Rose", value: "#ef4444" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Emerald", value: "#10b981" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Orange", value: "#f97316" },
];

const DEFAULT_COLOR = "#6366f1";

const BrandContext = createContext(null);

// Converts hex to space-separated RGB for Tailwind opacity utilities
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
}

function applyColor(hex) {
  const root = document.documentElement;
  root.style.setProperty("--brand", hex);
  root.style.setProperty("--brand-rgb", hexToRgb(hex));
}

export function BrandProvider({ children }) {
  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem("accentColor") || DEFAULT_COLOR;
  });

  useEffect(() => {
    applyColor(accentColor);
  }, [accentColor]);

  const updateColor = (hex) => {
    setAccentColor(hex);
    localStorage.setItem("accentColor", hex);
  };

  const resetColor = () => updateColor(DEFAULT_COLOR);

  return (
    <BrandContext.Provider
      value={{ accentColor, updateColor, resetColor, COLORS }}
    >
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  return useContext(BrandContext);
}
