import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import SectionTitle from "../ui/SectionTitle";
import { SECTIONS, TIMELINE } from "../../constants/weddingContent";

export default function StorySection() {
    return (
        <AnimatedSection>
            <section className="section story-section">
                <SectionTitle sub={SECTIONS.story.sub}>
                    {SECTIONS.story.title}
                </SectionTitle>
                <div className="timeline">
                    {TIMELINE.map((item, i) => (
                        <motion.div
                            key={item.year}
                            className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <div className="timeline-connector">
                                <motion.div
                                    className="timeline-icon"
                                    whileHover={{ rotate: 360, scale: 1.15 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {item.icon}
                                </motion.div>
                            </div>
                            <div className="timeline-body">
                                <span className="timeline-year">
                                    {item.year}
                                </span>
                                <h3 className="timeline-title">{item.title}</h3>
                                <p className="timeline-desc">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </AnimatedSection>
    );
}
