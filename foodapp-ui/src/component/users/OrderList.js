import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/UserService";

function OrderList() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        getAllOrders()

            .then((response) => {

                setOrders(response.data);

            })

            .catch((error) => {

                console.log(error);

            });

    }, []);

    return (

        <div>

            <h2>All Orders</h2>

            <table border="1">

                <thead>

                    <tr>

                        <th>Order Id</th>
                        <th>User Id</th>
                        <th>Food Id</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Order Date</th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map((order) => (

                        <tr key={order.orderId}>

                            <td>{order.orderId}</td>
                            <td>{order.userId}</td>
                            <td>{order.foodId}</td>
                            <td>{order.quantity}</td>
                            <td>{order.totalAmount}</td>
                            <td>{order.status}</td>
                            <td>{order.orderDate}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default OrderList;