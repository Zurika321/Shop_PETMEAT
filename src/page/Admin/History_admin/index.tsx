import React from "react";

const HistoryAdmin = () => {
  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">
            Lịch sử <span className="text-primary">mua hàng</span>
          </h2>
        </div>
        <div
          className="table-responsive"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          <table className="table table-bordered table-hover">
            <thead className="bg-light">
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Time Order</th>
                <th>Time of receipt</th>
                <th>Payment Method</th>
                <th>Total Bill</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Chuồng pet x1</td>
                <td>18:00 05/10/2024</td>
                <td>20:00 05/10/2024</td>
                <td>Momo</td>
                <td>
                  100.000 <span>đ</span>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Thức ăn pet x3, sữa tắm cho pet x1</td>
                <td>18:00 05/10/2024</td>
                <td>19:30 05/10/2024</td>
                <td>Tiền mặt</td>
                <td>
                  300.000 <span>đ</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HistoryAdmin;
