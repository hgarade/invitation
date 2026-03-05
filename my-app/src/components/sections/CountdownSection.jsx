import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import SectionTitle from "../ui/SectionTitle";
import Countdown from "../Countdown";
import {
    SECTIONS,
    CELEBRATING_TITLE,
    CELEBRATING_SUB,
} from "../../constants/weddingContent";

export default function CountdownSection({ isCelebrating, onComplete }) {
    return (
        <AnimatedSection>
            <section className="section countdown-section">
                <SectionTitle
                    sub={
                        isCelebrating ? CELEBRATING_SUB : SECTIONS.countdown.sub
                    }
                >
                    {isCelebrating
                        ? CELEBRATING_TITLE
                        : SECTIONS.countdown.title}
                </SectionTitle>
                <Countdown onComplete={onComplete} />
            </section>
        </AnimatedSection>
    );
}
