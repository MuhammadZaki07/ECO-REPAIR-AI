import { useState } from "react";

interface LogoProps {
  size?: number;
  height?: number;
  width?: number;
  className?: string;
  variant?: "mark" | "full";
}

const Logo = ({
  size,
  height,
  width,
  className = "",
  variant = "mark",
}: LogoProps) => {
  const [error, setError] = useState(false);
  const handleError = () => setError(true);
  const computedWidth = width ?? size ?? 40;
  const computedHeight = height ?? size ?? 40;

  const lightSrc =
    variant === "full" ? "/vite.svg" : "/vite.svg";
  const darkSrc = variant === "full" ? "/vite.svg" : "/vite.svg";
  return (
    <picture>
      <source srcSet={darkSrc} media="(prefers-color-scheme: dark)" />
      <img
        src={error ? "/vite.svg" : lightSrc}
        alt="Eco Repair Logo"
        height={computedHeight}
        width={computedWidth}
        onError={handleError}
        onClick={(e) => e.preventDefault()}
        draggable="false"
        className={`object-contain select-none z-10 w-full dark:block ${className}`}
      />
    </picture>
  );
};

export default Logo;
