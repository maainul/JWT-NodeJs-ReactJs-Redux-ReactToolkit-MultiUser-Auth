import React from "react";
import UserProfile from "../../auth/UserProfile";

export const Dashboard = () => {
  return (
    <>
      <UserProfile />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-500">
          Hello, Tailwind CSS!
        </h1>
      </div>
    </>
  );
};
