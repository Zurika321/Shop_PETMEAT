import React from "react";

const HomeAdmin = () => {
  return (
    <>
      <div>
        <h1>Hello Admin</h1>
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">
              Đơn hàng cần <span className="text-primary">xác nhận</span>
            </h2>
          </div>

          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <table className="table table-bordered table-hover">
              <thead className="bg-light">
                <tr>
                  <th>Order id</th>
                  <th>Product</th>
                  <th>Time</th>
                  <th>Payment method</th>
                  <th>Total Bill</th>
                  <th>Confirm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Chuồng pet x1</td>
                  <td>18:00 05/10/2024</td>
                  <td>Momo</td>
                  <td>
                    100.000 <span>đ</span>
                  </td>
                  <td>
                    <button className="btn btn-outline-primary btn-sm me-2">
                      xác nhận
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Thức ăn pet x3, sữa tắm cho pet x1</td>
                  <td>18:00 05/10/2024</td>
                  <td>Tiền mặt</td>
                  <td>
                    100.000 <span>đ</span>
                  </td>
                  <td>
                    <button className="btn btn-outline-primary btn-sm me-2">
                      đã xác nhận
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
