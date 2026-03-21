import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Megaphone, ChevronLeft, ChevronRight, Zap } from "lucide-react";

/* ── Font + CSS variables ── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

    .adb {
      --bg:          #ffffff;
      --surface:     #f7f8fa;
      --surface2:    #eef0f4;
      --border:      #e2e5ea;
      --text:        #111318;
      --text-2:      #5a5f6e;
      --text-3:      #9ba1b0;
      --accent:      #1a56db;
      --accent-soft: #eff4ff;
      --accent-text: #1a56db;
      --ticker-bg:   #111318;
      --ticker-dim:  #8b92a8;
      --ticker-hi:   #60a5fa;
      --vign-r:      rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.36) 60%, rgba(0,0,0,0.06) 100%;
      --vign-b:      rgba(0,0,0,0.75) 0%, transparent 55%;
      --sh-sm:       0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05);
      --sh-md:       0 4px 14px rgba(0,0,0,0.09), 0 2px 6px rgba(0,0,0,0.05);
      --sh-lg:       0 12px 36px rgba(0,0,0,0.11), 0 4px 12px rgba(0,0,0,0.07);
      --r:           10px;
      --r-lg:        14px;
      font-family: 'Sora', sans-serif;
      transition: background 0.3s;
    }

    .adb.dark {
      --bg:          #0f1117;
      --surface:     #171b24;
      --surface2:    #1e2330;
      --border:      #252d3d;
      --text:        #e6e8f0;
      --text-2:      #8892aa;
      --text-3:      #45506a;
      --accent:      #4d8ef8;
      --accent-soft: #1a243e;
      --accent-text: #7aadff;
      --ticker-bg:   #090c12;
      --ticker-dim:  #6b7490;
      --ticker-hi:   #4d8ef8;
      --vign-r:      rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.46) 60%, rgba(0,0,0,0.1) 100%;
      --vign-b:      rgba(0,0,0,0.85) 0%, transparent 55%;
      --sh-sm:       0 1px 3px rgba(0,0,0,0.28);
      --sh-md:       0 4px 14px rgba(0,0,0,0.38);
      --sh-lg:       0 12px 36px rgba(0,0,0,0.48);
    }

    .adb *, .adb *::before, .adb *::after { box-sizing: border-box; }
    .adb button { border: none; cursor: pointer; background: none; padding: 0; font-family: inherit; }
    .adb a { text-decoration: none; }

    @keyframes adb-tick   { to { transform: translateX(-50%); } }
    @keyframes adb-prog   { from { width: 0% } to { width: 100% } }
    @keyframes adb-pulse  { 0%,100%{opacity:1} 50%{opacity:0.25} }

    .adb-tape     { animation: adb-tick 30s linear infinite; display:flex; width:max-content; white-space:nowrap; }
    .adb-tape:hover { animation-play-state: paused; }
    .adb-prog     { animation: adb-prog 5s linear forwards; }
    .adb-blink    { animation: adb-pulse 1.4s ease-in-out infinite; }

    .adb-thumb-img { transition: transform 0.4s ease; will-change: transform; }
    .adb-thumb:hover .adb-thumb-img { transform: scale(1.05); }

    .adb-no-scroll { scrollbar-width: none; }
    .adb-no-scroll::-webkit-scrollbar { display: none; }

    .adb-cta:hover { opacity: 0.88 !important; }
    .adb-arrow:hover { background: rgba(0,0,0,0.55) !important; }
    .adb-side-btn:hover { border-color: var(--accent) !important; }
    .adb-toggle:hover { background: var(--surface2) !important; color: var(--text) !important; }

    @media (max-width: 768px) {
      .adb-side { display: none !important; }
      .adb-hero-col { grid-column: 1 / -1 !important; }
    }
  `}</style>
);

/* ── Ticker ── */
function Ticker({ ads }) {
  return (
    <div style={{ background: "var(--ticker-bg)", overflow: "hidden", display: "flex" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: "9px 16px",
        background: "var(--accent)", flexShrink: 0,
      }}>
        <span className="adb-blink" style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
        <Megaphone size={11} color="#fff" />
        <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase" }}>Live</span>
      </div>
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div className="adb-tape">
          {[...ads, ...ads].map((ad, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 36px", fontSize: 11 }}>
              <span style={{ color: "var(--ticker-hi)", fontWeight: 600 }}>{ad.title}</span>
              <span style={{ color: "var(--ticker-dim)", margin: "0 2px" }}>·</span>
              <span style={{ color: "var(--ticker-dim)" }}>{ad.description.slice(0, 45)}…</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Hero card ── */
function Hero({ ads, current, paused, onPause, onResume, onPrev, onNext, onDot }) {
  const ad = ads[current];
  return (
    <div
      style={{ position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden", minHeight: "clamp(280px,38vw,440px)", boxShadow: "var(--sh-lg)" }}
      onMouseEnter={onPause} onMouseLeave={onResume}
    >
      {/* BG image */}
      <AnimatePresence mode="sync">
        <motion.img key={`img-${ad.id}`} src={ad.imageUrl} alt={ad.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        />
      </AnimatePresence>

      {/* Vignettes */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${ad.gradient || "var(--vign-r)"})`, mixBlendMode: "multiply", opacity: 0.7 }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, var(--vign-r))` }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, var(--vign-b))` }} />

      {/* Tag */}
      <AnimatePresence mode="wait">
        <motion.div key={`tag-${ad.id}`} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          style={{ position: "absolute", top: 18, left: 18, zIndex: 10, display: "flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.14)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.22)", borderRadius: 999, padding: "5px 12px",
          }}>
          <Zap size={10} color="#fff" fill="#fff" />
          <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>{ad.tag}</span>
        </motion.div>
      </AnimatePresence>

      {/* Counter */}
      <div style={{ position: "absolute", top: 18, right: 18, zIndex: 10,
        background: "rgba(0,0,0,0.38)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.14)", borderRadius: 999,
        padding: "5px 11px", fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.75)", letterSpacing: "0.05em",
      }}>
        {current + 1} / {ads.length}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div key={`cnt-${ad.id}`}
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.38 }}
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, padding: "24px 26px 30px" }}
        >
          <h3 style={{
            fontFamily: "'Lora', serif", fontSize: "clamp(18px,3vw,32px)", fontWeight: 600,
            color: "#fff", margin: "0 0 8px", lineHeight: 1.18, maxWidth: 460,
            textShadow: "0 1px 24px rgba(0,0,0,0.45)",
          }}>{ad.title}</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 18px", maxWidth: 400, lineHeight: 1.65 }}>
            {ad.description}
          </p>
          <a href={ad.redirectUrl} target="_blank" rel="noopener noreferrer"
            className="adb-cta"
            style={{ display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 600,
              padding: "10px 22px", borderRadius: "var(--r)", transition: "opacity 0.2s",
              boxShadow: "0 2px 14px rgba(26,86,219,0.38)",
            }}>
            {ad.cta} <ExternalLink size={13} />
          </a>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      {[{ side: "left", Icon: ChevronLeft, onClick: onPrev }, { side: "right", Icon: ChevronRight, onClick: onNext }].map(({ side, Icon, onClick }) => (
        <button key={side} className="adb-arrow" onClick={onClick}
          style={{ position: "absolute", top: "50%", [side]: 14, transform: "translateY(-50%)", zIndex: 10,
            width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.32)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.16)", color: "#fff", transition: "background 0.2s",
          }}>
          <Icon size={16} />
        </button>
      ))}

      {/* Dots */}
      <div style={{ position: "absolute", bottom: 14, right: 18, zIndex: 10, display: "flex", gap: 5, alignItems: "center" }}>
        {ads.map((_, i) => (
          <button key={i} onClick={() => onDot(i)}
            style={{ width: i === current ? 20 : 6, height: 6, borderRadius: 999,
              background: i === current ? "#fff" : "rgba(255,255,255,0.32)", transition: "all 0.3s ease",
            }} />
        ))}
      </div>

      {/* Progress */}
      {!paused && (
        <div key={`pb-${current}`} className="adb-prog"
          style={{ position: "absolute", bottom: 0, left: 0, height: 2, background: "var(--accent)", zIndex: 20 }} />
      )}
    </div>
  );
}

/* ── Side list ── */
function SideList({ ads, current, onSelect }) {
  return (
    <div className="adb-no-scroll adb-side"
      style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto",
        maxHeight: "clamp(280px,38vw,440px)", paddingRight: 2,
      }}>
      {ads.map((ad, i) => {
        const active = i === current;
        return (
          <motion.button key={ad.id} className="adb-side-btn" onClick={() => onSelect(i)} whileHover={{ x: 3 }}
            style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px",
              borderRadius: "var(--r)", textAlign: "left",
              border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
              background: active ? "var(--accent-soft)" : "var(--surface)",
              boxShadow: active ? "var(--sh-sm)" : "none",
              transition: "border-color 0.2s, background 0.2s",
            }}>
            {/* Thumb */}
            <div className="adb-thumb"
              style={{ width: 46, height: 46, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
              <img className="adb-thumb-img" src={ad.imageUrl} alt={ad.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "var(--accent-text)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 2 }}>
                {ad.tag}
              </span>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {ad.title}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--text-3)" }}>{ad.cta}</p>
            </div>
            {/* Dot */}
            <div style={{ width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
              background: active ? "var(--accent)" : "var(--border)", transition: "background 0.2s" }} />
          </motion.button>
        );
      })}
    </div>
  );
}

/* ── Grid ── */
function Grid({ ads, current, onSelect }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>All Promotions</span>
        <span style={{ fontSize: 11, color: "var(--text-3)" }}>{ads.length} active</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(116px, 1fr))", gap: 10 }}>
        {ads.map((ad, i) => {
          const active = i === current;
          return (
            <motion.button key={ad.id} onClick={() => onSelect(i)}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden",
                borderRadius: "var(--r)", padding: 0, cursor: "pointer",
                border: `1.5px solid ${active ? "var(--accent)" : "var(--border)"}`,
                outline: active ? "3px solid var(--accent-soft)" : "none",
                outlineOffset: 2,
                boxShadow: active ? "var(--sh-md)" : "var(--sh-sm)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}>
              <img src={ad.imageUrl} alt={ad.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 40%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 9px" }}>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: "#fff", lineHeight: 1.3,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {ad.title}
                </p>
              </div>
              {active && (
                <div style={{ position: "absolute", top: 7, right: 7, width: 18, height: 18, borderRadius: "50%",
                  background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2 2 4-4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Root ── */
export default function AddBanner({ ads }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dark, setDark] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % ads.length), [ads.length]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + ads.length) % ads.length), [ads.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <div className={`adb${dark ? " dark" : ""}`}
      style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      <Styles />
      <Ticker ads={ads} />

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "28px 20px 40px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Sponsored
              </span>
            </div>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(18px,2.6vw,28px)", fontWeight: 600,
              color: "var(--text)", margin: 0, lineHeight: 1.15 }}>
              Featured Offers
            </h2>
          </div>

          {/* Theme toggle */}
          <button className="adb-toggle"
            onClick={() => setDark(d => !d)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 16px",
              border: "1px solid var(--border)", borderRadius: 999,
              background: "var(--surface)", color: "var(--text-2)",
              fontSize: 12, fontWeight: 500, transition: "background 0.2s, color 0.2s",
            }}>
            <span style={{ fontSize: 14 }}>{dark ? "☀️" : "🌙"}</span>
            {dark ? "Light mode" : "Dark mode"}
          </button>
        </div>

        {/* Hero + Side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 252px", gap: 14, marginBottom: 26, alignItems: "start" }}>
          <div className="adb-hero-col">
            <Hero ads={ads} current={current} paused={paused}
              onPause={() => setPaused(true)} onResume={() => setPaused(false)}
              onPrev={prev} onNext={next} onDot={setCurrent}
            />
          </div>
          <SideList ads={ads} current={current} onSelect={setCurrent} />
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", margin: "0 0 22px" }} />

        {/* Grid */}
        <Grid ads={ads} current={current} onSelect={setCurrent} />

        {/* Footer */}
        <div style={{ marginTop: 28, paddingTop: 16, borderTop: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "var(--text-3)" }}>{ads.length} active promotions</span>
          <span style={{ fontSize: 11, color: "var(--text-3)" }}>Sponsored Content</span>
        </div>
      </div>
    </div>
  );
}