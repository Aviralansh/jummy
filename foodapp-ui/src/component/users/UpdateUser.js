import { useState } from "react";
import { updateUsers } from "../../services/UserService";
function UpdateUser() {

    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    function updateUser() {

        const user = {
            name,
            email,
            phonenumber,
            address
        };

        updateUsers(userId, user)
            .then(() => {

                setMessage("User Updated Successfully");
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
    }

    return (

        <div>

            <h2>Update User</h2>

            <input
                type="number"
                placeholder="Enter User Id"
                onChange={(e) =>
                    setUserId(e.target.value)
                }
            />

            <br /><br />

            <input
                type="text"
                placeholder="Enter Name"
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <br /><br />

            <input
                type="text"
                placeholder="Enter Email"
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <br /><br />

            <input
                type="text"
                placeholder="Enter Phone Number"
                onChange={(e) =>
                    setPhoneNumber(e.target.value)
                }
            />

            <br /><br />

            <input
                type="text"
                placeholder="Enter Address"
                onChange={(e) =>
                    setAddress(e.target.value)
                }
            />

            <br /><br />

            <button onClick={updateUser}>
                Update User
            </button>

        </div>

    );
}

export default UpdateUser;