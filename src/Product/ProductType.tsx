import { useEffect, useState } from "react";
import { useAuth } from "../Processing/AuthContext";
import GioHang from "../page/User/Gio_hang/GioHang";
import Product from "./Product";
import { useParams } from "react-router-dom";
import ProductNav from "./ProductNav";

const ProductType = () => {
  const { pet, type } = useParams();
  const { GetDetailedPetProducts, getListPet_Type, AllProducts } = useAuth();
  const [visibleProducts, setVisibleProducts] = useState<number>(6);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMoreProducts, setHasMoreProducts] = useState<boolean>(true); // Thêm biến trạng thái
  const [endProduct, setEndProduct] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Thêm biến trạng thái loading

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const petsAndTypes = await getListPet_Type(); // Gọi hàm lấy danh sách thú cưng và loại

      if (!petsAndTypes) {
        setEndProduct("Không thể fetch pet và types.");
        setHasMoreProducts(false);
        return;
      }

      const listPets: string[] = petsAndTypes[0] || [];
      const types: string[] = petsAndTypes[1] || [];

      if (listPets.length === 0 || types.length === 0) {
        setEndProduct("Không tìm thấy danh sách");
        setHasMoreProducts(false);
        return;
      }

      if (!pet || !type) {
        if (pet) {
          const index_listPets = listPets.indexOf(pet);
          if (index_listPets === -1) {
            setEndProduct(`Không tìm thấy danh sách pet: ${pet}`);
            setHasMoreProducts(false);
            return;
          }
          const allProducts = await AllProducts(visibleProducts, [pet], types);
          setProducts(allProducts);
          setLoading(false);
          if (!allProducts) {
            setHasMoreProducts(false); // Đánh dấu là không còn sản phẩm
            setEndProduct("Lỗi khi lấy dữ liệu pet!");
            setLoading(false);
            return;
          }

          setProducts(allProducts);
          setLoading(false);

          // Kiểm tra xem còn sản phẩm không
          if (allProducts.length < visibleProducts) {
            setHasMoreProducts(false); // Đánh dấu là không còn sản phẩm
            setEndProduct("Đã hết sản phẩm để loading!");
          }
          return;
        }
        console.error("pet hoặc type không hợp lệ");
        setEndProduct("pet hoặc type không hợp lệ");
        return;
      }

      const index_listPets = listPets.indexOf(pet);
      if (index_listPets === -1) {
        setEndProduct(`Không tìm thấy danh sách pet: ${pet}`);
        setHasMoreProducts(false);
        return;
      }
      const index_types = types.indexOf(type);
      if (index_types === -1) {
        setEndProduct(`Không tìm thấy danh sách type ${type} trong pet ${pet}`);
        setHasMoreProducts(false);
        return;
      }
      const result = await GetDetailedPetProducts(pet, type);
      setProducts(result);
      setLoading(false);

      // Kiểm tra xem còn sản phẩm không
      if (result.length < visibleProducts) {
        setHasMoreProducts(false); // Đánh dấu là không còn sản phẩm
        setEndProduct("Đã hết sản phẩm để loading!");
      }
    };

    fetchProducts();
  }, [visibleProducts]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      // Chỉ thêm sản phẩm nếu còn sản phẩm để tải
      if (hasMoreProducts) {
        setLoading(true);
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMoreProducts]); // Thêm hasMoreProducts vào dependencies

  const LoadProductCard = Array.from({ length: 6 }, (_, index) => (
    <div
      className="col col-lg-3 col-md-4 col-6 mb-4 col-xl-2 product d-flex flex-column"
      key={`no-product-${index}`}
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

  const productCards = products.map((product, index) => (
    <div
      className="col col-lg-3 col-md-4 col-6 mb-4 col-xl-2 product d-flex flex-column"
      key={`product-${index}`}
      onClick={() =>
        (window.location.href = `/product/${product.pet}/${product.type}/${product.id}`)
      }
    >
      <div
        className="add_gio_hang"
        onClick={(event) => {
          event.stopPropagation();
          GioHang.addProduct(`${product.id}`, 1);
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

  return (
    <div>
      <ProductNav />
      <div className="container my-3">
        <div className="d-flex justify-content-between">
          <h4 className="text-uppercase">Tất cả sản phẩm</h4>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            {productCards}
            {loading && (
              <>
                {!hasMoreProducts ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "250px" }}
                  >
                    <h3>{endProduct}</h3>
                  </div>
                ) : (
                  <>{LoadProductCard}</>
                )}
              </>
            )}
          </div>
          <div className="row text-center">
            {!loading && <h3>{endProduct}</h3>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductType;
