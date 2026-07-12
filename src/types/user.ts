export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role?: string;
}

export type UserFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  description: string;
  slug?: string;
  categoryId?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  category?: Category | null;
  createdAt?: string;
};

export type NewProduct = Omit<Product, "id">;

export type ProductDTO = {
  id: string;
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
  description: string;
  categoryId?: string;
  category?: Category | null;
  isFeatured?: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  _count?: { products: number };
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
};

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
  quantity: number;
};

export type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: Product;
};

export type Order = {
  id: string;
  total: number;
  status: OrderStatus;
  shippingAddress: string;
  phone: string;
  paymentMethod: string;
  note?: string;
  items: OrderItem[];
  customer?: { id: string; name: string; email: string };
  createdAt: string;
};

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export type CheckoutFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  note: string;
  paymentMethod: "CARD" | "COD";
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
};
