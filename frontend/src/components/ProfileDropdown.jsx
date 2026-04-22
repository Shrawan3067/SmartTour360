import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProfileDropdown = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(formData);
      
      if (result.success) {
        // Reset form
        setFormData({ email: "", password: "", name: "", phone: "" });
        setIsLoading(false);
        onClose();
      } else {
        setIsLoading(false);
        alert("Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      setIsLoading(false);
      alert("Authentication failed. Please try again.");
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[98] bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Dropdown */}
      <div className="fixed top-16 right-4 left-4 md:left-auto md:right-6 z-[99] bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-2xl max-w-sm mx-auto md:mx-0">
        {user ? (
          /* User Profile View */
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Profile</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl">
                {user.avatar}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400">Member since {user.memberSince}</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              <button
                onClick={() => handleNavigate("/bookings")}
                className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <span className="text-gray-700">My Bookings</span>
              </button>

              <button
                onClick={() => handleNavigate("/wishlist")}
                className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span className="text-gray-700">Wishlist</span>
              </button>

              <button
                onClick={() => handleNavigate("/settings")}
                className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-gray-700">Settings</span>
              </button>

              <button
                onClick={() => handleNavigate("/support")}
                className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-700">Help & Support</span>
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full mt-6 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-semibold"
            >
              Sign Out
            </button>
          </div>
        ) : (
          /* Login/Signup View */
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                {isLoginMode ? "Sign In" : "Sign Up"}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setIsLoginMode(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors ${
                  isLoginMode
                    ? "bg-white text-amber-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLoginMode(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors ${
                  !isLoginMode
                    ? "bg-white text-amber-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLoginMode}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              {!isLoginMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isLoginMode ? "Signing In..." : "Creating Account..."}
                  </div>
                ) : (
                  isLoginMode ? "Sign In" : "Sign Up"
                )}
              </button>
            </form>

            {/* Terms */}
            {!isLoginMode && (
              <p className="text-xs text-gray-500 mt-4 text-center">
                By signing up, you agree to our{" "}
                <button
                  onClick={() => handleNavigate("/terms")}
                  className="text-amber-600 hover:underline"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  onClick={() => handleNavigate("/privacy")}
                  className="text-amber-600 hover:underline"
                >
                  Privacy Policy
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileDropdown;
