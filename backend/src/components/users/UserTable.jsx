import React from "react";

const UserTable = ({ users, loading, onEdit, onDelete }) => {
  if (loading && !users.length) return <p className="text-center py-3">Loading users...</p>;
  if (!users.length) return <div className="alert alert-info">No users found.</div>;

  return (
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge ${user.role === "Admin" ? "bg-purple text-dark" : "bg-secondary"}`}>
                  {user.role}
                </span>
              </td>
              <td>
                <span className={`badge ${user.status === "Active" ? "bg-success" : "bg-danger"}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(user.id)}
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
};

export default UserTable;