import { memo, useCallback } from "react";
import type { CardData } from "../lib/cards";
import { cn } from "../lib/utils";

interface CardProps {
    card: CardData;
    index: number;
    onClick: (index: number) => void;
    cardBackClass: string;
    disabled: boolean;
    compact?: boolean;
    isFocused?: boolean;
}

export const Card = memo(function Card({
    card,
    index,
    onClick,
    cardBackClass,
    disabled,
    compact,
    isFocused,
}: CardProps) {
    const isRevealed = card.isFlipped || card.isMatched;

    const handleClick = useCallback(() => {
        onClick(index);
    }, [onClick, index]);

    return (
        <button
            onClick={handleClick}
            disabled={disabled || isRevealed}
            className={cn(
                "card-container aspect-square w-full cursor-pointer @container",
                isFocused && "card-focused",
            )}
            aria-label={isRevealed ? card.emoji : "Hidden card"}
        >
            <div className={cn("card-inner relative size-full", isRevealed && "flipped")}>
                {/* Back face */}
                <div
                    className={cn(
                        "card-face card-back flex items-center justify-center rounded-xl shadow-md",
                        cardBackClass,
                    )}
                >
                    <span
                        className={cn(
                            compact ? "text-3xl" : "text-5xl",
                            "font-bold opacity-30 select-none",
                        )}
                    >
                        ?
                    </span>
                </div>
                {/* Front face */}
                <div className="card-face card-front flex items-center justify-center rounded-xl bg-card-bg shadow-md">
                    <span className="flex h-full w-full items-center justify-center text-[50cqmin] select-none">
                        {card.emoji}
                    </span>
                </div>
            </div>
        </button>
    );
});
