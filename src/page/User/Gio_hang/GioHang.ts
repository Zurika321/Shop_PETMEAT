import ThongBao from "../../../thong_bao/thong_bao";

interface CartItem {
  id: string;
  quantity: number;
}

class GioHang {
  private static gioHang: CartItem[] = GioHang.loadFromLocalStorage();

  // Load từ localStorage, nếu không có trả về mảng trống
  private static loadFromLocalStorage(): CartItem[] {
    const storedCart = localStorage.getItem("gioHang");
    return storedCart ? JSON.parse(storedCart) : [];
  }

  // Thêm sản phẩm vào giỏ hàng
  static addProduct(id: string, quantity: number = 1): void {
    const existingProduct = GioHang.gioHang.find((item) => item.id === id);

    if (existingProduct) {
      // Nếu sản phẩm đã có trong giỏ, tăng số lượng
      existingProduct.quantity += quantity;
      ThongBao.show(`Đã tăng số lượng sản phẩm trong giỏ hàng.`);
    } else {
      // Nếu chưa có sản phẩm này, thêm mới
      GioHang.gioHang.push({ id, quantity });
      ThongBao.show(`Sản phẩm đã được thêm vào giỏ hàng.`);
    }

    GioHang.saveToLocalStorage();
  }

  // Lấy toàn bộ giỏ hàng
  static getGioHang(): CartItem[] {
    return GioHang.gioHang;
  }

  // Lưu giỏ hàng vào localStorage
  private static saveToLocalStorage(): void {
    localStorage.setItem("gioHang", JSON.stringify(GioHang.gioHang));
  }
}

export default GioHang;
