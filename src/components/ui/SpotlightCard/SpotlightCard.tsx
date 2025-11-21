import { useRef, useState } from "react";
import { FlickeringGrid } from "../flickering-grid";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(0.6)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-3xl border border-neutral-500/40 
          dark:bg-neutral-900 bg-neutral-100 overflow-hidden
          flex items-center justify-center  /* >>> FIX */
          ${className}`}
    >
      {/* <FlickeringGrid
        className="absolute inset-0 w-full h-full z-0"
        squareSize={3}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.3}
        flickerChance={0.1}
      /> */}

      <div className="relative z-20 w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
