import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import SectionTitle from "../ui/SectionTitle";
import PhotoGallery from "../PhotoGallery";
import { SECTIONS } from "../../constants/weddingContent";

export default function GallerySection() {
    return (
        <AnimatedSection delay={0.1}>
            <section className="section gallery-section">
                <SectionTitle sub={SECTIONS.gallery.sub}>
                    {SECTIONS.gallery.title}
                </SectionTitle>
                <PhotoGallery />
            </section>
        </AnimatedSection>
    );
}
