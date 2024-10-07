import React from "react";

const FooterUser: React.FC = () => {
  return (
    <>
      <footer className="bg-light text-center text-lg-start mt-5">
        <div className="p-4">
          <div className="row">
            {/* Một số link khác */}
            <div className="col col-12 w-100 order-md-2">
              <div className="row d-none d-sm-flex justify-content-between">
                <div className="col col-lg-auto col-md-12 ">
                  <ul className="list-unstyled d-flex justify-content-between text-primary">
                    <li className="mx-2">
                      <a href="#first_header">Giới Thiệu</a>
                    </li>
                    <li className="mx-2">
                      <a href="#first_header">Khách hàng</a>
                    </li>
                    <li className="mx-2">
                      <a href="#first_header">Tuyển dụng</a>
                    </li>
                    <li className="mx-2">
                      <a href="#first_header">Giao hàng</a>
                    </li>
                    <li className="mx-2">
                      <a href="#first_header">Tích điểm</a>
                    </li>
                    <li className="mx-2">
                      <a href="#first_header">Đổi trả</a>
                    </li>
                  </ul>
                </div>
                <div className="col col-lg-auto d-lg-flex d-none">
                  <div className="icon" data-note="Follow on Facebook">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <div className="icon" data-note="Follow on TikTok">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {/* Liên hệ */}
            <div className="col w-100 order-md-first mt-2">
              <div className="row d-none d-md-flex justify-content-between align-items-start g-2 g-sm-3 g-md-5 mb-5 bg-primary px-0 px-lg-5">
                <div className="col col-3 my-3">
                  <button className="btn btn-primary">
                    <i className="fa-solid fa-phone bold"></i>
                    <p className="m-0 bold">Tổng đài:</p>
                    <p className="m-0 bold">0916000000</p>
                  </button>
                </div>
                <div className="col col-3 my-3">
                  <button className="btn btn-primary bold">Gửi tin nhắn</button>
                </div>
                <div className="col col-3 my-3">
                  <button className="btn btn-primary bold">
                    Liên hệ kinh doang
                  </button>
                </div>
                <div className="col col-3 cursor-pointer my-3">
                  <button
                    onClick={() => {
                      window.location.href = "#first_header";
                    }}
                    className="btn btn-light rounded-pill"
                  >
                    <p className="mr-2 mt-2 d-inline bold">&#94;</p>
                    <p className="d-inline bold"> Lên đầu trang</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-md-none">
            <a href="#first_header">
              <p className="m-0">&#94;</p>
              <p>Lên đầu trang</p>
            </a>
          </div>

          {/* Thương hiệu hợp tác / chứng nhận */}
          <div className="row d-flex justify-content-center align-items-center g-2 g-sm-3 g-md-5">
            <div className="col col-auto">
              <img
                src="/image/logo/thuong_hieu_hop_tac/logoct.webp"
                className="img-fluid logo-th"
                alt="logoct"
              />
            </div>
            <div className="col col-auto">
              <img
                src="/image/logo/thuong_hieu_hop_tac/logodcma2.webp"
                className="img-fluid logo-th"
                alt="logodcma2"
              />
            </div>
            <div className="col col-auto">
              <img
                src="/image/logo/thuong_hieu_hop_tac/logodmca.png"
                className="img-fluid logo-th"
                alt="logodmca"
              />
            </div>
            <div className="col col-auto d-none d-sm-block">
              <img
                src="/image/logo/thuong_hieu_hop_tac/logoVNCLC.webp"
                className="img-fluid logo-cn"
                alt="logoVNCLC"
              />
            </div>
          </div>
        </div>

        <hr />

        {/* Copyright */}
        <div className="text-center p-3">
          <p className="d-sm-none">Trang web đã được chứng nhận.</p>
          2024 ©
          <span style={{ fontWeight: "bold" }}>Công ty PetMeat Việt Nam</span> -
          trách nhiệm 3 thành viên.
        </div>

        {/* Liên hệ */}
        <div className="row d-flex justify-content-center d-md-none">
          <button className="col col-5 btn btn-primary m-2 rounded-pill d-flex justify-content-center">
            <i className="fa-solid fa-z mt-1 mx-1"></i>
            <span>Zalo</span>
          </button>
          <button className="col col-5 btn btn-primary m-2 rounded-pill d-flex justify-content-center">
            <i className="fa-solid fa-phone mt-1 mx-1"></i>
            <span>HOTLINE</span>
          </button>
        </div>
      </footer>
    </>
  );
};

export default FooterUser;
