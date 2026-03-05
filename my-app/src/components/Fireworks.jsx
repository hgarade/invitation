import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COUPLE_HASHTAG } from "../constants/weddingContent";

// Colour palette matching dark-romance theme
const COLOURS = [
    "#c9a84c", // gold
    "#e8d5a3", // gold-light
    "#fff8e7", // ivory
    "#f0a0c0", // blush pink
    "#ff6b9d", // rose
    "#7d3354", // deep-rose
    "#ffffff", // white
    "#ffccdd", // light pink
];

const SHAPES = ["circle", "heart", "star"];

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function createParticle(x, y) {
    const angle = randomBetween(0, Math.PI * 2);
    const speed = randomBetween(2, 9);
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - randomBetween(1, 4),
        alpha: 1,
        size: randomBetween(4, 10),
        colour: COLOURS[Math.floor(Math.random() * COLOURS.length)],
        shape,
        rotation: randomBetween(0, Math.PI * 2),
        rotSpeed: randomBetween(-0.15, 0.15),
        gravity: randomBetween(0.12, 0.22),
        decay: randomBetween(0.012, 0.022),
    };
}

function createBurst(x, y, count = 45) {
    return Array.from({ length: count }, () => createParticle(x, y));
}

const MAX_PARTICLES = 350;
const BURST_COUNT = 40; // particles per burst
const BURST_INTERVAL_MS = 600; // ms between bursts (steady rhythm)
const TARGET_FPS = 40; // throttle rAF — looks great, saves ~33% CPU
const FRAME_MS = 1000 / TARGET_FPS;

function drawHeart(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    const s = size * 0.5;
    ctx.moveTo(0, s * 0.4);
    ctx.bezierCurveTo(-s, -s * 0.4, -s * 2, s * 0.4, 0, s * 1.5);
    ctx.bezierCurveTo(s * 2, s * 0.4, s, -s * 0.4, 0, s * 0.4);
    ctx.fill();
    ctx.restore();
}

function drawStar(ctx, x, y, size) {
    const spikes = 5;
    const outer = size;
    const inner = size * 0.4;
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outer : inner;
        const angle = (Math.PI / spikes) * i - Math.PI / 2;
        i === 0
            ? ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
            : ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

export default function Fireworks({ active }) {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const rafRef = useRef(null);
    const launchTimerRef = useRef(null);

    useEffect(() => {
        if (!active) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        // Schedule bursts continuously — only add when below the cap
        function scheduleBurst() {
            if (particlesRef.current.length < MAX_PARTICLES) {
                const x = randomBetween(canvas.width * 0.1, canvas.width * 0.9);
                const y = randomBetween(
                    canvas.height * 0.05,
                    canvas.height * 0.5,
                );
                particlesRef.current.push(...createBurst(x, y, BURST_COUNT));
            }
            launchTimerRef.current = setTimeout(
                scheduleBurst,
                BURST_INTERVAL_MS,
            );
        }

        // Opening triple burst for drama
        const cx = canvas.width / 2;
        const cy = canvas.height * 0.3;
        particlesRef.current.push(...createBurst(cx, cy, 50));
        particlesRef.current.push(...createBurst(cx - 140, cy + 40, 25));
        particlesRef.current.push(...createBurst(cx + 140, cy + 40, 25));
        launchTimerRef.current = setTimeout(scheduleBurst, BURST_INTERVAL_MS);

        // rAF throttled to TARGET_FPS — continuous loop
        let lastFrameTime = 0;

        function animate(timestamp) {
            rafRef.current = requestAnimationFrame(animate);

            // Skip frame if not enough time has passed
            if (timestamp - lastFrameTime < FRAME_MS) return;
            lastFrameTime = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesRef.current = particlesRef.current.filter(
                (p) => p.alpha > 0.01,
            );

            // Batch by shape to reduce ctx state changes
            const circles = [];
            const hearts = [];
            const stars = [];
            for (const p of particlesRef.current) {
                if (p.shape === "heart") hearts.push(p);
                else if (p.shape === "star") stars.push(p);
                else circles.push(p);

                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.vx *= 0.98;
                p.alpha -= p.decay;
                p.rotation += p.rotSpeed;
            }

            // Draw circles (no shadowBlur — cheap)
            for (const p of circles) {
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.colour;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw hearts & stars with shadowBlur (fewer of them, worth the cost)
            ctx.shadowBlur = 6;
            for (const p of hearts) {
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.colour;
                ctx.shadowColor = p.colour;
                drawHeart(ctx, p.x, p.y, p.size);
            }
            for (const p of stars) {
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.colour;
                ctx.shadowColor = p.colour;
                drawStar(ctx, p.x, p.y, p.size);
            }
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
        }
        animate(0);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(rafRef.current);
            clearTimeout(launchTimerRef.current);
            particlesRef.current = [];
        };
    }, [active]);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    className="fireworks-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    aria-hidden="true"
                >
                    <canvas
                        ref={canvasRef}
                        className="fireworks-canvas"
                    />
                    <motion.div
                        className="fireworks-banner"
                        initial={{ scale: 0.5, opacity: 0, y: -30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.7,
                            type: "spring",
                            bounce: 0.4,
                        }}
                    >
                        <span className="fireworks-banner-emoji">🎊</span>
                        <span className="fireworks-banner-text">
                            {COUPLE_HASHTAG}
                        </span>
                        <span className="fireworks-banner-emoji">🎊</span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
