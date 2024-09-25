class Product {
  id: string;
  title: string;
  image: string;
  note: string;
  quantity: string;
  price: string;

  constructor(
    id: string,
    title: string,
    image: string,
    note: string,
    quantity: string,
    price: string
  ) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.note = note;
    this.quantity = quantity;
    this.price = price;
  }

  // Phương thức để lấy thông tin sản phẩm dưới dạng mảng
  toArray(): string[] {
    return [
      this.id,
      this.title,
      this.image,
      this.note,
      this.quantity,
      this.price,
    ];
  }
}

export default Product;
