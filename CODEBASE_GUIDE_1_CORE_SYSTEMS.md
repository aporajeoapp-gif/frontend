# Guide 1: Core Systems — Theme, Language & App Structure

---

## 1. How the App Starts (`src/main.jsx`)

```
main.jsx
  └── BrowserRouter        ← enables URL routing
        └── ErrorBoundary  ← catches React crashes, shows red error screen
              └── App      ← your entire app lives here
```

There is also a **Google Translate DOM fix** at the top of `main.jsx`. Google Translate
sometimes tries to move DOM nodes in a way that crashes React. The fix patches
`Node.prototype.removeChild` and `Node.prototype.insertBefore` to silently ignore
those bad operations instead of crashing.

---

## 2. Theme Switcher (`src/context/ThemeContext.jsx`)

### How it works — step by step

```
User clicks toggle button
  → toggleTheme() is called
  → theme state flips: "light" ↔ "dark"
  → useEffect runs
  → adds/removes class "dark" on <html> element
  → saves "light" or "dark" to localStorage
```

### The key trick: Tailwind's `dark:` classes

Tailwind is configured to use **class-based dark mode**. This means:
- When `<html class="dark">` exists → all `dark:bg-slate-900` etc. activate
- When `<html>` has no dark class → only normal classes apply

### On page load

```js
const [theme, setTheme] = useState(() => {
  const stored = localStorage.getItem("theme");
  return stored === "dark" || stored === "light" ? stored : "light";
});
```

It reads from `localStorage` first so the theme is remembered between visits.

### How to use it in any component

```jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const { theme, toggleTheme } = useContext(ThemeContext);
// theme = "light" or "dark"
// toggleTheme() = call this on button click
```

---

## 3. Language Translator (`src/context/LanguageContext.jsx`)

This has **two separate systems** working together. Understanding both is important.

### System A: Built-in translations (for UI labels)

There is a `TRANSLATIONS` object with two keys: `"en"` and `"bn"` (Bengali).
Each key holds an object of label strings.

```js
TRANSLATIONS = {
  en: { home: "Home", doctors: "Doctors", search: "Search", ... },
  bn: { home: "হোম", doctors: "ডাক্তার", search: "অনুসন্ধান", ... }
}
```

When you call `const { t } = useTranslation()` in any component, `t` is the
translation object for the current language. So `t.home` gives you `"Home"` or
`"হোম"` depending on the active language.

Example usage in Bus page:
```jsx
<input placeholder={t.search_placeholder_bus} />
// renders: "Search route name, number or stops..." (en)
// renders: "রুটের নাম বা নাম্বার দিয়ে খুঁজুন..." (bn)
```

### System B: Google Translate (for page content)

The actual page content (bus route names, doctor names, etc.) is NOT in the
translations object. For that, the app uses **Google Translate** via cookies.

```
toggleLanguage() is called
  → sets googtrans cookie: /en/bn  (or clears it for English)
  → calls window.location.reload()
  → Google Translate widget reads the cookie on reload
  → translates all visible page text automatically
```

The cookie format is: `googtrans=/en/bn`
- `/en` = source language (English)
- `/bn` = target language (Bengali)

To go back to English, the cookie is deleted and the page reloads.

### Why reload is needed

Google Translate is a browser-level widget. It cannot be told to re-translate
without a fresh page load. So `window.location.reload()` is mandatory.

### Language state on load

```js
const [language, setLanguage] = useState(() => {
  const fromCookie = getLangFromCookie(); // reads googtrans cookie
  if (fromCookie !== "en") return fromCookie;
  return localStorage.getItem("language") || "en";
});
```

It checks the cookie first (set by Google Translate), then falls back to
`localStorage`, then defaults to `"en"`.

### How to use it in any component

```jsx
import { useTranslation } from "../context/LanguageContext";

const { language, toggleLanguage, t } = useTranslation();
// language = "en" or "bn"
// toggleLanguage() = call on button click
// t.search = "Search" or "অনুসন্ধান"
```

---

## 4. App Routing (`src/App.jsx`)

The app has two completely separate route trees:

```
/admin/*  → AdminLayout (sidebar + topbar, no public navbar)
/*        → PublicLayout (Navbar + Footer + BottomNav)
```

### Public Layout

```jsx
function PublicLayout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingBottom: "4rem" }}>
        <Outlet />   ← child page renders here
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
```

`<Outlet />` is a React Router concept. It means "render the matched child route here".
So when you visit `/bus`, the `<Bus />` component renders inside `<main>`.

### Admin Routes

```
/admin          → AdminDashboard
/admin/bus      → BusPage
/admin/ferry    → FerryPage
/admin/users    → UsersPage
... etc
```

### Provider wrapping order

```jsx
<ThemeProvider>          ← outermost, theme available everywhere
  <LanguageProvider>     ← language available everywhere
    <AdminProvider>      ← admin state available everywhere
      <Routes>...</Routes>
    </AdminProvider>
  </LanguageProvider>
</ThemeProvider>
```

Order matters. Inner providers can use outer ones, but not the reverse.

### ScrollToTop

```jsx
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
```

Every time the URL changes, this scrolls the page back to the top. It renders
nothing (`return null`) — it only has a side effect.

---

## 5. Quick Reference

| What you want | Where to look |
|---|---|
| Toggle dark/light mode | `ThemeContext.jsx` → `toggleTheme()` |
| Get current theme | `ThemeContext` → `theme` value |
| Translate a UI label | `LanguageContext.jsx` → `t.key` |
| Switch language | `LanguageContext.jsx` → `toggleLanguage()` |
| Add a new page | `App.jsx` → add `<Route>` inside the right layout |
| Add a new admin page | `App.jsx` → add under `/admin` route tree |
