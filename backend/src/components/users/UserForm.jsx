import React from "react";

const UserForm = ({ form, onChange, onSubmit, editingUser, loading, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="card p-3 mb-4 shadow-sm">
      <h5 className="mb-3">{editingUser ? "Edit User" : "Add New User"}</h5>
      <input
        className="form-control mb-2"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={onChange}
        required
      />
      <input
        className="form-control mb-2"
        name="email"
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={onChange}
        required
      />
      <select
        className="form-select mb-2"
        name="role"
        value={form.role}
        onChange={onChange}
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
      <select
        className="form-select mb-3"
        name="status"
        value={form.status}
        onChange={onChange}
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <div className="d-flex gap-2">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Processing..." : editingUser ? "Update User" : "Add User"}
        </button>
        {editingUser && (
          <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;