import type { PlayerCount } from "../lib/cards";
import { cn, formatTime } from "../lib/utils";

interface GameHeaderProps {
    moves: number;
    time: number;
    matchedPairs: number;
    totalPairs: number;
    onRestart: () => void;
    onBack: () => void;
    gameMode: string;
    moveLimit?: number;
    timeLimit?: number;
    playerCount: PlayerCount;
    currentPlayer: 1 | 2;
    player1Pairs: number;
    player2Pairs: number;
    difficulty: string;
}

export function GameHeader({
    moves,
    time,
    matchedPairs,
    totalPairs,
    onRestart,
    onBack,
    gameMode,
    moveLimit,
    timeLimit,
    playerCount,
    currentPlayer,
    player1Pairs,
    player2Pairs,
    difficulty,
}: GameHeaderProps) {
    const progress = totalPairs > 0 ? (matchedPairs / totalPairs) * 100 : 0;

    return (
        <div className="mb-4 w-full space-y-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="rounded-lg bg-ring px-3 py-1.5 text-sm font-medium text-body flex gap-1 items-center transition hover:bg-ring-hover"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                    >
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                    Back
                </button>
                <button
                    onClick={onRestart}
                    className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
                >
                    Restart
                </button>
            </div>

            {/* 2-player scoreboard */}
            {playerCount === 2 && (
                <div className="flex gap-2">
                    <div
                        className={cn(
                            "flex-1 rounded-lg border-2 px-3 py-2 text-center text-sm font-semibold transition",
                            currentPlayer === 1
                                ? "border-p1 bg-p1-light text-p1-fg"
                                : "border-ring bg-card-bg text-muted",
                        )}
                    >
                        Player 1: {player1Pairs} pairs
                    </div>
                    <div
                        className={cn(
                            "flex-1 rounded-lg border-2 px-3 py-2 text-center text-sm font-semibold transition",
                            currentPlayer === 2
                                ? "border-p2 bg-p2-light text-p2-fg"
                                : "border-ring bg-card-bg text-muted",
                        )}
                    >
                        Player 2: {player2Pairs} pairs
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between text-sm font-medium text-body">
                <div className="flex items-center gap-4">
                    <span className="rounded-full bg-ring px-2.5 py-0.5 text-xs font-semibold text-muted-fg">
                        {difficulty}
                    </span>
                    <span>
                        Moves: {moves}
                        {gameMode === "limited" && moveLimit ? ` / ${moveLimit}` : ""}
                    </span>
                    <span>
                        Time: {formatTime(time)}
                        {gameMode === "timed" && timeLimit ? ` / ${formatTime(timeLimit)}` : ""}
                    </span>
                </div>
                <span>
                    {matchedPairs} / {totalPairs} pairs
                </span>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-ring">
                <div
                    className="progress-bar h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
