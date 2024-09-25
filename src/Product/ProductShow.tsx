import { useParams } from "react-router-dom";
import { useAuth } from "../Processing/AuthContext";
import GioHang from "../page/User/Gio_hang/GioHang";

const ProductShow = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, products } = useAuth();

  const productCards = products.slice(0, 12).map((product, index) => (
    <div
      className="col col-lg-3 col-md-4 col-6 mb-4 col-xl-2 product d-flex flex-column"
      key={`product-${index}`}
      onClick={() => (window.location.href = `/product/${product.id}`)}
    >
      <div
        className="add_gio_hang"
        onClick={(event) => {
          event.stopPropagation();
          GioHang.addProduct(`${product.id}`);
        }}
      >
        <button className="btn btn-primary">
          <i
            className="fa-solid fa-cart-shopping"
            style={{ fontSize: "20px" }}
          ></i>
        </button>
      </div>
      <div className="card flex-fill">
        <img
          src={`../image/vat_pham/${product.image}`}
          className="card-img-top"
          alt={`Product ${index}`}
        />
        <div className="card-body">
          <div className="card-title m-0">{product.title}</div>
          <div className="card-text d-flex m-0">
            <p className="text-warning m-0">☆☆☆☆☆</p> (0)
          </div>
          <div className="card-text">
            <span className="text-danger">{product.price}$</span>
          </div>
        </div>
      </div>
    </div>
  ));

  if (!id) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "300px" }}
      >
        <h1 className="text-center">ID sản phẩm không hợp lệ</h1>
      </div>
    );
  }

  const product = getProductById(id);
  if (!product) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "300px" }}
      >
        <h1 className="text-center">ID sản phẩm không tồn tại</h1>
      </div>
    );
  }

  const select_quantity = () => {
    return Array.from({ length: 15 }, (_, index) => (
      <option key={`select-${index + 1}`} value={index + 1}>
        {index + 1}
      </option>
    ));
  };

  return (
    <div>
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
            style={{ cursor: "pointer" }}
            onClick={() => (window.location.href = "/product")}
          >
            Products
          </span>
          <span className="mx-2">/</span>
          <span style={{ cursor: "pointer" }}>{product.title}</span>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col col-11 col-md-4 d-flex justify-content-center mb-2 mb-md-0">
            <img
              src={`../image/vat_pham/${product.image}`}
              className="img-fluid"
              alt={`Product ${id}`}
            />
          </div>
          <div className="col col-11 col-md-8 container">
            <h3>{product.title}</h3>
            <p className="m-0">{product.note}</p>
            <p className="card-text d-flex m-0">
              <span className="text-warning">☆☆☆☆☆</span> (0)
            </p>

            <p>
              Giá: <span className="text-danger">{product.price}$</span>
            </p>
            <fieldset className="border p-2 my-2">
              <legend>Chọn số lượng</legend>
              <select id="quantity-select" className="btn border mx-2">
                {select_quantity()}
              </select>
              <span className="mx-2">Tồn kho: {product.quantity}</span>
              <button
                className="btn btn-info text-light mx-2"
                onClick={() => {
                  GioHang.addProduct(`${product.id}`);
                }}
              >
                Cho vào giỏ hàng
              </button>
              <button className="btn btn-outline-primary mx-2 mt-2 mt-lg-0">
                Đặt mua
              </button>
            </fieldset>
          </div>
        </div>
      </div>
      <hr className="border border-3 border-secondary mx-5" />

      <div className="container my-3">
        <div className="d-flex justify-content-between">
          <h4 className="text-uppercase">Sản phẩm khác</h4>
          <a href="/products" className="d-none d-sm-block">
            Xem tất cả sản phẩm &gt;
          </a>
        </div>
        <hr />
        <div className="table-responsive">
          <div className="row flex-nowrap">{productCards}</div>
        </div>

        <button
          className="w-100 btn btn-primary d-sm-none text-uppercase rounded-pill"
          onClick={() => {
            window.location.href = "/products";
          }}
        >
          Xem tất cả sản phẩm &gt;
        </button>
      </div>
    </div>
  );
};

export default ProductShow;
