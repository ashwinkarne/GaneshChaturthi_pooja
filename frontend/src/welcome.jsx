import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./welcome.css";

function Welcome() {
    const location = useLocation();
    const navigate = useNavigate();

    const [videoFinished, setVideoFinished] = useState(false);
    const name = location.state.name;

    const handleVideoEnd = () => {
        setVideoFinished(true);
    };

    const handleNext = () => {
        navigate("/home", {
            state: {
                name: name
            }
        });
    };

    return (
        <div className="welcome-page">

            {!videoFinished ? (
                <div className="welcome-video-container">
                    <video
                        className="welcome-video"
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnd}
                    >
                        <source
                            src="/videos/welcome-video-simple.mp4"
                            type="video/mp4"
                        />

                        Your browser does not support the video tag.
                    </video>
                </div>
            ) : (
                <div className="welcome-content">

                    <div className="ganesh-symbol">🪔</div>

                    <h1>
                        Welcome, <span>{name}</span>!
                    </h1>

                    <h2>
                        🙏 Happy Ganesh Chaturthi 🙏
                    </h2>

                    <p>
                        May Lord Ganesha bless you with
                        <br />
                        happiness, wisdom, prosperity and success.
                    </p>

                    <p className="wish">
                        May every new beginning bring
                        <br />
                        beautiful moments into your life. ✨
                    </p>

                    <button
                        className="next-button"
                        onClick={handleNext}
                    >
                        Next →
                    </button>

                </div>
            )}

        </div>
    );
}

export default Welcome;