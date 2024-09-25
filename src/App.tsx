import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/User/Home_Page/HomePage";
import AdminPage from "./page/Admin/admin";
import GioHangPage from "./page/User/Gio_hang/gio_hang";
import LoginPage from "./page/Login-Sigin/index";
import ProtectedRoute from "./Processing/ProtectedRoute";
import ProductShow from "./Product/ProductShow";
import MainUser from "./page/User/Home_Page/main/main";
import { AuthProvider } from "./Processing/AuthContext";
import NotFoundPage from "./Notfound";
import ProductAll from "./Product/AllProduct";
import GioiThieuPage from "./Gioi_thieu/GioiThieuPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<MainUser />} />
          <Route path="product" element={<ProductAll />} />
          <Route path="product/:id" element={<ProductShow />} />
          <Route path="gio_hang" element={<GioHangPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="GioiThieu" element={<GioiThieuPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
