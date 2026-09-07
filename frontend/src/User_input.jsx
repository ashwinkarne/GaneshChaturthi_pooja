import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

function Userinput() {
    const { name, setName } = useUser();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Please enter your name");
            return;
        }

        navigate("/welcome");
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