function ZigZagLine({ delay, className }: any) {
  return (
    <svg
      className={className + " h-8 overflow-visible"}
      viewBox="0 0 200 40"
      fill="none"
    >
      <defs>
        <linearGradient id={"grad-" + delay} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,180,60,0.9)" />
          <stop offset="40%" stopColor="rgba(255,200,80,0.5)" />
          <stop offset="100%" stopColor="rgba(255,200,80,0)" />
        </linearGradient>
      </defs>

      <path
        d="
          M 0 20
          C 25 5,   45 5,   70 20
          S 115 35, 140 20
          S 185 5,  200 20
        "
        stroke={`url(#grad-${delay})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-strokeFlow"
        style={{ animationDelay: delay }}
      />
    </svg>
  );
}

export default ZigZagLine;
