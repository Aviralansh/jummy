import { Navigate } from "react-router-dom";

function UserRoute({ children }) {

    const role = localStorage.getItem("role");

    if (
        role !== "ROLE_USER" &&
        role !== "ROLE_ADMIN"
    ) {
        return <Navigate to="/" />;
    }

    return children;
}

console.log(
    "Role From Storage:",
    localStorage.getItem("role")
);

export default UserRoute;