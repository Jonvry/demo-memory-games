import type { PlayerCount } from "../lib/cards";
import { formatTime } from "../lib/utils";

interface GameOverModalProps {
    won: boolean;
    moves: number;
    time: number;
    onRestart: () => void;
    onBack: () => void;
    playerCount: PlayerCount;
    player1Pairs: number;
    player2Pairs: number;
}

export function GameOverModal({
    won,
    moves,
    time,
    onRestart,
    onBack,
    playerCount,
    player1Pairs,
    player2Pairs,
}: GameOverModalProps) {
    const isTwoPlayer = playerCount === 2;
    const isTie = player1Pairs === player2Pairs;
    const winner = player1Pairs > player2Pairs ? 1 : 2;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-sm rounded-2xl bg-card-bg p-8 text-center shadow-2xl">
                {isTwoPlayer ? (
                    <>
                        <div className="mb-4 text-5xl">{isTie ? "🤝" : "🏆"}</div>
                        <h2 className="mb-2 text-2xl font-bold text-foreground">
                            {isTie ? "It's a Tie!" : `Player ${winner} Wins!`}
                        </h2>
                        <div className="mb-6 space-y-1 text-body">
                            <p>
                                <span className="font-semibold text-p1">Player 1:</span>&nbsp;
                                {player1Pairs} pairs
                            </p>
                            <p>
                                <span className="font-semibold text-p2">Player 2:</span>&nbsp;
                                {player2Pairs} pairs
                            </p>
                            <p className="mt-2 text-sm text-muted-fg">
                                {moves} moves in {formatTime(time)}
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mb-4 text-5xl">{won ? "🎉" : "😔"}</div>
                        <h2 className="mb-2 text-2xl font-bold text-foreground">
                            {won ? "You Won!" : "Game Over"}
                        </h2>
                        {won ? (
                            <p className="mb-6 text-body">
                                Completed in <strong>{moves}</strong> moves and&nbsp;
                                <strong>{formatTime(time)}</strong>
                            </p>
                        ) : (
                            <p className="mb-6 text-body">
                                Better luck next time! You made <strong>{moves}</strong> moves
                                in&nbsp;
                                <strong>{formatTime(time)}</strong>
                            </p>
                        )}
                    </>
                )}
                <div className="flex gap-3">
                    <button
                        onClick={onBack}
                        className="flex-1 rounded-lg bg-ring px-4 py-2.5 font-semibold text-body transition hover:bg-ring-hover"
                    >
                        Menu
                    </button>
                    <button
                        onClick={onRestart}
                        className="flex-1 rounded-lg bg-primary px-4 py-2.5 font-semibold text-white transition hover:bg-primary-hover"
                    >
                        Play Again
                    </button>
                </div>
            </div>
        </div>
    );
}
