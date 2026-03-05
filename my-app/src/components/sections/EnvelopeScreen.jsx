import { motion } from "framer-motion";
import { ENVELOPE_EMOJI, ENVELOPE_HINT } from "../../constants/weddingContent";

export default function EnvelopeScreen({ onOpen }) {
    return (
        <motion.div
            className="envelope-screen"
            exit={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            onClick={onOpen}
        >
            {[1, 2, 3].map((n) => (
                <motion.div
                    key={n}
                    className="env-ring"
                    animate={{ scale: [1, 1.5 + n * 0.3], opacity: [0.5, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: n * 0.5,
                    }}
                />
            ))}
            <motion.div
                className="envelope"
                animate={{
                    y: [0, -14, 0],
                    rotate: [0, -3, 3, -1, 0],
                    filter: [
                        "drop-shadow(0 8px 20px rgba(180,80,100,0.2))",
                        "drop-shadow(0 20px 40px rgba(180,80,100,0.45))",
                        "drop-shadow(0 8px 20px rgba(180,80,100,0.2))",
                    ],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                {ENVELOPE_EMOJI}
            </motion.div>
            <motion.p
                className="envelope-hint"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {ENVELOPE_HINT}
            </motion.p>
        </motion.div>
    );
}
