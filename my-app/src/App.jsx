import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Layout & ambient
import FloatingPetals from "./components/FloatingPetals";
import Fireworks from "./components/Fireworks";
import OrnateDivider from "./components/ui/OrnateDivider";

// Screens & sections
import EnvelopeScreen from "./components/sections/EnvelopeScreen";
import HeroSection from "./components/sections/HeroSection";
import CountdownSection from "./components/sections/CountdownSection";
import StorySection from "./components/sections/StorySection";
import GallerySection from "./components/sections/GallerySection";
// import VideoSection from "./components/sections/VideoSection"; // uncomment when video is ready
import DetailsSection from "./components/sections/DetailsSection";
import QuoteSection from "./components/sections/QuoteSection";
import FooterSection from "./components/sections/FooterSection";

// Styles
import "./styles/globals.css";
import "./styles/envelope.css";
import "./styles/hero.css";
import "./styles/countdown.css";
import "./styles/story.css";
import "./styles/gallery.css";
import "./styles/video.css";
import "./styles/details.css";
import "./styles/quote-footer.css";

const AUTO_OPEN_DELAY_MS = 2000;

export default function App() {
    const [envelopeOpen, setEnvelopeOpen] = useState(false);
    const [isCelebrating, setIsCelebrating] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setEnvelopeOpen(true), AUTO_OPEN_DELAY_MS);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="invitation-root">
            <FloatingPetals />

            {/* Envelope intro */}
            <AnimatePresence>
                {!envelopeOpen && (
                    <EnvelopeScreen onOpen={() => setEnvelopeOpen(true)} />
                )}
            </AnimatePresence>

            {/* Main invitation */}
            <AnimatePresence>
                {envelopeOpen && (
                    <motion.main
                        className="invitation-main"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <HeroSection />
                        <CountdownSection
                            isCelebrating={isCelebrating}
                            onComplete={() => setIsCelebrating(true)}
                        />
                        <OrnateDivider />
                        <StorySection />
                        <OrnateDivider />
                        {/* <VideoSection /> */}
                        {/* <OrnateDivider /> */}
                        <GallerySection />
                        <OrnateDivider />
                        <DetailsSection />
                        <OrnateDivider />
                        <QuoteSection />
                        <FooterSection />
                    </motion.main>
                )}
            </AnimatePresence>

            {/* Celebration fireworks overlay */}
            <Fireworks active={isCelebrating} />
        </div>
    );
}
