import { useState } from "react";
import { motion } from "framer-motion";
import {
    VIDEO_EMBED_URL,
    VIDEO_POSTER_URL,
    VIDEO_POSTER_ALT,
    VIDEO_WATCH_LABEL,
    VIDEO_IFRAME_TITLE,
} from "../constants/weddingContent";

export default function PreweddingVideo() {
    const [playing, setPlaying] = useState(false);

    return (
        <div className="video-wrapper">
            {!playing ? (
                <motion.div
                    className="video-poster"
                    onClick={() => setPlaying(true)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Poster image */}
                    <img
                        src={VIDEO_POSTER_URL}
                        alt={VIDEO_POSTER_ALT}
                    />
                    <div className="video-poster-overlay" />

                    {/* Animated play button */}
                    <motion.div
                        className="play-btn"
                        initial={{ scale: 0.9, opacity: 0.85 }}
                        animate={{
                            scale: [0.9, 1.05, 0.9],
                            opacity: [0.85, 1, 0.85],
                        }}
                        transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="play-btn-ring" />
                        <div className="play-btn-ring delay" />
                        <div className="play-icon">▶</div>
                    </motion.div>

                    <div className="video-poster-label">
                        <span>{VIDEO_WATCH_LABEL}</span>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className="video-frame-wrapper"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <iframe
                        src={`${VIDEO_EMBED_URL.replace("autoplay=0", "autoplay=1")}`}
                        title={VIDEO_IFRAME_TITLE}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </motion.div>
            )}
        </div>
    );
}
