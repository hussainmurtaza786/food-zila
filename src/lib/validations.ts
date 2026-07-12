import * as Yup from "yup";

export const userValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: Yup.string(),
});

export const productValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  imgUrl: Yup.string().required("Image URL is required"),
  price: Yup.number().min(1, "Price should be greater than 1").required("Price is required"),
  categoryId: Yup.string().nullable(),
});

export const customerRegisterSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  phone: Yup.string().matches(/^\d{11}$/, "Phone number must be exactly 11 digits").required("Phone is required"),
});

export const customerLoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const checkoutSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string().matches(/^\d{11}$/, "Phone must be 11 digits").required("Phone is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string().required("Zip code is required"),
  note: Yup.string(),
  paymentMethod: Yup.string().oneOf(["CARD", "COD"]).required(),
  cardNumber: Yup.string().when("paymentMethod", {
    is: "CARD",
    then: (s) => s.min(19, "Enter a valid card number").required("Card number is required"),
    otherwise: (s) => s.nullable(),
  }),
  cardExpiry: Yup.string().when("paymentMethod", {
    is: "CARD",
    then: (s) => s.matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format").required("Expiry is required"),
    otherwise: (s) => s.nullable(),
  }),
  cardCvv: Yup.string().when("paymentMethod", {
    is: "CARD",
    then: (s) => s.matches(/^\d{3,4}$/, "CVV must be 3-4 digits").required("CVV is required"),
    otherwise: (s) => s.nullable(),
  }),
  cardName: Yup.string().when("paymentMethod", {
    is: "CARD",
    then: (s) => s.required("Cardholder name is required"),
    otherwise: (s) => s.nullable(),
  }),
});
