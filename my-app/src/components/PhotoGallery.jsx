import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_PHOTOS } from "../constants/weddingContent";

const photos = GALLERY_PHOTOS;

export default function PhotoGallery() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="gallery-grid">
            {photos.map((photo, i) => (
                <motion.div
                    key={photo.id}
                    className="gallery-item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ scale: 1.04, zIndex: 2 }}
                    onClick={() => setSelected(photo)}
                >
                    <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                    />
                    <div className="gallery-caption">{photo.caption}</div>
                </motion.div>
            ))}

            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            className="lightbox-inner"
                            initial={{ scale: 0.7 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.7 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selected.src.replace("w=600", "w=1000")}
                                alt={selected.alt}
                            />
                            <p className="lightbox-caption">
                                {selected.caption}
                            </p>
                            <button
                                className="lightbox-close"
                                onClick={() => setSelected(null)}
                            >
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
