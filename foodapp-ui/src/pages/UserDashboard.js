import LogoutButton from "../component/Logout";
import { useNavigate } from "react-router-dom";

function UserDashboard() {

const navigate = useNavigate();
    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h1 className="text-center text-primary mb-4">
                    User Dashboard
                </h1>

                <div className="d-grid gap-3">

                    <button className="btn btn-success" 
                    onClick={() => navigate("/profile")}>
                        User Profile
                    </button>

                    <button className="btn btn-primary">
                        Order Service
                    </button>

                    <LogoutButton />

                </div>

            </div>

        </div>

    );
}

export default UserDashboard;