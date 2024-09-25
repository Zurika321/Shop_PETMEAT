import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useAuth } from "../../Processing/AuthContext";
import AuthPage from "./login-sigin";

const LoginPage: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div
      style={{
        backgroundImage: "url('image/backgroud_login.jpg')",
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
        backgroundPosition: "center",
      }}
    >
      <nav className="col col-12 col-sm-auto order-md-0 bg-primary mb-2 d-flex justify-content-between">
        <Link to="/#" className="me-3 btn btn-primary">
          Quay về
        </Link>

        {isAuthenticated && (
          <button className="btn btn-danger" onClick={logout}>
            Đăng xuất
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </div>
  );
};

export default LoginPage;
