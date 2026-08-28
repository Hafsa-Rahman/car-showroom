import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../redux/users/userActions";
import {
  selectUsers,
  selectUsersLoading,
  selectUsersError,
  selectUsersSuccess,
} from "../../redux/users/userSelectors";
import UserForm from "../../components/users/UserForm";
import UserTable from "../../components/users/UserTable";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const success = useSelector(selectUsersSuccess);

  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResetForm = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", role: "User", status: "Active" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, payload: form }));
    } else {
      dispatch(createUser(form));
    }
    handleResetForm();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">User Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Operation completed successfully.</div>}

      <div className="row">
        <div className="col-lg-4">
          <UserForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            editingUser={editingUser}
            loading={loading}
            onCancel={handleResetForm}
          />
        </div>
        <div className="col-lg-8">
          <UserTable
            users={users}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;