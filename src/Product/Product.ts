// Product.ts
class Product {
  id: string;
  title: string;
  image: string;
  note: string;
  quantity: string;
  price: string;
  pet: string;
  type: string;

  constructor(
    id: string,
    title: string,
    image: string,
    note: string,
    quantity: string,
    price: string,
    pet: string,
    type: string
  ) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.note = note;
    this.quantity = quantity;
    this.price = price;
    this.pet = pet;
    this.type = type;
  }

  toArray(): string[] {
    return [
      this.id,
      this.title,
      this.image,
      this.note,
      this.quantity,
      this.price,
      this.pet,
      this.type,
    ];
  }
}

export default Product;
