import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users") // backend API
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div>
      <h2>Users from Backend</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} ({u.email}) – {u.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
