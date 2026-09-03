import { useState } from "react";
import { registerUser } from "../../services/UserService";

function AddUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const saveUser = () => {

        const user = {
            name,
            email,
            phonenumber,
            address
        };

        registerUser(user)
            .then(() => {

                setMessage("Registration Successful");
                setError("");

                setName("");
                setEmail("");
                setPhoneNumber("");
                setAddress("");

            })
            .catch((error) => {

                setError(
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Registration failed"
                );

                setMessage("");

                console.log(error);
            });
    };

    return (

        <div className="container mt-4">

            <div className="card shadow p-4">

                <h2 className="text-center text-primary mb-4">
                    Add User
                </h2>

                <div className="mb-3">

                    <label className="form-label">
                        Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        placeholder="Enter Name"
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={email}
                        placeholder="Enter Email"
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Phone Number
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={phonenumber}
                        placeholder="Enter Phone Number"
                        onChange={(e) =>
                            setPhoneNumber(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Address
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        placeholder="Enter Address"
                        onChange={(e) =>
                            setAddress(e.target.value)
                        }
                    />

                </div>

                <button
                    className="btn btn-success"
                    onClick={saveUser}
                >
                    Save User
                </button>

                {message && (
                    <div
                        className="alert alert-success mt-3"
                    >
                        {message}
                    </div>
                )}

                {error && (
                    <div
                        className="alert alert-danger mt-3"
                    >
                        {error}
                    </div>
                )}

            </div>

        </div>

    );
}

export default AddUser;