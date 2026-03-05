import { motion } from "framer-motion";

export default function SectionTitle({ children, sub }) {
    return (
        <div className="s-title-wrap">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.7 }}
            >
                {children}
            </motion.h2>
            <motion.div
                className="title-underline"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
            {sub && (
                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    {sub}
                </motion.p>
            )}
        </div>
    );
}
