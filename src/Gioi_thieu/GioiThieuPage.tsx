import React, { useState, useEffect, useRef } from "react";
import styles from "./Gioithieucss.module.css";

const GioiThieuPage: React.FC = () => {
  const [idvuanhap, setIdVuaNhap] = useState<string>("");

  const hoangRef = useRef<HTMLDivElement>(null);
  const khaRef = useRef<HTMLDivElement>(null);
  const haiRef = useRef<HTMLDivElement>(null);

  const contactMe = (id: string) => {
    if (id !== idvuanhap) {
      setIdVuaNhap(id);

      if (hoangRef.current) hoangRef.current.style.left = "-150%";
      if (khaRef.current) khaRef.current.style.left = "-150%";
      if (haiRef.current) haiRef.current.style.left = "-150%";

      const selectedRef =
        id === "hoang"
          ? hoangRef.current
          : id === "kha"
          ? khaRef.current
          : haiRef.current;
      if (selectedRef) {
        selectedRef.style.animation = "bounce-in-left 4s both";
        setTimeout(() => {
          selectedRef.style.left = "0";
        }, 100);
        setTimeout(() => {
          selectedRef.style.animation = "none";
        }, 1000);
      }
    }
  };

  // Disable focus on non-contact elements
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".contactme")) {
        event.preventDefault();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // Add body animation class on mount
  useEffect(() => {
    document.body.classList.add("body-animation");
  }, []);

  return (
    <div className={styles.gioiThieu}>
      <button
        onClick={() => (window.location.href = "/#")}
        className={styles.button}
      >
        Back to Home
      </button>

      <div className={styles.container_wrapper}>
        <div className={styles.container}>
          <div className={styles.card}>
            <img src="image/hoang.jpg" alt="hoang" />
            <div className={styles.head}>NGỌC HOÀNG</div>
          </div>
          <div className={styles.card}>
            <img src="image/kha.jpg" alt="kha" />
            <div className={styles.head}>NAM KHA</div>
          </div>
          <div className={styles.card}>
            <img src="image/hai.jpg" alt="hai" />
            <div className={styles.head}>PHI HẢI</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "950px", margin: "1rem", overflow: "hidden" }}>
          <div className={styles.contactmefrom}>
            <button
              className={styles.contactme}
              onClick={() => contactMe("hoang")}
            >
              Contact Me
            </button>
            <button
              className={styles.contactme}
              onClick={() => contactMe("kha")}
            >
              Contact Me
            </button>
            <button
              className={styles.contactme}
              onClick={() => contactMe("hai")}
            >
              Contact Me
            </button>
          </div>

          <div className={styles.table} id="hoang" ref={hoangRef}>
            <div className={styles.content}>
              <h1 className={styles.textCenter}>Trần Ngọc Hoàng</h1>
              <hr />
              <h3>Nghề nghiệp: Editor lỏ</h3>
              <h3>Mã sinh viên: 23-0-00087</h3>
              <h3>Email: th3132005@gmail.com</h3>
              <h3>Sở thích: Em mèo cute</h3>
              <h3 className={styles.textEnd}>✔</h3>
            </div>
          </div>

          <div className={styles.table} id="kha" ref={khaRef}>
            <div className={styles.content}>
              <h1 className={styles.textCenter}>Nguyễn Huỳnh Nam Kha</h1>
              <hr />
              <h3>Nghề nghiệp: Coder</h3>
              <h3>Mã sinh viên: 23-0-00071</h3>
              <h3>Email: conan17032004@gmail.com</h3>
              <h3>Sở thích: nghe nhạc</h3>
              <h3 className={styles.textEnd}>✔</h3>
            </div>
          </div>

          <div className={styles.table} id="hai" ref={haiRef}>
            <div className={styles.content}>
              <h1 className={styles.textCenter}>Nguyễn Hoàng Phi Hải</h1>
              <hr />
              <h3>Nghề nghiệp: Chiến binh</h3>
              <h3>Mã sinh viên: 23-0-00103</h3>
              <h3>Email: hph50902002@gmail.com</h3>
              <h3>Sở thích: tiền ĐÔ $</h3>
              <h3 className={styles.textEnd}>✔</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GioiThieuPage;
