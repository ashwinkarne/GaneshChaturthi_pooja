import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Visitors.css";

function Visitors() {
    const navigate = useNavigate();

    const [count, setCount] = useState(0);
    const [devotees, setDevotees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const [countResponse, devoteesResponse] = await Promise.all([
                    fetch("https://ganeshchaturthi-pooja.onrender.com/api/devotees/count"),
                    fetch("https://ganeshchaturthi-pooja.onrender.com/api/devotees")
                ]);

                if (!countResponse.ok || !devoteesResponse.ok) {
                    throw new Error("Failed to fetch devotees");
                }

                const countData = await countResponse.json();
                const devoteesData = await devoteesResponse.json();

                setCount(countData.count);
                setDevotees(devoteesData);
            } catch (error) {
                console.error("Error fetching devotees:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVisitors();
    }, []);

    return (
        <div className="visitors-page">

            <button
                className="visitors-back-button"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <div className="visitor-decoration decoration-one">✦</div>
            <div className="visitor-decoration decoration-two">✦</div>

            <section className="visitor-count-section">

                <div className="visitor-top-symbol">
                    ॐ
                </div>

                <h1>
                    Number of Visitors
                </h1>

                <div className="devotee-count-circle">
                    <span>{count}</span>
                </div>

            </section>

            <section className="visitor-names-section">

                <div className="names-heading">
                    <span className="heading-line"></span>

                    <div>
                        <h2>Devotee Names</h2>
                    </div>

                    <span className="heading-line"></span>
                </div>

                {loading ? (
                    <div className="visitors-loading">
                        <div className="loading-symbol">ॐ</div>
                        <p>Loading devotees...</p>
                    </div>
                ) : devotees.length === 0 ? (
                    <div className="no-devotees">
                        <div>🙏</div>
                        <p>No devotees yet</p>
                        <span>Be the first to offer your name.</span>
                    </div>
                ) : (
                    <div className="devotee-stack">

                        {devotees.map((devotee, index) => (
                            <div
                                className="devotee-card"
                                key={devotee.id}
                            >
                                <div className="devotee-number">
                                    {devotees.length - index}
                                </div>

                                <div className="devotee-name">
                                    {devotee.name}
                                </div>

                                <div className="devotee-flower">
                                    ❁
                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </section>

        </div>
    );
}

export default Visitors;
