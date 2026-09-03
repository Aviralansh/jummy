# Frontend Architecture Explained (`App.js`)

Our entire React frontend has been consolidated into a single, easy-to-read file (`App.js`). It is divided into four main functional components. Below is a detailed breakdown of how each section works.

---

## 1. Setup and Configuration

```javascript
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = "http://localhost:9090";
```
* **Line 1-3:** We import React and the `useState` hook for managing dynamic data. We import `axios` to handle making HTTP requests to the backend, and we import Bootstrap's CSS to make the app look pretty without writing custom stylesheets.
* **Line 5:** We declare our global `API_URL`. This points to the **API Gateway** running on port 9090. All requests go here, and the gateway routes them to the correct microservice (`food-service`, `order-service`, or `user-service`).

---

## 2. The `LoginView` Component

```javascript
function LoginView({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // ...
```
* **State:** We create two state variables, `username` and `password`, which start as empty strings.
* **UI:** It returns a simple Bootstrap card with two `<input>` boxes. 
* **Logic:** The `onChange` attribute on the inputs updates the state every time the user types a letter. When the user clicks the "Login" button, it triggers the `onLogin` function (passed down from the main App) and hands it the username and password they typed.

---

## 3. The `App` Component (The Brain)
Even though this is at the bottom of the file, it is the actual "engine" of the frontend.

```javascript
function App() {
  const [page, setPage] = useState('login'); // Tracks which page to show
  const [role, setRole] = useState('');      // 'ROLE_ADMIN' or 'ROLE_USER'
  const [token, setToken] = useState('');    // The encoded authentication token
  const [dataList, setDataList] = useState([]); // Holds JSON responses from the backend
  const [viewTitle, setViewTitle] = useState('');
```
* **State Management:** This function holds the "global" state for the application. It remembers if we are currently looking at the login screen, who is logged in, and what the last API response was so it can display it on the screen.

### The Login Handler
```javascript
  const handleLogin = async (username, password) => {
    const basicToken = btoa(username + ":" + password);
    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Basic ${basicToken}` }
      });
      setRole(response.data.role);
      setToken(basicToken);
      setPage(response.data.role === 'ROLE_ADMIN' ? 'admin' : 'user');
    } catch (error) {
      alert("Invalid Credentials.");
    }
  };
```
* **btoa(...):** This converts the "username:password" string into a Base64 encoded string, which is the standard format for Basic HTTP Authentication.
* **axios.get:** It sends a request to the API Gateway's `/me` endpoint with the authorization token.
* If the credentials are correct, the gateway returns the user's role. If the role is `ROLE_ADMIN`, we switch the page state to `'admin'`. Otherwise, we switch it to `'user'`.

### The Universal API Requester
```javascript
  const apiRequest = async (method, endpoint, data = null) => {
    try {
      const response = await axios({
        method: method,
        url: `${API_URL}${endpoint}`,
        data: data,
        headers: { Authorization: `Basic ${token}`, 'Content-Type': 'application/json' }
      });
      setDataList(response.data);
      setViewTitle(`Result for: ${endpoint}`);
    } catch (error) { ... }
  };
```
* **Purpose:** Instead of writing `axios.get` and `axios.post` 50 different times, we created one universal helper function. 
* Whenever an admin or user clicks a button (like "View Orders" or "Delete Food"), they just call this function with the HTTP method (GET/POST/PUT/DELETE), the endpoint path, and any data payload.
* The function automatically attaches their security token, sends the request, and saves the backend's JSON response into the `dataList` state variable so it appears on the screen.

---

## 4. The `AdminDashboard` Component
This component is only rendered if `page === 'admin'`.

```javascript
function AdminDashboard({ apiRequest, onLogout }) {
  const [food, setFood] = useState({ foodId: '', foodName: '', category: '', price: '', description: '', available: true });
  const [search, setSearch] = useState({ id: '', category: '', maxPrice: '', minPrice: '' });
```
* **Form State:** We create state objects to temporarily hold whatever the admin types into the "Add Food" form or the "Search Food" form.

```javascript
  <button onClick={() => {
    const { foodId, ...newFoodData } = food;
    apiRequest('POST', '/admin/add', newFoodData);
  }}>Add New Food</button>
```
* **Add Food Logic:** When adding a new food, we pull the `foodId` out of the state object and send the rest (`newFoodData`) to the backend. We do this because the database auto-generates the ID for new items; if we sent an ID manually, Hibernate would crash thinking we were trying to update an existing record.

```javascript
  <button onClick={() => apiRequest('PUT', `/admin/update/${food.foodId}`, food)}>Update Food</button>
```
* **Update Food Logic:** When updating, we use an HTTP `PUT` request and append the `foodId` directly into the URL path, while sending the entire `food` object as the payload.

---

## 5. The `UserDashboard` Component
This component is only rendered if `page === 'user'`.

```javascript
function UserDashboard({ apiRequest, onLogout }) {
  const [profile, setProfile] = useState({ userId: '', name: '', email: '', phonenumber: '', address: '' });
  const [order, setOrder] = useState({ orderId: '', foodId: '', quantity: '' });
```
* **Form State:** Similar to the Admin dashboard, we create state objects to hold the data the user types into their Profile settings and the Food Ordering boxes.

```javascript
  <button onClick={() => apiRequest('POST', '/orders/placeorder', { userId: order.userId, foodId: order.foodId, quantity: order.quantity })}>Place Order</button>
```
* **Place Order Logic:** When the user clicks this button, it grabs the exact User ID, Food ID, and Quantity they typed into the text boxes, packages them into a JSON object, and POSTs them to the `order-service` via the API gateway.

---

## 6. The Universal Display Box
At the very bottom of the `App` component, we have the universal JSON renderer:

```javascript
      {viewTitle && (
        <div className="card shadow p-4 mt-4 bg-dark text-light">
          <h3 className="mb-3">{viewTitle}</h3>
          <pre style={{maxHeight: '400px', overflowY: 'auto', margin: 0}}>
            {typeof dataList === 'object' ? JSON.stringify(dataList, null, 2) : dataList}
          </pre>
        </div>
      )}
```
* **Logic:** If `viewTitle` is not empty (meaning an API request has been made), it renders a dark box at the bottom of the screen.
* **JSON.stringify:** It takes whatever raw data the backend sent back (stored in `dataList`) and formats it nicely with 2 spaces of indentation so it is readable by humans. If the backend sent a raw string instead of an object (like "Order Placed!"), it just displays the string directly.
