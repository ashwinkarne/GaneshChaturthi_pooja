import { useUser } from "./UserContext";

function Welcome() {
    const { name } = useUser();

    return <h1>Welcome, {name}!</h1>;
}

export default Welcome;