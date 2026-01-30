import { useState, useEffect, useCallback, useRef } from "react";
import { GameHeader } from "./game-header";
import { GameOverModal } from "./game-over-modal";
import {
    type CardData,
    type BoardSize,
    type ThemeConfig,
    type GameMode,
    type PlayerCount,
    generateCards,
} from "../lib/cards";
import { Card } from "./card";

interface GameBoardProps {
    boardSize: BoardSize;
    theme: ThemeConfig;
    gameMode: GameMode;
    playerCount: PlayerCount;
    onBack: () => void;
}

const MOVE_LIMITS: Record<string, number> = {
    "6": 10,
    "12": 24,
    "16": 36,
    "20": 50,
    "30": 80,
    "48": 140,
};

const TIME_LIMITS: Record<string, number> = {
    "6": 30,
    "12": 60,
    "16": 90,
    "20": 120,
    "30": 180,
    "48": 300,
};

export function GameBoard({ boardSize, theme, gameMode, playerCount, onBack }: GameBoardProps) {
    const [cards, setCards] = useState<CardData[]>(() =>
        generateCards(boardSize.totalCards, theme),
    );
    const [flipped, setFlipped] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [locked, setLocked] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const totalPairs = boardSize.totalCards / 2;
    const matchedPairs = cards.filter((c) => c.isMatched).length / 2;
    const player1Pairs = cards.filter((c) => c.matchedBy === 1).length / 2;
    const player2Pairs = cards.filter((c) => c.matchedBy === 2).length / 2;
    const moveLimit = MOVE_LIMITS[String(boardSize.totalCards)];
    const timeLimit = TIME_LIMITS[String(boardSize.totalCards)];

    // Timer
    useEffect(() => {
        if (isRunning && !gameOver) {
            timerRef.current = setInterval(() => {
                setTime((t) => t + 1);
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRunning, gameOver]);

    // Derive game-over state during render instead of via effects
    const isWin = matchedPairs === totalPairs && totalPairs > 0;
    const isTimedLoss = gameMode === "timed" && time >= timeLimit;
    const isLimitedLoss = gameMode === "limited" && moves >= moveLimit && matchedPairs < totalPairs;
    const shouldEnd = !gameOver && (isWin || isTimedLoss || isLimitedLoss);

    if (shouldEnd) {
        setGameOver(true);
        setWon(isWin);
        setIsRunning(false);
    }

    const handleCardClick = useCallback(
        (index: number) => {
            if (locked || gameOver) return;
            if (cards[index].isFlipped || cards[index].isMatched) return;

            if (!isRunning) setIsRunning(true);

            const newCards = [...cards];
            newCards[index] = { ...newCards[index], isFlipped: true };
            const newFlipped = [...flipped, index];
            setCards(newCards);
            setFlipped(newFlipped);

            if (newFlipped.length === 2) {
                setMoves((m) => m + 1);
                setLocked(true);

                const [first, second] = newFlipped;
                if (newCards[first].emoji === newCards[second].emoji) {
                    // Match — tag with current player, keep turn
                    setTimeout(() => {
                        setCards((prev) =>
                            prev.map((c, i) =>
                                i === first || i === second
                                    ? {
                                          ...c,
                                          isMatched: true,
                                          isFlipped: false,
                                          matchedBy: currentPlayer,
                                      }
                                    : c,
                            ),
                        );
                        setFlipped([]);
                        setLocked(false);
                    }, 400);
                } else {
                    // No match — switch player in 2-player mode
                    setTimeout(() => {
                        setCards((prev) =>
                            prev.map((c, i) =>
                                i === first || i === second ? { ...c, isFlipped: false } : c,
                            ),
                        );
                        setFlipped([]);
                        setLocked(false);
                        if (playerCount === 2) {
                            setCurrentPlayer((p) => (p === 1 ? 2 : 1));
                        }
                    }, 800);
                }
            }
        },
        [cards, flipped, locked, gameOver, isRunning, currentPlayer, playerCount],
    );

    const restart = useCallback(() => {
        setCards(generateCards(boardSize.totalCards, theme));
        setFlipped([]);
        setMoves(0);
        setTime(0);
        setIsRunning(false);
        setGameOver(false);
        setWon(false);
        setLocked(false);
        setCurrentPlayer(1);
    }, [boardSize, theme]);

    return (
        <main className="w-full min-h-dvh px-4 py-8 font-sans max-w-lg flex mx-auto flex-col">
            <GameHeader
                moves={moves}
                time={time}
                matchedPairs={matchedPairs}
                totalPairs={totalPairs}
                onRestart={restart}
                onBack={onBack}
                gameMode={gameMode}
                moveLimit={gameMode === "limited" ? moveLimit : undefined}
                timeLimit={gameMode === "timed" ? timeLimit : undefined}
                playerCount={playerCount}
                currentPlayer={currentPlayer}
                player1Pairs={player1Pairs}
                player2Pairs={player2Pairs}
                difficulty={boardSize.label.replace(/^\S+\s*/, "")}
            />

            <div
                className="grid w-full gap-2 sm:gap-3"
                style={{
                    gridTemplateColumns: `repeat(${boardSize.cols}, 1fr)`,
                    aspectRatio: `${boardSize.cols} / ${boardSize.rows}`,
                }}
            >
                {cards.map((card, i) => (
                    <Card
                        key={card.id}
                        card={card}
                        index={i}
                        onClick={handleCardClick}
                        cardBackClass={theme.cardBack}
                        disabled={locked || gameOver}
                        compact={boardSize.totalCards === 48}
                    />
                ))}
            </div>

            {gameOver && (
                <GameOverModal
                    won={won}
                    moves={moves}
                    time={time}
                    onRestart={restart}
                    onBack={onBack}
                    playerCount={playerCount}
                    player1Pairs={player1Pairs}
                    player2Pairs={player2Pairs}
                />
            )}
        </main>
    );
}
