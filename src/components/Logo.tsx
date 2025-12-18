import { useState } from "react";
import LOGO_ECO_REPAIR_AI from "@/assets/svg/Logo.svg";
import type { LogoProps } from "@/types/logo";

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
  const lightSrc = variant === "full" ? LOGO_ECO_REPAIR_AI : LOGO_ECO_REPAIR_AI;
  const darkSrc = variant === "full" ? LOGO_ECO_REPAIR_AI : LOGO_ECO_REPAIR_AI;
  return (
    <picture>
      <source srcSet={darkSrc} media="(prefers-color-scheme: dark)" />
      <img
        src={error ? LOGO_ECO_REPAIR_AI : lightSrc}
        alt="Eco Repair"
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
