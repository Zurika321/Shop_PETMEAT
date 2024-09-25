// NotFoundPage.tsx
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center border rounded p-5 bg-warning">
        <h1>404</h1>
        <p>Trang không tìm thấy.</p>
        <a href="/">Quay lại trang chủ</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
