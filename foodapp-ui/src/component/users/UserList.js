import { useEffect, useState } from "react";
import {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByName,
    getUserByPhoneNumber,
} from "../../services/UserService";
function UserList()
{

    const [users, setUsers] = useState([]);
     const [userId, setUserId] = useState("");
     const [email, setEmail] = useState("");
     const [name, setName] = useState("");
     const [phonenumber, setPhoneNumber] = useState("");
    useEffect(() => 
        {

        getAllUsers()
            .then((response) => {

                setUsers(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

          },       []);

    function deleteUser(id) {
        const confirmDelete = window.confirm(
            "Are you sure to want to delete this user?"
        );
        if(!confirmDelete){
            return;
        }

        deleteUser(id)
            .then(() => {

                alert("User Deleted Successfully");

                setUsers(
                    users.filter(
                        user => user.userId !== id
                    )
                );

            })
            .catch((error) => {

                console.log(error);

                alert("Unable to Delete User");

            });     
    }

    function searchById() {

    getUserById(userId)

        .then((response) => {

            setUsers([response.data]);

        })

        .catch((error) => {

            console.log(error);

            alert("User Not Found");

        });

    }
        function searchByEmail() {


    getUserByEmail(email)

        .then((response) => {

            setUsers([response.data]);

        })

        .catch((error) => {

            console.log(error);

            alert("User Not Found");

        });
    }
    
    function searchByName() {

    getUserByName(name)

        .then((response) => {

            setUsers(response.data);

        })

        .catch((error) => {

            console.log(error);

            alert("User Not Found");

        });

}

function searchByPhone() {

    getUserByPhoneNumber(phonenumber)

        .then((response) => {

            setUsers([response.data]);

        })

        .catch((error) => {

            console.log(error);

            alert("User Not Found");

        });

}



    return (

        <div>

            <h1>User List</h1>

             <h2>Search Users</h2>
             <p>User Id</p>
             <input
              type="number"
               placeholder="Enter User Id"
               value={userId}
                onChange={(e) =>
                 setUserId(e.target.value)
               }
          />
<button onClick={searchById}>
    Search
</button>

<p>Email</p>
<input

type="text"
placeholder="Enter Email"
value={email}
onChange={(e) =>
setEmail(e.target.value)

}
/>
<button onClick={searchByEmail}>
Search
</button>

<p>Name</p>
<input
    type="text"
    placeholder="Enter Name"
    value={name}
    onChange={(e) =>
        setName(e.target.value)
    }
/>
<button onClick={searchByName}>
    Search
</button>


<p>Phone-Number</p>
<input
    type="text"
    placeholder="Enter Phone Number"
    value={phonenumber}
    onChange={(e) =>
        setPhoneNumber(e.target.value)
    }
/>

<button onClick={searchByPhone}>
    Search
</button>

<br /><br />

            <table border="1">

                <thead>

                    <tr>

                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr key={user.userId}>

                            <td>{user.userId}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phonenumber}</td>
                            <td>{user.address}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        deleteUser(user.userId)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default UserList;