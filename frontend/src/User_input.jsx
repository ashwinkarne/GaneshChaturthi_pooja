import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

function Userinput() {
    const { name, setName } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
        alert("Please enter your name");
        return;
    }

    try {
        await fetch("http://localhost:5050/api/devotees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name
            })
        });

        navigate("/welcome", {
            state: {
                name: name
            }
        });

    } catch (error) {
        console.error("Error:", error);
    }
};

    return (
        <div className="user-input-container">
            <h1>Please enter your Name</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <p>
                    <strong>Note:</strong> Please enter a valid name and don't spam.
                </p>

                <button type="submit">Enter</button>
            </form>
        </div>
    );
}

export default Userinput;