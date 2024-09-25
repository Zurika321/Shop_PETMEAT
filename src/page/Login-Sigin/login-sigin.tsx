import React, { useRef, useState } from "react";
import { useAuth } from "../../Processing/AuthContext";
import "./login.css";
import ThongBao from "../../thong_bao/thong_bao";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const [resultRegister, setResultRegister] = useState<string[]>([]);
  const [InputOk, setInputOk] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      name: "",
    });
    setResultRegister(["", "", ""]);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      if (formData.name !== "" || formData.password !== "") {
        login(formData.name, formData.password);
        setFormData({
          email: "",
          password: "",
          name: "",
        });
      } else {
        ThongBao.show("Vui lòng điền đầy đủ");
      }
    } else {
      if (InputOk) {
        register(formData.email, formData.password, formData.name);
      } else {
        let errorIndex = resultRegister.findIndex(
          (msg, index) =>
            (index === 0 && msg !== "Email hợp lệ") ||
            (index === 1 && msg !== "Mật khẩu hợp lệ") ||
            (index === 2 && msg !== "Tên hợp lệ")
        );

        if (errorIndex !== -1) {
          if (resultRegister[errorIndex] === "") {
            ThongBao.warning("Vui lòng điền đầy đủ");
          } else {
            ThongBao.warning(resultRegister[errorIndex]);
          }
          if (errorIndex === 0 && emailRef.current) {
            emailRef.current.focus();
          } else if (errorIndex === 1 && passwordRef.current) {
            passwordRef.current.focus();
          } else if (errorIndex === 2 && nameRef.current) {
            nameRef.current.focus();
          }
        }
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    let newResult = [...resultRegister];

    if (!isLogin) {
      const validateEmail = () => {
        const emailParts = value.split("@");
        if (value.length === 0) {
          return ["", newResult[1], newResult[2]];
        }
        return value.endsWith("@gmail.com") && emailParts[0].length > 0
          ? ["Email hợp lệ", newResult[1], newResult[2]]
          : ["Email không hợp lệ", newResult[1], newResult[2]];
      };

      const validatePassword = () => {
        if (value.length === 0) return [newResult[0], "", newResult[2]];
        if (value.length < 8)
          return [newResult[0], "Mật khẩu quá ngắn", newResult[2]];
        if (!/[A-Z]/.test(value))
          return [
            newResult[0],
            "Mật khẩu phải có ít nhất một chữ viết hoa",
            newResult[2],
          ];
        if (!/[0-9]/.test(value))
          return [
            newResult[0],
            "Mật khẩu phải có ít nhất một số",
            newResult[2],
          ];
        return [newResult[0], "Mật khẩu hợp lệ", newResult[2]];
      };

      const validateName = () => {
        if (value.length === 0) return [newResult[0], newResult[1], ""];
        if (value === "admin")
          return [newResult[0], newResult[1], "Tên đã tồn tại"];
        return [newResult[0], newResult[1], "Tên hợp lệ"];
      };

      if (id === "email") {
        newResult = validateEmail();
      } else if (id === "password") {
        newResult = validatePassword();
      } else if (id === "name") {
        newResult = validateName();
      }

      setResultRegister(newResult);
      setInputOk(
        newResult.every(
          (msg) =>
            msg === "Email hợp lệ" ||
            msg === "Mật khẩu hợp lệ" ||
            msg === "Tên hợp lệ"
        )
      );
    }

    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col col-11 col-sm-8 col-xl-7 col-xxl-6">
          <div className="card shadow-lg mb-2">
            <div className="row no-gutters">
              {/* Image Section */}
              <div className="col-md-5 d-none d-md-block col-lg-5">
                <img
                  src="image/anh3tv.jpg"
                  className="card-img"
                  alt="anh3tv"
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px 0 0 10px",
                  }}
                />
              </div>

              {/* Form Section */}
              <div className="col-md-7 d-flex align-items-center col-lg-7">
                <div className="card-body">
                  <h2 className="card-title text-center mb-4">
                    {isLogin ? "Đăng nhập" : "Đăng ký"}
                  </h2>
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group input-container">
                      <input
                        type="text"
                        ref={nameRef}
                        className="form-control"
                        id="name"
                        placeholder=" "
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="name">Tên đăng nhập:</label>
                      {resultRegister && resultRegister[2] && (
                        <p
                          className={
                            resultRegister[2].includes("hợp lệ")
                              ? "text-success"
                              : "text-warning"
                          }
                        >
                          {resultRegister[2]}
                        </p>
                      )}
                    </div>

                    {!isLogin && (
                      <div className="form-group input-container">
                        <input
                          type="email"
                          ref={emailRef}
                          className="form-control"
                          id="email"
                          placeholder=" "
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="email">Email:</label>
                        {resultRegister && resultRegister[0] && (
                          <p
                            className={
                              resultRegister[0].includes("Email hợp lệ")
                                ? "text-success"
                                : "text-warning"
                            }
                          >
                            {resultRegister[0]}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="form-group input-container">
                      <input
                        type="password"
                        ref={passwordRef}
                        className="form-control"
                        id="password"
                        placeholder=" "
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="password">Mật khẩu:</label>
                      {resultRegister && resultRegister[1] && (
                        <p
                          className={
                            resultRegister[1].includes("hợp lệ")
                              ? "text-success"
                              : "text-warning"
                          }
                        >
                          {resultRegister[1]}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-2 w-100"
                    >
                      {isLogin ? "Đăng nhập" : "Đăng ký"}
                    </button>
                  </form>

                  {/* Toggle Button */}
                  <div className="text-center mt-3">
                    <p className="d-inline">
                      {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
                    </p>
                    <span
                      onClick={toggleForm}
                      className="d-inline text-primary"
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      {isLogin ? "Đăng ký" : "Đăng nhập"}
                    </span>
                  </div>

                  {/* Social Media Login/Register */}
                  <div className="text-center mt-4">
                    <p>Hoặc {isLogin ? "đăng nhập" : "đăng ký"} bằng:</p>
                    <div className="d-flex justify-content-md-around justify-content-center">
                      <button className="btn btn-outline-primary mx-2">
                        <i className="fab fa-facebook-f" />
                        <span className=" d-none d-sm-inline mr-2 mr-lg-0 mr-xl-1 d-md-none d-lg-inline">
                          Facebook
                        </span>
                      </button>
                      <button className="btn btn-outline-danger mx-2">
                        <i className="fab fa-google" />
                        <span className=" d-none d-sm-inline mr-2 mr-lg-0 mr-xl-1 d-md-none d-lg-inline">
                          Google
                        </span>
                      </button>
                      <button className="btn btn-outline-info mx-2">
                        <i className="fab fa-instagram" />
                        <span className=" d-none d-sm-inline mr-2 mr-lg-0 mr-xl-1 d-md-none d-lg-inline">
                          Instagram
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
