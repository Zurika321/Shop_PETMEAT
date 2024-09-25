import ThongBao from "../../../thong_bao/thong_bao";

class GioHang {
  private static gioHang: string[] = GioHang.loadFromLocalStorage();

  private static loadFromLocalStorage(): string[] {
    const storedCart = localStorage.getItem("gioHang");
    return storedCart ? JSON.parse(storedCart) : [];
  }

  static addProduct(id: string): void {
    if (!GioHang.gioHang.includes(id)) {
      GioHang.gioHang.push(id);
      GioHang.saveToLocalStorage();
      ThongBao.show(`Sản phẩm đã được thêm vào giỏ hàng.`);
    } else {
      ThongBao.show(`Sản phẩm đã có trong giỏ hàng.`);
    }
  }

  static getGioHang(): string[] {
    return GioHang.gioHang;
  }

  private static saveToLocalStorage(): void {
    localStorage.setItem("gioHang", JSON.stringify(GioHang.gioHang));
  }
}

export default GioHang;
