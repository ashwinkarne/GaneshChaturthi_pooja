import { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import "./Feedback.css";

function Feedback() {
    const { name } = useUser();

    const [feedback, setFeedback] = useState("");
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const API_URL = "https://ganeshchaturthi-by-ashwin.onrender.com";

    
    const fetchFeedbacks = async () => {
        try {
            const response = await fetch(`${API_URL}/api/feedback`);

            if (!response.ok) {
                throw new Error("Failed to fetch feedbacks");
            }

            const data = await response.json();
            setFeedbacks(data);
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
        } finally {
            setLoading(false);
        }
    };

   
    useEffect(() => {
        fetchFeedbacks();
    }, []);

  
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!feedback.trim()) {
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/api/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    feedback: feedback.trim(),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit feedback");
            }

            
            setFeedback("");

            await fetchFeedbacks();

        } catch (error) {
            console.error("Error submitting feedback:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="feedback-section">

            <div className="feedback-container">

           
                <div className="feedback-heading">
                    <span className="feedback-line"></span>

                    <h2>Feedback</h2>

                    <span className="feedback-line"></span>
                </div>

                <p className="feedback-subtitle">
                    Share your experience with us
                </p>
                <form
                    className="feedback-form"
                    onSubmit={handleSubmit}
                >
                    <div className="feedback-user">
                        <span>🦸</span>

                        <div>
                            <small>Sharing feedback as</small>
                            <strong>{name}</strong>
                        </div>
                    </div>

                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write your feedback here..."
                        maxLength={500}
                        disabled={submitting}
                    />

                    <div className="feedback-form-bottom">

                        <span className="character-count">
                            {feedback.length}/500
                        </span>

                        <button
                            type="submit"
                            disabled={
                                submitting ||
                                !feedback.trim()
                            }
                        >
                            {submitting
                                ? "Sending..."
                                : "Send Feedback 💬"}
                        </button>

                    </div>
                </form>



                <div className="all-feedback">

                    <h3>What Devotees Say</h3>

                    {loading ? (
                        <div className="feedback-loading">
                            Loading feedbacks...
                        </div>
                    ) : feedbacks.length === 0 ? (
                        <div className="no-feedback">
                            Be the first to share your experience 
                        </div>
                    ) : (
                        <div className="feedback-list">

                            {feedbacks.map((item) => (
                                <div
                                    className="feedback-card"
                                    key={item.id}
                                >
                                    <div className="feedback-card-top">

                                        <div className="feedback-avatar">
                                            {item.name
                                                ? item.name.charAt(0).toUpperCase()
                                                : "🙏"}
                                        </div>

                                        <div className="feedback-name">
                                            <strong>{item.name}</strong>

                                            
                                        </div>

                                    </div>

                                    <p>
                                        {item.feedback}
                                    </p>

                                </div>
                            ))}

                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}

export default Feedback;
