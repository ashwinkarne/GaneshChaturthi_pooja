import { useEffect, useRef, useState } from "react";
import { useUser } from "./UserContext";
import "./Home.css";

// Background music
import backgroundMusic from "./assets/sounds/background-melody.mp3";
import harathiMusic from "./assets/sounds/mangal-harathi.mp3";

// Mangal deepa
import mangalDeepa from "./assets/mangal-deepa.png";

// Flowers
import flower1 from "./assets/flowers/flower1.png";
import flower2 from "./assets/flowers/flower2.png";
import flower3 from "./assets/flowers/flower3.png";
import flower4 from "./assets/flowers/flower4.png";
import flower5 from "./assets/flowers/flower5.png";
import flower6 from "./assets/flowers/flower6.png";

function Home() {
    const { name } = useUser();

    const backgroundAudioRef = useRef(null);
    const harathiAudioRef = useRef(null);

    const [showHarathi, setShowHarathi] = useState(false);
    const [flowers, setFlowers] = useState([]);

    const flowerImages = [
        flower1,
        flower2,
        flower3,
        flower4,
        flower5,
        flower6,
    ];

    // Background music
    useEffect(() => {
        const audio = new Audio(backgroundMusic);

        audio.loop = true;
        audio.volume = 0.35;

        backgroundAudioRef.current = audio;

        // Browser may block autoplay.
        audio.play().catch(() => {
            console.log("Autoplay blocked by browser.");
        });

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    // Mangal Harathi
    const handleHarathi = () => {
        // Stop background music
        if (backgroundAudioRef.current) {
            backgroundAudioRef.current.pause();
        }

        // Play harathi song
        const harathi = new Audio(harathiMusic);
        harathi.volume = 0.8;
        harathi.play();

        harathiAudioRef.current = harathi;

        // Show deepa
        setShowHarathi(true);

        // Deepa animation for 7 seconds
        setTimeout(() => {
            setShowHarathi(false);

            // Start background music again
            if (backgroundAudioRef.current) {
                backgroundAudioRef.current.currentTime = 0;
                backgroundAudioRef.current.play().catch(() => {});
            }
        }, 7000);
    };

    // Blow flowers
    const handleFlowers = () => {
        const newFlowers = [];

        const numberOfFlowers =
            Math.floor(Math.random() * 6) + 20; // 20-25

        for (let i = 0; i < numberOfFlowers; i++) {
            const randomFlower =
                flowerImages[
                    Math.floor(Math.random() * flowerImages.length)
                ];

            newFlowers.push({
                id: Date.now() + i,
                image: randomFlower,

                // Starting position
                startX: Math.random() * 100,

                // Final position
                endX: 35 + Math.random() * 30,
                endY: 30 + Math.random() * 35,

                // Random animation values
                size: 25 + Math.random() * 35,
                duration: 2.5 + Math.random() * 2,
                delay: Math.random() * 0.8,
                rotation: Math.random() * 720 - 360,
            });
        }

        setFlowers(newFlowers);

        // Remove flowers after animation
        setTimeout(() => {
            setFlowers([]);
        }, 5500);
    };

    return (
        <div className="home-page">

            {/* Dark overlay */}
            <div className="home-overlay"></div>

            {/* Top decoration */}
            <div className="top-decoration">
                🪔 ✨ 🌺 ✨ 🪔
            </div>

            {/* Heading */}
            <div className="darshan-heading">
                <p>Darshan of</p>

                <h1>
                    ✨ {name} ✨
                </h1>

                <div className="heading-line"></div>

                <span>
                    May Lord Ganesha bless you with happiness,
                    peace and prosperity
                </span>
            </div>

            {/* Flowers */}
            <div className="flower-container">
                {flowers.map((flower) => (
                    <img
                        key={flower.id}
                        src={flower.image}
                        className="flying-flower"
                        style={{
                            "--startX": `${flower.startX}vw`,
                            "--endX": `${flower.endX}vw`,
                            "--endY": `${flower.endY}vh`,
                            "--size": `${flower.size}px`,
                            "--duration": `${flower.duration}s`,
                            "--delay": `${flower.delay}s`,
                            "--rotation": `${flower.rotation}deg`,
                        }}
                    />
                ))}
            </div>

            {/* Mangal Deepa */}
            {showHarathi && (
                <div className="harathi-overlay">

                    <div className="harathi-glow"></div>

                    <img
                        src={mangalDeepa}
                        className="mangal-deepa"
                        alt="Mangal Deepa"
                    />

                    <p className="harathi-text">
                        🪔 Mangal Harathi 🪔
                    </p>

                </div>
            )}

            {/* Bottom buttons */}
            <div className="home-buttons">

                <button
                    className="pooja-button"
                    onClick={handleHarathi}
                >
                    <span className="button-icon">🪔</span>

                    <span>
                        Do Mangal Harathi
                    </span>
                </button>

                <button
                    className="pooja-button"
                    onClick={handleFlowers}
                >
                    <span className="button-icon">🌸</span>

                    <span>
                        Blow Flowers
                    </span>
                </button>

                <button
                    className="pooja-button"
                    onClick={() => console.log("Visitors")}
                >
                    <span className="button-icon">👥</span>

                    <span>
                        All Visitors
                    </span>
                </button>

                <button
                    className="pooja-button"
                    onClick={() => console.log("Feedback")}
                >
                    <span className="button-icon">💬</span>

                    <span>
                        Feedback
                    </span>
                </button>

            </div>

        </div>
    );
}

export default Home;