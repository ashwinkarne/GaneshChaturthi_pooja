import { useEffect, useState } from "react";
import "./Visitors.css";

function Visitors() {
    const [count, setCount] = useState(0);
    const [devotees, setDevotees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const [countResponse, devoteesResponse] = await Promise.all([
                    fetch("https://ganeshchaturthi-by-ashwin.onrender.com/api/devotees/count"),
                    fetch("https://ganeshchaturthi-by-ashwin.onrender.com/api/devotees")
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

            {/* Decorative background elements */}
            <div className="visitor-decoration decoration-one">✦</div>
            <div className="visitor-decoration decoration-two">✦</div>

            {/* ================= COUNT SECTION ================= */}
            <section className="visitor-count-section">

                <div className="visitor-top-symbol">
                    ॐ
                </div>

                <p className="visitor-small-heading">
                    श्री गणेशाय नमः
                </p>

                <h1>
                    Our Devotees
                </h1>

                <div className="count-divider">
                    <span></span>
                    <div>🙏</div>
                    <span></span>
                </div>

                <div className="devotee-count-circle">
                    <span>{count}</span>
                </div>

                <p className="count-label">
                    Devotees have offered their names
                </p>

            </section>


            {/* ================= NAMES SECTION ================= */}
            <section className="visitor-names-section">

                <div className="names-heading">
                    <span className="heading-line"></span>

                    <div>
                        <p>With Divine Blessings</p>
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