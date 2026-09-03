
import { useState } from "react";
import UserList from "../component/users/UserList";
import AddUser from "../component/users/AddUser";
import UpdateUser from "../component/users/UpdateUser";
import SearchUser from "../component/users/SearchUser";
import OrderList from "../component/users/OrderList";

function UserProfileModule() {

    const [page, setPage] = useState("home");

    return (

        <div className="container mt-4">

            <div className="card shadow p-4">

                <h1 className="text-center text-primary mb-4">
                    User Management System
                </h1>

                <div className="text-center">

                    <button
                        className="btn btn-primary me-2 mb-2"
                        onClick={() => setPage(page === "users" ? "home" : "users")}
                    >
                        View Users
                    </button>

                    <button
                        className="btn btn-success me-2 mb-2"
                        onClick={() => setPage(page === "add" ? "home" : "add")}
                    >
                        Add User
                    </button>

                    <button
                        className="btn btn-warning me-2 mb-2"
                        onClick={() => setPage(page === "update" ? "home" : "update")}
                    >
                        Update User
                    </button>

                    <button
                        className="btn btn-info me-2 mb-2"
                        onClick={() => setPage(page === "orders" ? "home" : "orders")}
                    >
                        View Orders
                    </button>

                    <button
                        className="btn btn-secondary mb-2"
                        onClick={() => setPage(page === "search" ? "home" : "users")}
                    >
                        Search Users
                    </button>

                </div>

                <hr />

                <div className="mt-3">

                    {page === "users" && <UserList />}
                    {page === "add" && <AddUser />}
                    {page === "update" && <UpdateUser />}
                    {page === "orders" && <OrderList />}
                    {page === "search" && <SearchUser />}

                </div>

            </div>

        </div>

    );
}

export default UserProfileModule;