import { motion } from "framer-motion";
import {
    GROOM_NAME,
    BRIDE_NAME,
    COUPLE_HASHTAG,
    WEDDING_DATE_LONG,
} from "../../constants/weddingContent";

export default function FooterSection() {
    return (
        <footer className="footer">
            <motion.div
                className="footer-inner"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1 }}
            >
                <div className="footer-monogram">{COUPLE_HASHTAG}</div>
                <p className="footer-names">
                    {GROOM_NAME} &amp; {BRIDE_NAME}
                </p>
                <p className="footer-date">{WEDDING_DATE_LONG}</p>
                <div
                    className="footer-hearts"
                    aria-hidden="true"
                >
                    {["♥", "♥", "♥"].map((h, i) => (
                        <motion.span
                            key={i}
                            animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.4,
                            }}
                        >
                            {h}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </footer>
    );
}
