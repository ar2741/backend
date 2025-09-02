import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminFileManager.css";

const AdminFileManager = ({ users = [] }) => {
  const navigate = useNavigate();

  const handleEdit = (user) => {
    navigate("/AddFiles", { state: { user } }); // Pass user info to AddFiles
  };



  return (
    <>
      {/* ✅ Top Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="logo">
            File Manager
          </a>
        </div>
        <div className="navbar-center">
          <ul className="nav-links">
            <li>
              <Link to="/AddFiles">Add files</Link>
            </li>
            <li>
              <Link to="/AddFilesNotifications">Notifications</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <a href="/Adminlogin">Logout</a>
          <a href="/account" className="user-icon">
            <i className="fas fa-user"></i>
          </a>
        </div>
      </nav>

      {/* ✅ User Table Section */}
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-bold mb-4">User List</h2>
        {users.length === 0 ? (
          <p>No users available.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">AD Group</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2">{u.name}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">{u.adGroup}</td>
                  <td className="border p-2">{u.status}</td>
                  <td className="border p-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEdit(u)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AdminFileManager;
