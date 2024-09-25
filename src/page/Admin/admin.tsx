import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ProductAdmin from "./Product&Service_admin/index";
import HomeAdmin from "./Home_admin";
import HistoryAdmin from "./History_admin";

const AdminPage = () => {
  return (
    <>
      {/* Header luôn được hiển thị */}
      <header className="bg-primary text-white py-3">
        <div className="container">
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col col-auto order-md-first">
              <h1 className="mb-0">Admin Page</h1>
            </div>
            <div className="col col-auto order-md-1">
              <div
                className="mb-0 d-flex"
                onClick={() => {
                  window.location.href = "/#";
                }}
                style={{ cursor: "pointer" }}
              >
                <p className="d-none d-sm-block m-0"> Back To User Page</p>
                <i className="fa-solid fa-right-from-bracket mt-1 ms-1"></i>
              </div>
            </div>
            <nav className="col col-12 col-sm-auto order-md-0">
              <Link to="/admin/home" className="text-white me-2 me-sm-3">
                Home
              </Link>
              <Link to="/admin/product" className="text-white me-2 me-sm-3">
                Product&Service
              </Link>
              <Link to="/admin/history" className="text-white">
                History
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Chỉ nội dung chính bên dưới thay đổi khi chuyển route */}
      <div className="container mt-4">
        <Routes>
          <Route path="home" element={<HomeAdmin />} />
          <Route path="product" element={<ProductAdmin />} />
          <Route path="history" element={<HistoryAdmin />} />
        </Routes>
      </div>
    </>
  );
};

export default AdminPage;
