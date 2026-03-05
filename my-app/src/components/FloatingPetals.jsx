import { useEffect, useState } from "react";

const petalShapes = ["🌸", "🌺", "🌹", "🌷", "✿", "❀"];

export default function FloatingPetals() {
    const [petals, setPetals] = useState([]);

    useEffect(() => {
        const newPetals = Array.from({ length: 18 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animDuration: 6 + Math.random() * 8,
            animDelay: Math.random() * 10,
            size: 14 + Math.random() * 14,
            shape: petalShapes[Math.floor(Math.random() * petalShapes.length)],
            swayAmount: 30 + Math.random() * 40,
        }));
        setPetals(newPetals);
    }, []);

    return (
        <div
            className="petals-container"
            aria-hidden="true"
        >
            {petals.map((petal) => (
                <span
                    key={petal.id}
                    className="petal"
                    style={{
                        left: `${petal.left}%`,
                        animationDuration: `${petal.animDuration}s`,
                        animationDelay: `${petal.animDelay}s`,
                        fontSize: `${petal.size}px`,
                        "--sway": `${petal.swayAmount}px`,
                    }}
                >
                    {petal.shape}
                </span>
            ))}
        </div>
    );
}
