import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
  image,
  gradient,
  Icon,
  badge,
}) {
  return (
<div className="relative w-[80%] h-56 sm:h-72 overflow-hidden mx-auto mt-5 rounded-2xl">
      {/* Background image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${gradient ?? "from-indigo-900/80 via-violet-900/70 to-slate-900/80"}`}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {Icon && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4 shadow-xl"
          >
            <Icon size={28} className="text-white" />
          </motion.div>
        )}

        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 mb-3"
          >
            {badge}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="mt-2 text-sm sm:text-base text-white/75 max-w-md"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Bottom fade into page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-slate-50 dark:from-slate-950 to-transparent" />
    </div>
  );
}
