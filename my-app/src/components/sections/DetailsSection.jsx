import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import SectionTitle from "../ui/SectionTitle";
import {
    SECTIONS,
    DETAIL_CARDS,
    DETAIL_QR_LABEL,
    DETAIL_MAP_TITLE,
} from "../../constants/weddingContent";
import weddingQR from "../../assets/Marriage-1024.jpeg";
import receptionQR from "../../assets/Reception-1024.jpeg";

const QR_IMAGES = [weddingQR, receptionQR];

export default function DetailsSection() {
    return (
        <AnimatedSection>
            <section className="section details-section">
                <SectionTitle sub={SECTIONS.details.sub}>
                    {SECTIONS.details.title}
                </SectionTitle>
                <div className="details-cards">
                    {DETAIL_CARDS.map((card, i) => (
                        <motion.div
                            key={card.title}
                            className="detail-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            whileHover={{
                                y: -8,
                                boxShadow: "0 20px 50px rgba(155,79,110,0.2)",
                            }}
                        >
                            <motion.div
                                className="detail-card-icon"
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    delay: i,
                                }}
                            >
                                {card.icon}
                            </motion.div>
                            <h3>{card.title}</h3>
                            {card.lines.map((l) => (
                                <p key={l}>{l}</p>
                            ))}
                            <a
                                href={card.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="detail-card-qr-link"
                                title={DETAIL_MAP_TITLE}
                            >
                                <img
                                    src={QR_IMAGES[i]}
                                    alt={`${card.title} location QR code`}
                                    className="detail-card-qr"
                                />
                                <span className="detail-card-qr-label">
                                    {DETAIL_QR_LABEL}
                                </span>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </section>
        </AnimatedSection>
    );
}
