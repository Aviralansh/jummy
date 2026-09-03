import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = "http://localhost:9090";

// --- LOGIN COMPONENT ---
function LoginView({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{maxWidth: '400px'}}>
        <h1 className="text-center text-primary mb-4">Food App Login</h1>
        <input className="form-control mb-3" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100" onClick={() => onLogin(username, password)}>Login</button>
      </div>
    </div>
  );
}

// --- ADMIN DASHBOARD ---
function AdminDashboard({ apiRequest, onLogout }) {
  const [food, setFood] = useState({ foodId: '', foodName: '', category: '', price: '', description: '', available: true });
  const [search, setSearch] = useState({ id: '', category: '', maxPrice: '', minPrice: '' });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Admin Dashboard</h1>
        <button className="btn btn-danger" onClick={onLogout}>Logout</button>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <button className="btn btn-success" onClick={() => apiRequest('GET', '/admin/all')}>View All Foods</button>
        <button className="btn btn-success" onClick={() => apiRequest('GET', '/admin/available')}>View Available Foods</button>
        <button className="btn btn-info text-white" onClick={() => apiRequest('GET', '/orders/allOrders')}>View All Orders</button>
        <button className="btn btn-warning text-white" onClick={() => apiRequest('GET', '/users/all')}>View All Users</button>
      </div>

      <div className="row">
        {/* Add / Update Food */}
        <div className="col-md-6 mb-4">
          <div className="card shadow p-4 h-100">
            <h3 className="text-primary mb-3">Add / Update Food</h3>
            <input className="form-control mb-2" placeholder="Food ID (Only for Update)" value={food.foodId} onChange={e => setFood({...food, foodId: e.target.value})} />
            <input className="form-control mb-2" placeholder="Food Name" value={food.foodName} onChange={e => setFood({...food, foodName: e.target.value})} />
            <input className="form-control mb-2" placeholder="Category" value={food.category} onChange={e => setFood({...food, category: e.target.value})} />
            <input className="form-control mb-2" placeholder="Price" type="number" value={food.price} onChange={e => setFood({...food, price: e.target.value})} />
            <input className="form-control mb-3" placeholder="Description" value={food.description} onChange={e => setFood({...food, description: e.target.value})} />
            
            <div className="d-flex gap-2">
              <button className="btn btn-primary w-50" onClick={() => {
                const { foodId, ...newFoodData } = food;
                apiRequest('POST', '/admin/add', newFoodData);
              }}>Add New Food</button>
              <button className="btn btn-secondary w-50" onClick={() => apiRequest('PUT', `/admin/update/${food.foodId}`, food)}>Update Food</button>
            </div>
          </div>
        </div>

        {/* Find / Delete Food */}
        <div className="col-md-6 mb-4">
          <div className="card shadow p-4 h-100">
            <h3 className="text-primary mb-3">Find & Delete Food</h3>
            <div className="input-group mb-2">
              <input className="form-control" placeholder="Food ID" value={search.id} onChange={e => setSearch({...search, id: e.target.value})} />
              <button className="btn btn-outline-primary" onClick={() => apiRequest('GET', `/admin/${search.id}`)}>Get ID</button>
              <button className="btn btn-outline-danger" onClick={() => apiRequest('DELETE', `/admin/delete/${search.id}`)}>Del ID</button>
            </div>
            <div className="input-group mb-2">
              <input className="form-control" placeholder="Category" value={search.category} onChange={e => setSearch({...search, category: e.target.value})} />
              <button className="btn btn-outline-primary" onClick={() => apiRequest('GET', `/admin/category/${search.category}`)}>Get Category</button>
            </div>
            <div className="input-group mb-2">
              <input className="form-control" placeholder="Max Price" type="number" value={search.maxPrice} onChange={e => setSearch({...search, maxPrice: e.target.value})} />
              <button className="btn btn-outline-primary" onClick={() => apiRequest('GET', `/admin/belowprice/${search.maxPrice}`)}>Get Below Price</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- USER DASHBOARD ---
function UserDashboard({ apiRequest, onLogout }) {
  const [profile, setProfile] = useState({ userId: '', name: '', email: '', phonenumber: '', address: '' });
  const [order, setOrder] = useState({ orderId: '', foodId: '', quantity: '' });
  const [search, setSearch] = useState({ id: '', category: '', maxPrice: '', minPrice: '' });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">User Dashboard</h1>
        <button className="btn btn-danger" onClick={onLogout}>Logout</button>
      </div>

      <div className="mb-4 d-flex flex-wrap gap-2">
        <button className="btn btn-success" onClick={() => apiRequest('GET', '/admin/available')}>View Available Foods</button>
      </div>

      <div className="row">
        {/* Find Food */}
        <div className="col-12 mb-4">
          <div className="card shadow p-4">
            <h3 className="text-primary mb-3">Search Menu</h3>
            <div className="row">
              <div className="col-md-4">
                <div className="input-group mb-2">
                  <input className="form-control" placeholder="Category" value={search.category} onChange={e => setSearch({...search, category: e.target.value})} />
                  <button className="btn btn-outline-primary" onClick={() => apiRequest('GET', `/admin/category/${search.category}`)}>Search Category</button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-group mb-2">
                  <input className="form-control" placeholder="Max Price" type="number" value={search.maxPrice} onChange={e => setSearch({...search, maxPrice: e.target.value})} />
                  <button className="btn btn-outline-primary" onClick={() => apiRequest('GET', `/admin/belowprice/${search.maxPrice}`)}>Below Price</button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-group mb-2">
                  <input className="form-control" placeholder="Min" type="number" value={search.minPrice} onChange={e => setSearch({...search, minPrice: e.target.value})} />
                  <input className="form-control" placeholder="Max" type="number" value={search.maxPrice} onChange={e => setSearch({...search, maxPrice: e.target.value})} />
                  <button className="btn btn-outline-primary" onClick={() => apiRequest('GET', `/admin/between/${search.minPrice}/${search.maxPrice}`)}>Between</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Management */}
        <div className="col-md-6 mb-4">
          <div className="card shadow p-4 h-100">
            <h3 className="text-primary mb-3">My Profile</h3>
            <input className="form-control mb-2" placeholder="User ID" value={profile.userId} onChange={e => setProfile({...profile, userId: e.target.value})} />
            <input className="form-control mb-2" placeholder="Name" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
            <input className="form-control mb-2" placeholder="Email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
            <input className="form-control mb-2" placeholder="Phone" value={profile.phonenumber} onChange={e => setProfile({...profile, phonenumber: e.target.value})} />
            <input className="form-control mb-3" placeholder="Address" value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} />
            
            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-primary" onClick={() => {
                const { userId, ...newProfile } = profile;
                apiRequest('POST', '/users/register', newProfile);
              }}>Register</button>
              <button className="btn btn-secondary" onClick={() => apiRequest('PUT', `/users/update/${profile.userId}`, profile)}>Update</button>
              <button className="btn btn-info text-white" onClick={() => apiRequest('GET', `/users/userId/${profile.userId}`)}>View Profile</button>
            </div>
          </div>
        </div>

        {/* Ordering */}
        <div className="col-md-6 mb-4">
          <div className="card shadow p-4 h-100">
            <h3 className="text-primary mb-3">Food Orders</h3>
            <div className="input-group mb-2">
              <input className="form-control" placeholder="User ID" type="number" value={order.userId || ''} onChange={e => setOrder({...order, userId: e.target.value})} />
              <input className="form-control" placeholder="Food ID" type="number" value={order.foodId} onChange={e => setOrder({...order, foodId: e.target.value})} />
              <input className="form-control" placeholder="Quantity" type="number" value={order.quantity} onChange={e => setOrder({...order, quantity: e.target.value})} />
              <button className="btn btn-success" onClick={() => apiRequest('POST', '/orders/placeorder', { userId: order.userId, foodId: order.foodId, quantity: order.quantity })}>Place Order</button>
            </div>
            
            <div className="input-group mb-2 mt-4">
              <input className="form-control" placeholder="Order ID" value={order.orderId} onChange={e => setOrder({...order, orderId: e.target.value})} />
              <button className="btn btn-info text-white" onClick={() => apiRequest('GET', `/orders/view/id/${order.orderId}`)}>View Order</button>
              <button className="btn btn-danger" onClick={() => apiRequest('GET', `/orders/cancel/${order.orderId}`)}>Cancel Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP (Brain of the logic) ---
