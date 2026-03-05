import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    GROOM_NAME,
    BRIDE_NAME,
    HERO_BG_URL,
    HERO_PRELUDE,
    HERO_INVITE_LINE,
    WEDDING_DAY_LABEL,
    WEDDING_DATE_DAY,
    WEDDING_DATE_MONTH_YEAR,
} from "../../constants/weddingContent";

export default function HeroSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <section
            className="hero"
            ref={ref}
        >
            <motion.div
                className="hero-bg"
                style={{ backgroundImage: `url(${HERO_BG_URL})`, y }}
            />
            <div className="hero-overlay" />

            {/* Bokeh circles */}
            <div
                className="bokeh-container"
                aria-hidden="true"
            >
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="bokeh"
                        style={{
                            left: `${10 + i * 9}%`,
                            top: `${15 + (i % 3) * 25}%`,
                            width: `${30 + (i % 4) * 20}px`,
                            height: `${30 + (i % 4) * 20}px`,
                        }}
                        animate={{
                            opacity: [0.1, 0.35, 0.1],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.4,
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="hero-content"
                style={{ opacity }}
            >
                <motion.p
                    className="hero-prelude"
                    initial={{ opacity: 0, letterSpacing: "0.05em" }}
                    animate={{ opacity: 1, letterSpacing: "0.28em" }}
                    transition={{ duration: 1.6, delay: 0.3 }}
                >
                    {HERO_PRELUDE}
                </motion.p>

                <div className="hero-names">
                    {GROOM_NAME.split("").map((char, i) => (
                        <motion.span
                            key={`g-${i}`}
                            className="hero-name-char"
                            initial={{ opacity: 0, y: 40, rotateX: 90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.5 + i * 0.07,
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    <motion.span
                        className="hero-ampersand"
                        initial={{ scale: 0, opacity: 0, rotate: -20 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            delay: 1.2,
                        }}
                    >
                        &amp;
                    </motion.span>
                    {BRIDE_NAME.split("").map((char, i) => (
                        <motion.span
                            key={`b-${i}`}
                            className="hero-name-char"
                            initial={{ opacity: 0, y: -40, rotateX: -90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 1.3 + i * 0.065,
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>

                <motion.div
                    className="hero-invite-line"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    transition={{ duration: 1.2, delay: 2 }}
                >
                    {HERO_INVITE_LINE}
                </motion.div>

                <motion.div
                    className="hero-date-badge"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 80, delay: 2.4 }}
                >
                    <span className="hero-date-top">{WEDDING_DAY_LABEL}</span>
                    <span className="hero-date-num">{WEDDING_DATE_DAY}</span>
                    <span className="hero-date-bottom">
                        {WEDDING_DATE_MONTH_YEAR}
                    </span>
                </motion.div>
            </motion.div>

            <motion.div
                className="hero-scroll-hint"
                animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <span className="scroll-line" />
                <span className="scroll-dot" />
            </motion.div>
        </section>
    );
}
