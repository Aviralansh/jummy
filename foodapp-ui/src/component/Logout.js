import { useNavigate } from "react-router-dom";

function LogoutButton() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/");
    };

    return (
        <button onClick={logout}>
            Logout
        </button>
    );
}

export default LogoutButton;