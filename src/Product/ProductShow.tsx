import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Processing/AuthContext";
import GioHang from "../page/User/Gio_hang/GioHang";
import Product from "./Product";
import { db } from "../firebase";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import ProductNav from "./ProductNav";

const ProductShow = () => {
  const { pet, type, id } = useParams();
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const { GetDetailedPetProducts } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>(""); // Thêm biến trạng thái loading
  const addTableWithCustomId = async () => {
    const petTypeDoc = doc(db, "Pet_Type", "KRze3LHOtPJ5489EOQX6"); // Tạo tài liệu với ID tùy chỉnh

    try {
      await setDoc(petTypeDoc, {
        pet: ["dog", "cat"],
        type: ["food", "medicine", "bag", "cage", "shampoo"],
      });
    } catch (error) {
      console.error("Error adding pet type:", error);
    }
  };

  // Gọi hàm để thêm bảng với ID tùy chỉnh
  //addTableWithCustomId();
  const addBirdToPetType = async () => {
    const petTypeDoc = doc(db, "Pet_Type", "KRze3LHOtPJ5489EOQX6"); // Thay ID bằng ID tài liệu của bạn

    try {
      // Sử dụng arrayUnion để thêm 'bird' vào mảng pet
      await updateDoc(petTypeDoc, {
        pet: arrayUnion("bird"), // Thêm 'bird' vào mảng
      });
      console.log("Successfully added 'bird' to pet types!");
    } catch (error) {
      console.error("Error adding 'bird' to pet types:", error);
    }
  };

  // Gọi hàm để cập nhật
  //addBirdToPetType();
  useEffect(() => {
    const fetchProducts = async () => {
      if (!id || !pet || !type) {
        console.error("ID hoặc pet hoặc type không hợp lệ");
        setError("ID hoặc pet hoặc type không hợp lệ");
        return;
      }

      try {
        const result = await GetDetailedPetProducts(pet, type);
        setProducts(result);
        if (Array.isArray(result)) {
          const foundProduct = result.find((item) => item && item.id === id);
          setProduct(foundProduct || null);
        } else {
          console.error("Dữ liệu không phải là một mảng");
          setError("Dữ liệu không phải là một mảng");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        setError("Lỗi khi lấy dữ liệu sản phẩm:" + error);
      }
    };

    fetchProducts();
  }, [pet, type, id, GetDetailedPetProducts]);
  const LoadProductCard = Array.from({ length: 6 }, (_, index) => (
    <div
      className="col col-lg-3 col-md-4 col-6 mb-4 col-xl-2 product d-flex flex-column"
      key={`load-product-${index}`}
    >
      <div className="card flex-fill">
        <img
          src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
          className="card-img-top"
          alt={`Product ${index}`}
        />
        <div className="card-body">
          <div className="card-title m-0">...</div>
          <div className="card-text d-flex m-0">
            <p className="text-warning m-0">☆☆☆☆☆</p> (0)
          </div>
          <div className="card-text">
            <span className="text-danger">..$</span>
          </div>
        </div>
      </div>
    </div>
  ));
  let products_lienquan = products
    .filter((product) => product.id !== id)
    .map((product) => product);

  const productCards = products_lienquan.slice(0, 12).map((product, index) => (
    <div
      className="col col-lg-3 col-md-4 col-6 mb-4 col-xl-2 product d-flex flex-column"
      key={`product-${index}`}
      onClick={() =>
        navigate(`/product/${product.pet}/${product.type}/${product.id}`)
      } // Điều hướng bằng useNavigate
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
          src={`/image/vat_pham/${product.image}`}
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

  const select_quantity = () => {
    return Array.from({ length: 15 }, (_, index) => (
      <option key={`select-${index + 1}`} value={index + 1}>
        {index + 1}
      </option>
    ));
  };

  if (error !== "") {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "300px" }}
      >
        <h1 className="text-center">{error}</h1>
      </div>
    );
  }

  return (
    <div>
      <ProductNav />
      <div className="container my-3">
        <div className="row d-flex justify-content-center">
          <div className="col col-11 col-md-4 d-flex justify-content-center mb-2 mb-md-0">
            <img
              src={
                product
                  ? `/image/vat_pham/${product.image}`
                  : `https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif`
              }
              className="img-fluid"
              alt={`Product ${id}`}
            />
          </div>
          <div className="col col-11 col-md-8 container">
            {!product ? (
              <>
                <h3>...</h3>
                <p className="m-0">...</p>
                <p className="card-text d-flex m-0">
                  <span className="text-warning">☆☆☆☆☆</span> (0)
                </p>

                <p>
                  Giá: <span className="text-danger">..$</span>
                </p>
              </>
            ) : (
              <>
                <h3>{product.title}</h3>
                <p className="m-0">{product.note}</p>
                <p className="card-text d-flex m-0">
                  <span className="text-warning">☆☆☆☆☆</span> (0)
                </p>

                <p>
                  Giá: <span className="text-danger">{product.price}$</span>
                </p>
              </>
            )}
            <fieldset className="border p-2 my-2">
              <legend>Chọn số lượng</legend>
              <select
                id="quantity-select"
                className="btn border mx-2"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))} // Cập nhật số lượng
              >
                {select_quantity()}
              </select>
              {product && (
                <>
                  <span className="mx-2">Tồn kho: {product.quantity}</span>
                  <button
                    className="btn btn-info text-light mx-2"
                    onClick={() => {
                      GioHang.addProduct(`{${product.id}`, quantity); // Thêm số lượng sản phẩm
                    }}
                  >
                    Cho vào giỏ hàng
                  </button>
                </>
              )}
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
          <a href={`/product/${pet}/${type}`} className="d-none d-sm-block">
            Xem tất cả sản phẩm &gt;
          </a>
        </div>
        <hr />
        <div className="table-responsive">
          <div className="row flex-nowrap">
            {!product ? (
              <>{LoadProductCard}</>
            ) : (
              <>
                {products_lienquan.length !== 0 ? (
                  <>{productCards}</>
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: "250px" }}
                  >
                    Không có sản phẩm liên quan
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <button
          className="w-100 btn btn-primary d-sm-none text-uppercase rounded-pill"
          onClick={() => navigate(`/product/${pet}/${type}`)}
        >
          Xem tất cả sản phẩm &gt;
        </button>
      </div>
    </div>
  );
};

export default ProductShow;
