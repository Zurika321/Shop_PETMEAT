// thong_bao.ts
import "./ThongBao.css";

class ThongBao {
  static create_thong_bao(
    thong_bao: string,
    backgroundColor: string,
    textColor: string,
    x: number = 2
  ) {
    let div = document.createElement("div");
    div.className = "thong_bao_chung";
    div.style.backgroundColor = backgroundColor;
    div.style.color = textColor;
    div.style.borderColor = textColor;
    div.textContent = thong_bao;

    let remove_thong_bao = document.createElement("div");
    remove_thong_bao.className = "remove_thong_bao";
    remove_thong_bao.style.color = textColor;
    remove_thong_bao.textContent = "X";
    remove_thong_bao.addEventListener("click", () => {
      if (document.body.contains(div)) {
        document.body.removeChild(div);
      }
    });

    div.appendChild(remove_thong_bao);
    document.body.appendChild(div);

    setTimeout(() => {
      div.style.top = "10px";
    }, 50);

    setTimeout(() => {
      if (document.body.contains(div)) {
        document.body.removeChild(div);
      }
    }, x * 1000);
  }

  static show(thong_bao: string, x: number = 2) {
    this.create_thong_bao(thong_bao, "#007bff", "white", x);
  }

  static warning(thong_bao: string, x: number = 2) {
    this.create_thong_bao(thong_bao, "yellow", "black", x);
  }

  static error(thong_bao: string, x: number = 2) {
    this.create_thong_bao(thong_bao, "red", "yellow", x);
  }
  static success(thong_bao: string, x: number = 2) {
    this.create_thong_bao(thong_bao, "green", "white", x);
  }
}

export default ThongBao;
