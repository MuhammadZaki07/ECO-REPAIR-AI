import { motion } from "motion/react";

function FloatingIcon({ emoji, className, color }: any) {
  return (
    <motion.div
      className={className + " cursor-pointer group"}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <div
        className={`absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition bg-${color}-400/20`}
      />
      <div className="relative w-10 h-10 border border-neutral-500/30 rounded bg-neutral-900/40 flex items-center justify-center text-2xl shadow-lg">
        {emoji}
      </div>
    </motion.div>
  );
}

export default FloatingIcon;
