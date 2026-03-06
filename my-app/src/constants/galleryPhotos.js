// ── Gallery images ────────────────────────────────
// Static imports so Vite bundles each image as a hashed asset.
// The browser downloads all images on first page load and caches them,
// meaning zero extra network requests on hover or lightbox open.
import feets from "../assets/gallery/feets.jpeg";
import holdingHands from "../assets/gallery/holding hands.jpeg";
import hug from "../assets/gallery/hug.jpeg";
import playful from "../assets/gallery/playful.jpeg";
import trust from "../assets/gallery/trust.jpeg";
import walkingHoldingHands from "../assets/gallery/walking holding hands.jpeg";

export const GALLERY_PHOTOS = [
    {
        id: 1,
        src: feets,
        alt: "Feet together",
        caption: "Where our journey begins — one step at a time",
    },
    {
        id: 2,
        src: holdingHands,
        alt: "Holding hands",
        caption: "In each other's hand we found our forever",
    },
    {
        id: 3,
        src: hug,
        alt: "A warm hug",
        caption: "Safe place",
    },
    {
        id: 4,
        src: playful,
        alt: "Playful moment",
        caption: "A love that laughs together, lasts forever",
    },
    {
        id: 5,
        src: trust,
        alt: "A moment of trust",
        caption: "Falling for each other, every single day",
    },
    {
        id: 6,
        src: walkingHoldingHands,
        alt: "Walking hand in hand",
        caption: "Same path, same heartbeat",
    },
];
