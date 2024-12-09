import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  // Accessing the user data from Redux store
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="profile">
      {user ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Please log in to see your profile information.</p>
      )}
    </div>
  );
};

export default UserProfile;
