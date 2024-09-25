import { useAuth } from "../../../Processing/AuthContext";
import GioHang from "./GioHang";

const GioHangPage = () => {
  const { getProductById } = useAuth();
  const gio_hang = GioHang.getGioHang();

  const productList = gio_hang
    .map((id) => getProductById(id))
    .filter((product) => product !== null);

  if (productList.length === 0) {
    return (
      <div className="container my-3">
        <div style={{ fontWeight: "100" }} className="col col-12 mb-3">
          <span
            onClick={() => (window.location.href = "/")}
            style={{ cursor: "pointer" }}
          >
            Home
          </span>
          <span className="mx-2">/</span>
          <span style={{ cursor: "pointer" }}>Giỏ hàng</span>
        </div>
        <h3>Chọn hàng bạn muốn mua</h3>
        <div
          className="row text-center align-items-center"
          style={{ height: "200px" }}
        >
          <h4>Chưa có sản phẩm trong giỏ hàng</h4>
        </div>
      </div>
    );
  }

  const productCards = productList.map((product, index) => (
    <div
      className="col col-lg-3 col-md-4 col-6 mb-4 col-xl-2 d-flex flex-column"
      key={`product-${index}`}
      onClick={() => (window.location.href = `/product/${product!.id}`)}
    >
      <div className="card flex-fill position-relative">
        <img
          src={`../image/vat_pham/${product!.image}`}
          className="card-img-top"
          alt={`Product ${index}`}
        />
        <div className="card-body">
          <div className="card-title m-0">{product!.title}</div>
          <div className="card-text d-flex m-0">
            <p className="text-warning m-0">☆☆☆☆☆</p> (0)
          </div>
          <div className="card-text">
            <span className="text-danger">{product!.price}$</span>
          </div>
        </div>
        <div
          className="form-check position-absolute"
          style={{ bottom: "10px", right: "15px", zIndex: 1 }}
        >
          <input
            type="checkbox"
            className="form-check-input"
            id={`customCheck-${index}`}
            style={{ accentColor: "#0d6efd", width: "25px", height: "25px" }}
            onClick={(event) => {
              event.stopPropagation();
              //
            }}
          />
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="container my-3">
        <div style={{ fontWeight: "100" }} className="col col-12 mb-3">
          <span
            onClick={() => (window.location.href = "/")}
            style={{ cursor: "pointer" }}
          >
            Home
          </span>
          <span className="mx-2">/</span>
          <span
            onClick={() => (window.location.href = `/gio_hang`)}
            style={{ cursor: "pointer" }}
          >
            Giỏ hàng
          </span>
        </div>
        <h3>Chọn hàng bạn muốn mua</h3>
        <div className="row">
          {productCards}
          <div className="col col-12 justify-content-center">
            <div className="float-end">
              <p className="d-inline">
                Tổng bill: <span className="text-danger">0</span>$
              </p>
              <button className="btn btn-outline-primary ms-2 mb-2 d-inline">
                Đặt mua
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GioHangPage;
