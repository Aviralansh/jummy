import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/AuthService";

function Login() {

    const [username,setUsername] =
            useState("");

    const [password,setPassword] =
            useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const response =
                    await login(
                        username,
                        password
                    );


            const role =
                    response.data.role;

            sessionStorage.setItem(
                "role",
                response.data.role
            );

            sessionStorage.setItem(
                "username",
                response.data.username
            );

            sessionStorage.setItem(
                "password",
                password);

            if(role === "ROLE_ADMIN")
            {
                navigate("/admin");
            }
            else if(role === "ROLE_USER")
            {
                navigate("/user");
            }

        }
        catch(error)
        {
            alert(
                "Invalid Credentials"
            );
        }
    };

return (
    <div
        className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light"
    >
        <div
            className="card shadow-lg p-4"
            style={{
                width: "400px",
                borderRadius: "15px"
            }}
        >
            <h1
                className="text-center text-primary mb-4"
            >
                Food App Login
            </h1>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    onChange={(e) =>
                        setUsername(
                            e.target.value
                        )
                    }
                />
            </div>

            <div className="mb-4">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />
            </div>

            <button
                className="btn btn-primary w-100"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    </div>
);
}

export default Login;