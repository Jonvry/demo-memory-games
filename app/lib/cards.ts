export type PlayerCount = 1 | 2;

export interface CardData {
    id: number;
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
    matchedBy?: 1 | 2;
}

export interface ThemeConfig {
    name: string;
    label: string;
    emojis: string[];
    cardBack: string; // tailwind bg class
    accent: string; // tailwind text/bg class
}

export const themes: ThemeConfig[] = [
    {
        name: "animals",
        label: "🐾 Animals",
        emojis: [
            "🐶",
            "🐱",
            "🐭",
            "🐹",
            "🐰",
            "🦊",
            "🐻",
            "🐼",
            "🐨",
            "🐯",
            "🦁",
            "🐮",
            "🐷",
            "🐸",
            "🐵",
            "🐔",
            "🐧",
            "🐦",
            "🦅",
            "🦉",
            "🐴",
            "🦄",
            "🐝",
            "🐙",
        ],
        cardBack: "bg-amber-600",
        accent: "bg-amber-500",
    },
    {
        name: "food",
        label: "🍕 Food",
        emojis: [
            "🍎",
            "🍊",
            "🍋",
            "🍇",
            "🍓",
            "🍒",
            "🍑",
            "🥝",
            "🍕",
            "🍔",
            "🌮",
            "🍣",
            "🍩",
            "🍪",
            "🎂",
            "🍫",
            "🥐",
            "🧁",
            "🍿",
            "🥤",
            "🍦",
            "🥑",
            "🌽",
            "🍉",
        ],
        cardBack: "bg-rose-500",
        accent: "bg-rose-400",
    },
    {
        name: "nature",
        label: "🌿 Nature",
        emojis: [
            "🌸",
            "🌺",
            "🌻",
            "🌷",
            "🌹",
            "🍀",
            "🌲",
            "🌴",
            "🍁",
            "🍂",
            "🌊",
            "⛰️",
            "🌈",
            "⭐",
            "🌙",
            "☀️",
            "❄️",
            "🔥",
            "💧",
            "🌍",
            "🌵",
            "🍄",
            "🌾",
            "🪻",
        ],
        cardBack: "bg-emerald-600",
        accent: "bg-emerald-500",
    },
    {
        name: "travel",
        label: "✈️ Travel",
        emojis: [
            "✈️",
            "🚗",
            "🚀",
            "🛸",
            "🚂",
            "⛵",
            "🏰",
            "🗼",
            "🗽",
            "🎡",
            "🏖️",
            "🏔️",
            "🌋",
            "🗿",
            "⛩️",
            "🕌",
            "🎪",
            "🚁",
            "🛶",
            "🏕️",
            "🚲",
            "🛵",
            "🚃",
            "🎠",
        ],
        cardBack: "bg-sky-600",
        accent: "bg-sky-500",
    },
    {
        name: "sports",
        label: "⚽ Sports",
        emojis: [
            "⚽",
            "🏀",
            "🏈",
            "⚾",
            "🎾",
            "🏐",
            "🏓",
            "🏸",
            "🥊",
            "🏋️",
            "🤸",
            "⛷️",
            "🏄",
            "🚴",
            "🏊",
            "🤾",
            "🎯",
            "🏹",
            "🥇",
            "🏆",
            "🎿",
            "⛸️",
            "🤿",
            "🧗",
        ],
        cardBack: "bg-indigo-600",
        accent: "bg-indigo-500",
    },
];

export type BoardSize = {
    cols: number;
    rows: number;
    label: string;
    totalCards: number;
};

export const boardSizes: BoardSize[] = [
    { cols: 3, rows: 2, label: "3×2 Beginner", totalCards: 6 },
    { cols: 4, rows: 3, label: "4×3 Easy", totalCards: 12 },
    { cols: 4, rows: 4, label: "4×4 Medium", totalCards: 16 },
    { cols: 5, rows: 4, label: "5×4 Hard", totalCards: 20 },
    { cols: 6, rows: 5, label: "6×5 Expert", totalCards: 30 },
    { cols: 8, rows: 6, label: "8×6 Master", totalCards: 48 },
];

export type GameMode = "classic" | "timed" | "limited";

export function shuffle<T>(array: T[]): T[] {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function generateCards(totalCards: number, theme: ThemeConfig): CardData[] {
    const pairsNeeded = totalCards / 2;
    const selected = shuffle(theme.emojis).slice(0, pairsNeeded);
    const pairs = [...selected, ...selected];
    return shuffle(pairs).map((emoji, i) => ({
        id: i,
        emoji,
        isFlipped: false,
        isMatched: false,
    }));
}
