import { useEffect, useState } from "react";
import { useAuth } from "../Processing/AuthContext";
import GioHang from "../page/User/Gio_hang/GioHang";

const ProductAll = () => {
  const { products } = useAuth();
  const [visibleProducts, setVisibleProducts] = useState<number>(4);

  // Infinite scrolling functionality
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 150
    )
      setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 4);
    return;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const productCards = products
    .slice(0, visibleProducts)
    .map((product, index) => (
      <div
        className="col col-lg-3 col-md-4 col-6 mb-4 col-xl-2 product d-flex flex-column"
        key={`product-${index}`}
        onClick={() => (window.location.href = `/product/${product!.id}`)}
      >
        <div
          className="add_gio_hang"
          onClick={(event) => {
            event.stopPropagation();
            GioHang.addProduct(`${product!.id}`);
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
        </div>
      </div>
    ));

  return (
    <div>
      <div style={{ fontWeight: "100" }} className="m-3">
        <span
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
        >
          Home
        </span>
        <span className="mx-2">/</span>
        <span style={{ cursor: "pointer" }}>Product</span>
      </div>

      <div className="container my-3">
        <div className="d-flex justify-content-between">
          <h4 className="text-uppercase">Tất cả sản phẩm</h4>
        </div>
        <hr />
        <div className="container">
          <div className="row">{productCards}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductAll;
