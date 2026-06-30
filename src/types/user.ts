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
};

export type NewProduct = Omit<Product, "id">;

export type ProductDTO = {
  id: string;
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
  description: string;
};