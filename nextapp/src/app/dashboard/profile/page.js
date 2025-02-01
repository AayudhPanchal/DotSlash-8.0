"use client";
import { useState } from "react";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    role: "User",
  });

  const [formData, setFormData] = useState({ ...user });

  const handleEditToggle = () => {
    setEditing(!editing);
    setFormData(user); // Reset form if canceled
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Profile</h2>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-600 dark:text-gray-300">Name</label>
          {editing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          ) : (
            <p className="text-gray-700 dark:text-gray-200">{user.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-600 dark:text-gray-300">Email</label>
          {editing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          ) : (
            <p className="text-gray-700 dark:text-gray-200">{user.email}</p>
          )}
        </div>

        {/* Role (Read-Only) */}
        <div>
          <label className="block text-gray-600 dark:text-gray-300">Role</label>
          <p className="text-gray-700 dark:text-gray-200">{user.role}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Save
            </button>
            <button
              onClick={handleEditToggle}
              className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEditToggle}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
