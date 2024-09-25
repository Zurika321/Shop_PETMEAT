import GioHang from "../../Gio_hang/GioHang";
import { useAuth } from "../../../../Processing/AuthContext";

const MainUser = () => {
  const { products } = useAuth();

  const productCards = products.slice(0, 12).map((product, index) => (
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

  const ServiceCards = Array.from({ length: 4 }, (_, index) => (
    <div
      className="col col-lg-3 col-12 col-md-6 col-12 mb-4"
      key={`service-${index}`}
    >
      <div className="card">
        <img
          src="image/Tips_nuoi_pet/tri_ve_cho_pet.jpg"
          className="card-img-top"
          alt={`Service ${index}`}
        />
        <div className="card-body">
          <div className="card-title" style={{ fontWeight: "bold" }}>
            Chích Ngừa Cho Chó: Bảo Vệ Sức Khỏe Thú Cưng Của Bạn.
          </div>
          <div className="card-text" style={{ fontWeight: "100" }}>
            Chích ngừa cho chó giúp ngăn ngừa các bệnh nguy hiểm và tăng thời
            gian sống thọ...
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <main className="fs-6 fs-md-5 fs-lg-4">
        {/* Sự kiện */}
        <section className="container mb-3 mt-3">
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col col-lg-4 col-md-4 p-2 order-2">
              <div className="rounded border h-100 p-2">
                <img
                  src="image/logo/MR_Hai.jpg"
                  alt=""
                  className="img-fluid w-100"
                />
                <h5 className="float-end">Mr.Hải</h5>
              </div>
            </div>
            <div className="col col-lg-8 col-md-8 p-2 order-first">
              <div className="card rounded border">
                <div className="card-body">
                  <h3 className="text-center card-title">
                    Mừng sự kiện tân shop PET-MEAT tri ân khách hàng mua 1 được
                    2.
                  </h3>
                  <p className="card-text">
                    Chào mừng sự kiện khai trương cửa hàng PET-MEAT, chúng tôi
                    tự hào giới thiệu chương trình khuyến mãi hấp dẫn: giảm ngay
                    10% cho tất cả sản phẩm khi mua bất kỳ món đồ nào tại shop.
                    Đây là cơ hội không thể bỏ lỡ để bạn mang về những sản phẩm
                    chăm sóc thú cưng chất lượng cao, từ thức ăn, phụ kiện đến
                    đồ chơi, với mức giá ưu đãi. Sự kiện đặc biệt này được tổ
                    chức bởi ông Nguyễn Hoàng Phi Hải, chủ cửa hàng PET-MEAT,
                    người luôn tận tâm trong việc cung cấp những sản phẩm tốt
                    nhất cho vật nuôi. Với kinh nghiệm và niềm đam mê trong việc
                    chăm sóc thú cưng, ông Hải mong muốn PETMEAT trở thành nơi
                    mà mọi khách hàng đều có thể tìm thấy những giải pháp tuyệt
                    vời cho người bạn bốn chân của mình. Hãy đến ngay PETMEAT để
                    không chỉ mua sắm những món đồ yêu thích mà còn hưởng ưu đãi
                    lớn nhân dịp khai trương!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gian hàng */}
        <section className="container my-5">
          <div className="d-flex justify-content-between">
            <h2 className="text-uppercase">Sản phẩm bán chạy</h2>
            <a href="/product" className=" d-none d-sm-block">
              Xem tất cả sản phẩm &gt;
            </a>
          </div>
          <hr />
          <div className="row">{productCards}</div>
          <button
            className="w-100 btn btn-primary d-sm-none text-uppercase rounded-pill"
            onClick={() => {
              window.location.href = "/products";
            }}
          >
            Xem tất cả sản phẩm &gt;
          </button>
        </section>
        {/* Dịch vụ */}
        <section className="container my-5">
          <div className="d-flex justify-content-between">
            <h2 className="text-uppercase">Một số dịch vụ</h2>
            <a href="/#" className="d-none d-sm-block">
              Xem tất cả dịch vụ &gt;
            </a>
          </div>
          <hr />
          <div className="row">{ServiceCards}</div>
          <button className="w-100 btn btn-primary d-sm-none text-uppercase rounded-pill">
            Xem tất cả dịch vụ &gt;
          </button>
        </section>
      </main>
    </>
  );
};

export default MainUser;
