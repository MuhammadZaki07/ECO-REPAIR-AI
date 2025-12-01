export interface UserMeta {
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    picture?: string;
    full_name?: string;
    name?: string;
  };
}

const COLORS = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
];

function generateColorFromString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
}

export function getUserAvatar(user?: UserMeta | null) {
  if (!user) {
    return {
      avatarUrl: null,
      fullName: "",
      initial: "",
      bgColor: generateColorFromString("U"),
    };
  }

  const metadata = user.user_metadata || {};

  const avatarUrl =
    metadata.picture ||
    metadata.avatar_url ||
    null;

  const fullName =
    metadata.full_name ||
    metadata.name ||
    user.email ||
    "User";

  const initial = fullName.charAt(0).toUpperCase();
  const bgColor = generateColorFromString(fullName);

  return {
    avatarUrl,
    fullName,
    initial,
    bgColor,
  };
}
