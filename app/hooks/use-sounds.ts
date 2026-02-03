import { useState, useCallback, useRef, useSyncExternalStore } from "react";

const STORAGE_KEY = "memory-game-muted";

function getMutedFromStorage(): boolean {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "true";
}

function subscribeMuted(callback: () => void) {
    const handler = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY) callback();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
}

export function useSounds() {
    const muted = useSyncExternalStore(subscribeMuted, getMutedFromStorage, () => false);
    const [, forceUpdate] = useState(0);
    const audioContextRef = useRef<AudioContext | null>(null);

    const getAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
        }
        return audioContextRef.current;
    }, []);

    const playTone = useCallback(
        (frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.3) => {
            if (muted) return;
            try {
                const ctx = getAudioContext();
                const oscillator = ctx.createOscillator();
                const gainNode = ctx.createGain();

                oscillator.type = type;
                oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
                oscillator.connect(gainNode);
                gainNode.connect(ctx.destination);

                gainNode.gain.setValueAtTime(volume, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

                oscillator.start();
                oscillator.stop(ctx.currentTime + duration / 1000);
            } catch {
                // Audio not supported or blocked
            }
        },
        [muted, getAudioContext],
    );

    const playFlip = useCallback(() => {
        if (muted) return;
        try {
            const ctx = getAudioContext();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(800, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

            oscillator.start();
            oscillator.stop(ctx.currentTime + 0.05);
        } catch {
            // Audio not supported
        }
    }, [muted, getAudioContext]);

    const playMatch = useCallback(() => {
        if (muted) return;
        // Rising arpeggio - happy sound
        const notes = [523, 659, 784]; // C5, E5, G5
        notes.forEach((freq, i) => {
            setTimeout(() => playTone(freq, 100, "sine", 0.2), i * 60);
        });
    }, [muted, playTone]);

    const playMismatch = useCallback(() => {
        if (muted) return;
        // Low buzz
        playTone(150, 150, "sawtooth", 0.15);
    }, [muted, playTone]);

    const playWin = useCallback(() => {
        if (muted) return;
        // Victory fanfare - ascending major scale snippet
        const notes = [523, 587, 659, 784, 880, 1047]; // C5 to C6
        notes.forEach((freq, i) => {
            setTimeout(() => playTone(freq, 120, "sine", 0.25), i * 80);
        });
    }, [muted, playTone]);

    const playLose = useCallback(() => {
        if (muted) return;
        // Descending sad tone
        const notes = [400, 350, 300, 250];
        notes.forEach((freq, i) => {
            setTimeout(() => playTone(freq, 100, "sine", 0.2), i * 75);
        });
    }, [muted, playTone]);

    const toggleMute = useCallback(() => {
        const newValue = !getMutedFromStorage();
        localStorage.setItem(STORAGE_KEY, String(newValue));
        forceUpdate((n) => n + 1);
    }, []);

    return {
        muted,
        toggleMute,
        playFlip,
        playMatch,
        playMismatch,
        playWin,
        playLose,
    };
}
