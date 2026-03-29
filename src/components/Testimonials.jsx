import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useMotionValue, animate } from "framer-motion";
import { Star, Quote } from "lucide-react";
import testimonials from "../constant/data/testimonials.json"

// Split into two columns with offset
const colA = testimonials.filter((_, i) => i % 2 === 0); // even → top-going (up)
const colB = testimonials.filter((_, i) => i % 2 !== 0); // odd  → bottom-going (down)

const CARD_H = 200; // px per card + gap
const GAP = 16;
const SPEED = 40; // px per second

function TestimonialCard({ item }) {
  return (
    <motion.div
      layout
      className="relative rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/80 backdrop-blur-sm p-5 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
      style={{ marginBottom: GAP }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Gradient blob */}
      <div
        className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${item.accent} opacity-10 group-hover:opacity-20 transition-opacity blur-md`}
      />

      {/* Quote icon */}
      <div
        className={`absolute top-3 right-4 bg-gradient-to-br ${item.accent} rounded-lg p-1.5 opacity-70`}
      >
        <Quote size={10} className="text-white" />
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-2.5">
        {[...Array(5)].map((_, j) => (
          <Star
            key={j}
            size={11}
            className={
              j < item.rating
                ? "text-amber-400 fill-amber-400"
                : "text-slate-300 dark:text-slate-600"
            }
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 italic">
        "{item.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-2.5">
        <div
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.accent} flex items-center justify-center text-sm shadow-md shrink-0`}
        >
          {item.image}
        </div>
        <div>
          <p className="text-xs font-bold text-slate-800 dark:text-white leading-none">
            {item.name}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {item.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function InfiniteColumn({ items, direction = "up", paused }) {
  const containerRef = useRef(null);
  const yVal = useMotionValue(0);
  const animRef = useRef(null);
  const pausedRef = useRef(paused);

  // track paused in ref so animation loop can see latest
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const totalH = items.length * (CARD_H + GAP);

  useEffect(() => {
    let rafId;
    let last = null;

    const step = (ts) => {
      if (last !== null && !pausedRef.current) {
        const delta = ts - last;
        const dy = (SPEED / 1000) * delta * (direction === "up" ? -1 : 1);
        let next = yVal.get() + dy;
        // loop
        if (direction === "up" && next <= -totalH) next += totalH;
        if (direction === "down" && next >= 0) next -= totalH;
        yVal.set(next);
      }
      last = ts;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [direction, totalH, yVal]);

  // duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden h-full" ref={containerRef}>
      <motion.div style={{ y: yVal }}>
        {doubled.map((item, i) => (
          <TestimonialCard key={`${item.id}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="py-16 px-4 bg-slate-50 dark:bg-slate-950 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-3 bg-violet-50 dark:bg-violet-900/30 px-3 py-1.5 rounded-full">
            <Star size={10} className="fill-violet-500 text-violet-500" />{" "}
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white">
            What People Say
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-md mx-auto">
            Real stories from real people who trust our platform every day.
          </p>
        </motion.div>

        {/* Two-column slider */}
        {/* Desktop: left col goes UP (top), right col goes DOWN (bottom) */}
        {/* Mobile: left col = bottom-going, right col = top-going  */}
        <div
          className="grid grid-cols-2 gap-4 relative"
          style={{ height: "clamp(420px, 60vh, 640px)" }}
        >
          {/* Fade top */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-50 dark:from-slate-950 to-transparent z-10" />
          {/* Fade bottom */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-10" />

          {/* Left column: desktop=up, mobile=down */}
          <div className="overflow-hidden h-full">
            {/* Desktop: up */}
            <div className="hidden lg:block h-full">
              <InfiniteColumn items={colA} direction="up" paused={paused} />
            </div>
            {/* Mobile: down */}
            <div className="block lg:hidden h-full">
              <InfiniteColumn items={colA} direction="down" paused={paused} />
            </div>
          </div>

          {/* Right column: desktop=down, mobile=up */}
          <div className="overflow-hidden h-full">
            {/* Desktop: down */}
            <div className="hidden lg:block h-full">
              <InfiniteColumn items={colB} direction="down" paused={paused} />
            </div>
            {/* Mobile: up */}
            <div className="block lg:hidden h-full">
              <InfiniteColumn items={colB} direction="up" paused={paused} />
            </div>
          </div>
        </div>

        {/* Pause hint */}
        {/* <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-slate-400 dark:text-slate-600 mt-4"
        >
          Hover to pause
        </motion.p> */}
      </div>
    </section>
  );
}