import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Processing/AuthContext";

const HeaderUser: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const LinkPage_Nav = [
    { text: "Đặt mua hàng", value: "#first_header" },
    { text: "Lịch sử mua hàng", value: "#first_header" },
    { text: "Dịch vụ thú cưng", value: "#first_header" },
    { text: "Tạp chí thú cưng", value: "#first_header" },
    { text: "Đăng nhập/ký", value: "/login" },
    { text: "Giới thiệu", value: "#first_header" },
    { text: "Khách hàng", value: "#first_header" },
    { text: "Tuyển dụng", value: "#first_header" },
    { text: "Giao hàng", value: "#first_header" },
    { text: "Tích điểm", value: "#first_header" },
    { text: "Đổi trả", value: "#first_header" },
  ];
  const { isAuthenticated, NameUser, logout } = useAuth();
  const toggleMenu = () => {
    const menuElement = document.getElementById("list_menu");
    if (menuElement) {
      if (!isOpen) {
        setTimeout(() => {
          menuElement.classList.remove("transition-x-full");
        }, 300);
      } else {
        menuElement.classList.add("transition-x-full");
      }
    }
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(!isOpen);
      }, 300);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const [openBoxDX, setOpenBoxDX] = useState<boolean>(false);
  const toggleBoxDX = () => {
    setOpenBoxDX(!openBoxDX);
    toggleMenu();
  };

  const BoxDX = (
    <div
      className="position-fixed d-flex justify-content-center align-items-center"
      style={{
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: "RGB(0,0,0,0.2)",
        zIndex: "302",
      }}
      onClick={() => {
        toggleBoxDX();
      }}
    >
      <div className="bg-white text-center p-3">
        <h4> Bạn có muốn đăng xuất ?</h4>
        <div className="d-flex justify-content-between">
          <button
            onClick={(even) => {
              even.preventDefault();
              toggleBoxDX();
              logout();
            }}
            className="btn btn-outline-light text-danger"
          >
            Đăng xuất
          </button>
          <button
            onClick={(even) => {
              even.preventDefault();
              toggleBoxDX();
            }}
            className="btn btn-primary"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div>
        <div
          className="bg-dark position-relative text-light d-flex align-items-center justify-content-center"
          style={{ minHeight: "30px", height: "auto" }}
          id="first_header"
        >
          <p className="mb-0 text-uppercase">
            Hệ thống cửa hàng thú cưng Pet Meat
          </p>
          <div
            className="position-absolute d-none d-sm-flex"
            style={{ right: "10px", top: "5px" }}
          >
            <div className="icon" data-note="Follow on Facebook">
              <i className="fa-brands fa-facebook"></i>
            </div>
            <div className="icon" data-note="Follow on TikTok">
              <i className="fa-brands fa-tiktok"></i>
            </div>
          </div>
        </div>

        {/* Header chính */}
        <header>
          <div className="row row-cols-3 row-cols-lg-4 bg-primary d-flex justify-content-center">
            <div className="col col-3 col-lg-auto order-lg-2 d-flex align-items-center mb-2 mt-2">
              <button
                className="btn w-100 text-center border border-white btn-primary"
                type="button"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="toggleContent"
              >
                <i className="fa-solid fa-bars d-inline mx-md-1"></i>
                <p className="d-none d-sm-inline">Menu</p>
              </button>
            </div>
            <div className="col col-5 col-lg-auto order-lg-first d-flex justify-content-center align-items-center mb-2 mt-2 p-0">
              <img
                src="/image/logo/thuong_hieu.png"
                alt="Logo thương hiệu"
                className="img-fluid"
                style={{ maxHeight: "50px" }}
              />
            </div>
            <div className="col col-3 col-lg-auto order-lg-3 d-flex align-items-center">
              <div className="w-100 d-flex justify-content-center mb-2 mt-2">
                <Link
                  className="btn btn-outline-light w-100 "
                  to="/gio_hang"
                  aria-label="Giỏ hàng"
                >
                  <p className="d-md-inline d-none">Giỏ Hàng</p>
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
              </div>
            </div>
            <div
              id="input_search"
              className="col col-11 col-lg-5 col-xl-6 col-xxl-7 w-lg-100 order-lg-1 d-flex align-items-center mb-2 mt-2"
            >
              <input
                type="text"
                className="w-100"
                placeholder="Tìm kiếm thông tin ở đây"
                style={{ height: "35px" }}
              />
              <div className="bg-white">
                <i
                  className="fa-solid fa-magnifying-glass text-primary d-flex justify-content-center align-items-center"
                  style={{ fontSize: "20px", width: "45px", height: "33.5px" }}
                ></i>
              </div>
            </div>
            <div className="col w-100 col-12 d-none d-md-flex order-last">
              {LinkPage_Nav.slice(0, 4).map((item) => (
                <a
                  key={`nav_link_1 - ${item.text}`}
                  href={item.value}
                  className="mx-1 btn btn-primary p-0 px-2"
                  style={{ height: "25px", textDecoration: "none" }}
                >
                  {item.text}
                </a>
              ))}
              {!isAuthenticated && (
                <a href="/login" className="mx-1 btn btn-primary p-0 px-2">
                  Đăng nhập/ký
                </a>
              )}
              {isAuthenticated && NameUser === "admin" && (
                <a href="/admin/home" className="mx-1 btn btn-primary p-0 px-2">
                  admin
                </a>
              )}
            </div>
          </div>

          {/* Nội dung menu toggle */}
          {isOpen && (
            <div id="tongle_Menu">
              <div id="menu">
                <button
                  id="close_menu"
                  type="button"
                  onClick={toggleMenu}
                  aria-expanded={isOpen}
                  aria-controls="toggleContent"
                  aria-label={isOpen ? "Close Menu" : "Open Menu"}
                ></button>
                <div id="list_menu">
                  <div id="list_menu_1">
                    <div style={{ backgroundColor: "rgb(240,240,240)" }}>
                      {!isAuthenticated ? (
                        <button className="btn btn-light w-100">
                          <a href="/login" className="btn">
                            Đăng nhập/ký
                          </a>
                        </button>
                      ) : (
                        <div className="d-flex align-items-center position-relative">
                          <img
                            src="/image/user.svg"
                            alt="User Profile"
                            style={{
                              width: "50px",
                              borderRadius: "50%",
                              margin: "15px 5px 10px 10px",
                            }}
                          />
                          <h4 className="m-0">{NameUser}</h4>
                          <button
                            className="btn btn-light position-absolute text-danger"
                            style={{ right: "10px" }}
                            onClick={toggleBoxDX}
                          >
                            <i className="fa-solid fa-right-from-bracket"></i>
                          </button>
                        </div>
                      )}
                    </div>
                    <nav className="pb-5">
                      <ul id="list_ul">
                        {LinkPage_Nav.map((item) => (
                          <li
                            key={`nav_link_2 - ${item.text}`}
                            onClick={() => {
                              window.location.href = `${item.value}`;
                            }}
                          >
                            <p>{item.text}</p>
                          </li>
                        ))}
                        {isAuthenticated && NameUser === "admin" && (
                          <li
                            onClick={() => {
                              window.location.href = "admin/home";
                            }}
                          >
                            <p>admin</p>
                          </li>
                        )}
                        <div
                          className="d-flex justify-content-end pt-1 px-3"
                          style={{ borderTop: "1px solid black" }}
                        >
                          <div className="icon" data-note="Follow on Facebook">
                            <i className="fa-brands fa-facebook"></i>
                          </div>
                          <div className="icon" data-note="Follow on TikTok">
                            <i className="fa-brands fa-tiktok"></i>
                          </div>
                        </div>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>
        {openBoxDX && <>{BoxDX}</>}
      </div>
    </>
  );
};

export default HeaderUser;
