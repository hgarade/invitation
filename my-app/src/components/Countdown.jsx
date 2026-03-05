import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    WEDDING_DATE_ISO,
    COUNTDOWN_LABELS,
    COUNTUP_INTRO,
    COUNTUP_FOOTER,
} from "../constants/weddingContent";

const WEDDING_DATE = new Date(WEDDING_DATE_ISO);

function pad(n) {
    return String(n).padStart(2, "0");
}

function calcDiff(ms) {
    const abs = Math.abs(ms);
    const days = Math.floor(abs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((abs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((abs / (1000 * 60)) % 60);
    const seconds = Math.floor((abs / 1000) % 60);
    return { days, hours, minutes, seconds };
}

export default function Countdown({ onComplete }) {
    const [tick, setTick] = useState(null);
    const [isOver, setIsOver] = useState(false);
    const firedRef = useRef(false);

    useEffect(() => {
        function calc() {
            const now = new Date();
            const diff = WEDDING_DATE - now;
            if (diff <= 0) {
                if (!firedRef.current) {
                    firedRef.current = true;
                    setIsOver(true);
                    onComplete && onComplete();
                }
                setTick(calcDiff(diff));
            } else {
                setTick(calcDiff(diff));
            }
        }
        calc();
        const id = setInterval(calc, 1000);
        return () => clearInterval(id);
    }, [onComplete]);

    if (!tick) return null;

    const units = [
        { label: COUNTDOWN_LABELS.days, value: tick.days },
        { label: COUNTDOWN_LABELS.hours, value: pad(tick.hours) },
        { label: COUNTDOWN_LABELS.minutes, value: pad(tick.minutes) },
        { label: COUNTDOWN_LABELS.seconds, value: pad(tick.seconds) },
    ];

    return (
        <AnimatePresence mode="wait">
            {isOver ? (
                <motion.div
                    key="countup"
                    className="countup-wrapper"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="countup-subtitle">{COUNTUP_INTRO}</p>
                    <div className="countdown">
                        {units.map(({ label, value }) => (
                            <motion.div
                                className="countdown-unit countup-unit"
                                key={label}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <span className="countdown-number countup-number">
                                    {value}
                                </span>
                                <span className="countdown-label">{label}</span>
                            </motion.div>
                        ))}
                    </div>
                    <p className="countup-footer">{COUNTUP_FOOTER}</p>
                </motion.div>
            ) : (
                <motion.div
                    key="countdown"
                    className="countdown"
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                >
                    {units.map(({ label, value }) => (
                        <div
                            className="countdown-unit"
                            key={label}
                        >
                            <span className="countdown-number">{value}</span>
                            <span className="countdown-label">{label}</span>
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
