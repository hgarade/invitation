import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import SectionTitle from "../ui/SectionTitle";
import PreweddingVideo from "../PreweddingVideo";
import { SECTIONS } from "../../constants/weddingContent";

export default function VideoSection() {
    return (
        <AnimatedSection delay={0.1}>
            <section className="section video-section">
                <SectionTitle sub={SECTIONS.video.sub}>
                    {SECTIONS.video.title}
                </SectionTitle>
                <PreweddingVideo />
            </section>
        </AnimatedSection>
    );
}
