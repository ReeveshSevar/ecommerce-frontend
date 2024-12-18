import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../../State/Auth/Action';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const handleLogout = () => {
    dispatch(logout())  
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-teal-300 to-pink-300 py-10 flex justify-center items-center">
      <div className="bg-gradient-to-r from-white via-indigo-100 to-indigo-10 p-8 rounded-lg shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-center text-indigo-700 mb-8">User Profile</h1>

        <div className="space-y-6">
          <div className="flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-md">
            <p className="font-semibold text-lg text-gray-900">User ID:</p>
            <p className="text-gray-700">{auth.user?.userId || 'N/A'}</p>
          </div>

          <div className="flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-md">
            <p className="font-semibold text-lg text-gray-900">First Name:</p>
            <p className="text-gray-700">{auth.user?.firstName || 'N/A'}</p>
          </div>

          <div className="flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-md">
            <p className="font-semibold text-lg text-gray-900">Last Name:</p>
            <p className="text-gray-700">{auth.user?.lastName || 'N/A'}</p>
          </div>

          <div className="flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-md">
            <p className="font-semibold text-lg text-gray-900">Email:</p>
            <p className="text-gray-700">{auth.user?.email || 'N/A'}</p>
          </div>

          <div className="flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-md">
            <p className="font-semibold text-lg text-gray-900">Roles:</p>
            <p className="text-gray-700">{auth.user?.roles.slice(5) || 'N/A'}</p>
          </div>

          <div className="flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-md">
            <p className="font-semibold text-lg text-gray-900">Address:</p>
            <p className="text-gray-700">{auth.user?.address?.[0]?.streetAddress || 'N/A'}</p>
          </div>

          <div className="flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-md">
            <p className="font-semibold text-lg text-gray-900">Mobile:</p>
            <p className="text-gray-700">{auth.user?.mobile || 'N/A'}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            className="bg-gradient-to-r from-indigo-500 to-teal-500 text-white px-6 py-2 rounded-full hover:from-indigo-600 hover:to-teal-600 transition duration-300"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>

  );
};

export default Profile;
