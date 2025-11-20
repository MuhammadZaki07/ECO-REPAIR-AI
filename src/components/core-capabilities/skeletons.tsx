import { motion } from "framer-motion";
import {IconCamera, IconClipboardList, IconCoins, IconMapPin, IconTrophy, IconUsers } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const SoftGreen = "#4ade80";

export const SkeletonOne = () => {
  const variantsA = { initial: { x: 0 }, animate: { x: 10, rotate: 5, transition: { duration: 0.2 } } };
  const variantsB = { initial: { x: 0 }, animate: { x: -10, rotate: -5, transition: { duration: 0.2 } } };

  const MessageRow = ({ variant, icon }: any) => (
    <motion.div
      variants={variant}
      className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
    >
      {icon && <div className={`h-6 w-6 rounded-full bg-[${SoftGreen}] shrink-0 flex items-center justify-center`}>{icon}</div>}
      <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
    </motion.div>
  );

  return (
    <motion.div initial="initial" whileHover="animate" className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.1] bg-dot-black/[0.1] flex-col space-y-2">
      <MessageRow variant={variantsA} icon={<IconCamera className="w-4 h-4 text-black" />} />
      <MessageRow variant={variantsB} />
      <MessageRow variant={variantsA} icon={<IconCamera className="w-4 h-4 text-black" />} />
    </motion.div>
  );
};
export const SkeletonTwo = () => {
  const variants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 0.2 } },
    hover: { width: ["0%", "100%"], transition: { duration: 2 } },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.1] bg-dot-black/[0.1] flex-col space-y-2 p-4"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{ maxWidth: Math.random() * (90 - 50) + 50 + "%" }}
          className={`flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.1] p-1.5 items-center space-x-2 bg-[#161616] w-full h-4 ${
            i % 3 === 0 ? `bg-[${SoftGreen}]/20` : ""
          }`}
        >
          <div
            className={`h-2 w-2 rounded-full ${
              i % 3 === 0 ? `bg-[${SoftGreen}]` : "bg-white/20"
            }`}
          ></div>
          <div className="w-full bg-white/10 h-1 rounded-full"></div>
        </motion.div>
      ))}
    </motion.div>
  );
};
export const SkeletonThree = () => {
  const [count, setCount] = useState(0);
  const target = 1950000;

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = 20;
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const bgVariants = {
    initial: { backgroundPosition: "0 50%" },
    animate: { backgroundPosition: ["0 50%", "100% 50%", "0 50%"] },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={bgVariants}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      className="flex flex-1 w-full h-full min-h-[10rem] dark:bg-dot-white/[0.1] rounded-lg bg-dot-black/[0.1] flex-col items-center justify-center space-y-2 p-4"
      style={{
        background: `linear-gradient(-45deg, ${SoftGreen}/10, #161616, #0A0A0A)`,
        backgroundSize: "400% 400%",
      }}
    >
      <IconCoins className="w-12 h-12 text-[#4ade80]" strokeWidth={1.5} />
      <motion.div className="text-4xl font-bold text-white tracking-tighter">
        {count.toLocaleString()}
      </motion.div>
      <p className="text-sm text-white/60">Eco-Coins Balance</p>
    </motion.div>
  );
};
export const SkeletonFour = () => {
  const first = { initial: { x: 20, rotate: -5 }, hover: { x: 0, rotate: 0 } };
  const second = { initial: { x: -20, rotate: 5 }, hover: { x: 0, rotate: 0 } };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.1] bg-dot-black/[0.1] flex-row space-x-2 p-4"
    >
      {/* Card 1: BEFORE */}
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <IconCamera className="h-10 w-10 text-neutral-500" />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Broken Toaster (Before)
        </p>
        <p className="border border-red-500 bg-red-900/20 text-red-400 text-xs rounded-full px-2 py-0.5 mt-4">
          DAMAGED
        </p>
      </motion.div>

      {/* Card 2: FIXED (Center) */}
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        <IconTrophy className={`h-10 w-10 text-[${SoftGreen}]`} />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Saved and fixed by John D.
        </p>
        <p
          className={`border border-[${SoftGreen}] bg-[${SoftGreen}]/20 text-[${SoftGreen}] text-xs rounded-full px-2 py-0.5 mt-4`}
        >
          FIXED +100 Coins
        </p>
      </motion.div>

      {/* Card 3: In Progress (Community) */}
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <IconUsers className="h-10 w-10 text-neutral-500" />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Need help with this circuit board.
        </p>
        <p className="border border-yellow-500 bg-yellow-900/20 text-yellow-400 text-xs rounded-full px-2 py-0.5 mt-4">
          COMMUNITY Q
        </p>
      </motion.div>
    </motion.div>
  );
};
export const SkeletonFive = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.1] bg-dot-black/[0.1] flex-col space-y-2 p-4"
    >

      {/* Map Placeholder */}
      <div
        className={`w-full h-32 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 border border-[${SoftGreen}]/50 flex items-center justify-center`}
      >
        <IconMapPin className="w-8 h-8 text-[#4ade80]" />
      </div>

      {/* List of Hubs */}
      <div className="flex flex-row items-center space-x-2 w-full p-1 bg-[#161616] rounded-md">
        <div className={`h-3 w-3 rounded-full bg-[${SoftGreen}] shrink-0`} />
        <p className="text-xs text-neutral-400">Toko Suku Cadang Elektronik</p>
      </div>
      <div className="flex flex-row items-center space-x-2 w-full p-1 bg-[#161616] rounded-md">
        <div className={`h-3 w-3 rounded-full bg-yellow-500 shrink-0`} />
        <p className="text-xs text-neutral-400">Pusat Daur Ulang A</p>
      </div>
    </motion.div>
  );
};