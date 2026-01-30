"use client";

import { useState } from "react";
import { GameBoard } from "./game-board";
import {
    themes,
    boardSizes,
    type ThemeConfig,
    type BoardSize,
    type GameMode,
    type PlayerCount,
} from "../lib/cards";
import { cn } from "../lib/utils";

const playerOptions = [
    { key: 1 as PlayerCount, label: "Solo", desc: "Single player" },
    { key: 2 as PlayerCount, label: "2 Players", desc: "Take turns" },
] as const;

const gameModes = [
    { key: "classic", label: "Classic", desc: "No limits" },
    { key: "timed", label: "Timed", desc: "Beat the clock" },
    { key: "limited", label: "Limited", desc: "Limited moves" },
] as const;

export function GameMenu() {
    const [playing, setPlaying] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState<ThemeConfig | null>(null);
    const [selectedSize, setSelectedSize] = useState<BoardSize | null>(null);
    const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
    const [selectedPlayers, setSelectedPlayers] = useState<PlayerCount | null>(null);

    const canPlay =
        selectedTheme !== null &&
        selectedSize !== null &&
        selectedMode !== null &&
        selectedPlayers !== null;

    const missingSteps = [
        !selectedPlayers && "players",
        !selectedTheme && "a theme",
        !selectedSize && "a board size",
        !selectedMode && "a game mode",
    ].filter(Boolean);

    if (playing && canPlay) {
        return (
            <GameBoard
                boardSize={selectedSize}
                theme={selectedTheme}
                gameMode={selectedMode}
                playerCount={selectedPlayers}
                onBack={() => setPlaying(false)}
            />
        );
    }

    return (
        <main className="w-full min-h-dvh px-4 py-8 font-sans max-w-lg flex mx-auto flex-col gap-5">
            <header className="text-center">
                <h1 className="text-4xl font-bold text-foreground">Memory Game</h1>
                <p className="mt-1 text-muted">Flip cards and find all matching pairs</p>
            </header>

            {/* Players */}
            <section className="space-y-1.5">
                <h2 className="text-sm font-semibold text-muted uppercase tracking-wide">
                    Players
                </h2>
                <div className="grid grid-cols-2 gap-2">
                    {playerOptions.map((p) => (
                        <button
                            key={p.key}
                            onClick={() => setSelectedPlayers(p.key)}
                            className={cn(
                                "rounded-xl border-2 px-3 py-3 text-center transition",
                                selectedPlayers === p.key
                                    ? "border-primary bg-primary-light"
                                    : "border-ring bg-card-bg hover:border-ring-hover",
                            )}
                        >
                            <div
                                className={cn(
                                    "text-sm font-semibold",
                                    selectedPlayers === p.key ? "text-primary-fg" : "text-body",
                                )}
                            >
                                {p.label}
                            </div>
                            <div className="mt-0.5 text-xs text-muted-fg">{p.desc}</div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Theme picker */}
            <section className="space-y-1.5">
                <h2 className="text-sm font-semibold text-muted uppercase tracking-wide">Theme</h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {themes.map((t) => (
                        <button
                            key={t.name}
                            onClick={() => setSelectedTheme(t)}
                            className={cn(
                                "rounded-xl border-2 px-4 py-3 text-sm font-medium transition",
                                selectedTheme?.name === t.name
                                    ? "border-primary bg-primary-light text-primary-fg"
                                    : "border-ring bg-card-bg text-body hover:border-ring-hover",
                            )}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Board size */}
            <section className="space-y-1.5">
                <h2 className="text-sm font-semibold text-muted uppercase tracking-wide">
                    Board Size
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {boardSizes.map((b) => (
                        <button
                            key={b.label}
                            onClick={() => setSelectedSize(b)}
                            className={cn(
                                "rounded-xl border-2 px-4 py-3 text-sm font-medium transition",
                                selectedSize?.label === b.label
                                    ? "border-primary bg-primary-light text-primary-fg"
                                    : "border-ring bg-card-bg text-body hover:border-ring-hover",
                            )}
                        >
                            {b.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Game mode */}
            <section className="space-y-1.5">
                <h2 className="text-sm font-semibold text-muted uppercase tracking-wide">
                    Game Mode
                </h2>
                <div className="grid grid-cols-3 gap-2">
                    {gameModes.map((m) => (
                        <button
                            key={m.key}
                            onClick={() => setSelectedMode(m.key)}
                            className={cn(
                                "rounded-xl border-2 px-3 py-3 text-center transition",
                                selectedMode === m.key
                                    ? "border-primary bg-primary-light"
                                    : "border-ring bg-card-bg hover:border-ring-hover",
                            )}
                        >
                            <div
                                className={cn(
                                    "text-sm font-semibold",
                                    selectedMode === m.key ? "text-primary-fg" : "text-body",
                                )}
                            >
                                {m.label}
                            </div>
                            <div className="mt-0.5 text-xs text-muted-fg">{m.desc}</div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Play button */}
            <div className="space-y-2 mt-2">
                <button
                    onClick={() => setPlaying(true)}
                    disabled={!canPlay}
                    className={cn(
                        "w-full rounded-xl py-3.5 text-lg font-bold text-white shadow-lg transition",
                        canPlay
                            ? "bg-primary hover:bg-primary-hover hover:shadow-xl active:scale-[0.98]"
                            : "cursor-not-allowed bg-disabled shadow-none",
                    )}
                >
                    Play Game
                </button>
                {!canPlay && (
                    <p className="text-center text-sm text-muted-fg">
                        Select {missingSteps.join(", ")} to start
                    </p>
                )}
            </div>
        </main>
    );
}
