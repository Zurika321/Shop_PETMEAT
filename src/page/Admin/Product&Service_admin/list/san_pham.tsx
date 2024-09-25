import React from "react";
import { useAuth } from "../../../../Processing/AuthContext";

const SanPham = () => {
  const { products } = useAuth();

  const productTable = products.slice(0, 12).map((product, index) => (
    <tr key={`productTable - ${index}`}>
      <td>{product.id}</td>
      <td>{product.title}</td>
      <td>{product.quantity}</td>
      <td>{product.price}</td>
      <td>
        <button className="btn btn-outline-primary btn-sm me-2">
          <i className="fas fa-pen-to-square"></i>
        </button>
        <button className="btn btn-outline-danger btn-sm">
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">
            Danh sách <span className="text-primary">sản phẩm</span>
          </h2>
          <button className="btn btn-primary">
            <i className="fas fa-plus"></i> Add
          </button>
        </div>
        <div
          className="table-responsive"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          <table className="table table-bordered table-hover">
            <thead className="bg-light">
              <tr>
                <th>#id</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{productTable}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SanPham;
