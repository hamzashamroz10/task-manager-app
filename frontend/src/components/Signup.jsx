import React, { useState } from 'react';
import { UserPlus, Mail, Lock } from 'lucide-react';
import axios from 'axios';

const API_URL = 'https://task-manager-app-d383.vercel.app';
const INITTIAL_FORM = { name: "", email: "", password: "" };

const FIELDS = [
  {
    name: "name",
    type: "text",
    placeholder: "Full Name",
    icon: UserPlus,
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email Address",
    icon: Mail,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    icon: Lock,
  },
];

const MESSAGE_SUCCESS = "bg-green-100 text-green-700 p-2 rounded text-sm mb-4";
const MESSAGE_ERROR = "bg-red-100 text-red-700 p-2 rounded text-sm mb-4";

const BUTTONCLASSES =
  "w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex justify-center items-center gap-2 transition-colors disabled:opacity-50";

const Signup = ({ onSwitchMode }) => {
  const [formData, setFormData] = useState(INITTIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const { data } = await axios.post(`${API_URL}/api/user/register`, formData);
      console.log("Signup successful", data);
      setMessage({
        text: "Registration successful! You can now log in.",
        type: "success",
      });
      setFormData(INITTIAL_FORM);
    } catch (err) {
      console.error("signup error", err);
      setMessage({
        text:
          err.response?.data.message ||
          "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg border-purple-100 rounded-xl p-6 sm:p-8">
        <div className="mb-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join to manage your tasks</p>
        </div>

        {message.text && (
          <div className={message.type === "success" ? MESSAGE_SUCCESS : MESSAGE_ERROR}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {FIELDS.map(({ name, type, placeholder, icon: Icon }) => (
            <div key={name} className="flex items-center border rounded px-3 py-2">
              <Icon className="text-purple-500 w-5 h-5 mr-2" />
              <input
                type={type}
                placeholder={placeholder}
                value={formData[name]}
                onChange={(e) =>
                  setFormData({ ...formData, [name]: e.target.value })
                }
                className="w-full focus:outline-none text-sm text-gray-700"
                required
              />
            </div>
          ))}

          <button type="submit" className={BUTTONCLASSES} disabled={loading}>
            {loading ? "Signing Up..." : (
              <>
                <UserPlus className="w-4 h-4" /> Sign up
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={onSwitchMode}
            className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
