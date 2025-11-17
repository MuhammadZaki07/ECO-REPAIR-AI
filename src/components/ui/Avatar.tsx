import { useTheme } from "next-themes";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
}

export function Avatar({ src, alt = "User", size = 32 }: AvatarProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-full overflow-hidden border-2 flex items-center justify-center
        ${theme === "dark" ? "border-[#aaff00] bg-[#0a0a0a]" : "border-[#404040] bg-[#fafafa]"}
      `}
      style={{ width: size, height: size }}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span
          className={`${theme === "dark" ? "text-[#aaff00]" : "text-[#404040]"} font-bold`}
        >
          {alt[0]}
        </span>
      )}
    </div>
  );
}
