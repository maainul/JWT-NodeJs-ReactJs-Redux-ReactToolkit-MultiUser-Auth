import ProtectedRoute from "./ProtectedRoute";
import { Error } from "./pages/Error";
import { Login } from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import BlogDetails from "./pages/blog/BlogDetails";
import BlogForm from "./pages/blog/BlogForm";
import Blogs from "./pages/blog/Blogs";
import { Dashboard } from "./pages/layout/dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./pages/layout/dashboard/MainLayout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { autoLogout, logout, setUserData } from "./features/auth/authSlice";
import UserProfile from "./pages/auth/UserProfile";
import Cookies from "js-cookie";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const token = Cookies.get("authToken");
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (userData && token) {
      const parsedUserData = JSON.parse(userData);
      const currentTime = Date.now();
      if (tokenExpiry && currentTime < tokenExpiry) {
        // Token is valid; set user data in the Redux store
        dispatch(setUserData({ data: parsedUserData, token }));
      } else {
        // Token is expired; log the user out
        dispatch(logout());
      }
    } else {
      // No token or user data; log the user out
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public Routes */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/blog/list"
            element={
              <MainLayout>
                <Blogs />
              </MainLayout>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Registration />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/create"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <BlogForm />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/blog/show/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <BlogDetails />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <UserProfile />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/add"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <BlogForm />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
