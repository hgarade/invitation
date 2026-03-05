import { motion } from "framer-motion";
import {
    LOVE_QUOTE_TEXT,
    LOVE_QUOTE_AUTHOR,
} from "../../constants/weddingContent";

export default function QuoteSection() {
    return (
        <motion.section
            className="quote-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className="quote-marks left-mark"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7 }}
            >
                "
            </motion.div>
            <blockquote className="love-quote">
                {LOVE_QUOTE_TEXT.split("\n").map((line, i, arr) => (
                    <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                    </span>
                ))}
                <cite>{LOVE_QUOTE_AUTHOR}</cite>
            </blockquote>
            <motion.div
                className="quote-marks right-mark"
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7 }}
            >
                "
            </motion.div>
        </motion.section>
    );
}
