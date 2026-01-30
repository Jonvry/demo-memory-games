# Memory Game

A feature-rich memory matching card game built with Next.js 16, React 19, and TypeScript.

## Features

- **5 Themed Card Packs** — Animals, Food, Nature, Travel, Sports (24 emojis each)
- **6 Board Sizes** — 3x2 Beginner up to 8x6 Master (6–48 cards)
- **3 Game Modes** — Classic (no limits), Timed (beat the clock), Limited (restricted moves)
- **2 Player Modes** — Solo or turn-based 2-player with individual scoring
- **Real-Time Stats** — Move counter, timer, progress bar, difficulty badge
- **Win/Loss/Tie Detection** — Different end screens for solo and multiplayer
- **Responsive Design** — Mobile-first layout that adapts to any screen size

## Tech Stack

| Technology                                   | Version | Purpose                      |
| -------------------------------------------- | ------- | ---------------------------- |
| [Next.js](https://nextjs.org)                | 16      | App Router framework         |
| [React](https://react.dev)                   | 19      | UI library                   |
| [TypeScript](https://www.typescriptlang.org) | 5       | Type safety (strict mode)    |
| [Tailwind CSS](https://tailwindcss.com)      | 4       | Styling with `@theme inline` |
| [pnpm](https://pnpm.io)                      | —       | Package manager              |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Install & Run

```bash
git clone https://github.com/Jonvry/demo-memory-games.git
cd demo-memory-games
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

### Other Commands

```bash
pnpm build    # Production build
pnpm start    # Serve production build
pnpm lint     # Run ESLint
```

## Project Structure

```
app/
├── components/
│   ├── game-menu.tsx         # Main menu with setup options
│   ├── game-board.tsx        # Core game engine and logic
│   ├── game-header.tsx       # In-game stats, controls, difficulty badge
│   ├── game-over-modal.tsx   # End-game results screen
│   └── card.tsx              # Individual card with 3D flip animation
├── lib/
│   ├── cards.ts              # Themes, board sizes, types, card generation
│   └── utils.ts              # cn() class helper, formatTime()
├── globals.css               # Theme variables (OKLch), animations
├── layout.tsx                # Root layout, fonts, metadata
├── page.tsx                  # Entry point (renders GameMenu)
├── robots.ts                 # SEO robots config
└── sitemap.ts                # Sitemap config
```

## Game Modes

| Mode    | Description            | Limits                  |
| ------- | ---------------------- | ----------------------- |
| Classic | Pure memory challenge  | None                    |
| Timed   | Race against the clock | 30s (3x2) to 300s (8x6) |
| Limited | Restricted move count  | 10 (3x2) to 140 (8x6)   |

## Board Sizes

| Size | Difficulty | Cards | Pairs |
| ---- | ---------- | ----- | ----- |
| 3x2  | Beginner   | 6     | 3     |
| 4x3  | Easy       | 12    | 6     |
| 4x4  | Medium     | 16    | 8     |
| 5x4  | Hard       | 20    | 10    |
| 6x5  | Expert     | 30    | 15    |
| 8x6  | Master     | 48    | 24    |
