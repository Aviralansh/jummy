import Logout from "../component/Logout";

function AdminDashboard() {

    return (
        <div>

            <h1>Admin Dashboard</h1>
            <br></br>

            <button>Add Food</button>
            <br></br>

            <button>Update Food</button>
            <br></br>

            <button>Delete Food</button>
            <br></br>

            <button>View Food List</button>
            <br></br>

            <Logout />

        </div>
    );
}

export default AdminDashboard;