function App() {
  const [page, setPage] = useState('login'); // login, admin, user
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  
  const [dataList, setDataList] = useState([]);
  const [viewTitle, setViewTitle] = useState('');

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

  const handleLogout = () => {
    setPage('login');
    setRole('');
    setToken('');
    setDataList([]);
    setViewTitle('');
  };

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
    } catch (error) {
      if (error.response && error.response.data) {
        setDataList(error.response.data);
        setViewTitle(`Error for: ${endpoint}`);
      } else {
        alert("Action failed!");
      }
    }
  };

  if (page === 'login') return <LoginView onLogin={handleLogin} />;

  return (
    <div className="container mt-5 pb-5">
      {/* Dashboard View */}
      {role === 'ROLE_ADMIN' ? (
        <AdminDashboard apiRequest={apiRequest} onLogout={handleLogout} />
      ) : (
        <UserDashboard apiRequest={apiRequest} onLogout={handleLogout} />
      )}

      {/* Universal Display Box for JSON Responses */}
      {viewTitle && (
        <div className="card shadow p-4 mt-4 bg-dark text-light">
          <h3 className="mb-3">{viewTitle}</h3>
          <pre style={{maxHeight: '400px', overflowY: 'auto', margin: 0}}>
            {typeof dataList === 'object' ? JSON.stringify(dataList, null, 2) : dataList}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
