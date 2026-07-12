"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { clearCart } from "@/redux/slices/customer/cartSlice";
import { Box, Text, Flex, Button, Input, FormControl, FormLabel, Radio, RadioGroup, Stack, Divider, Textarea, useToast, Spinner } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { checkoutSchema } from "@/lib/validations";
import { oswald700 } from "@/lib/fonts";
import PageBanner from "@/components/common/PageBanner";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const { customer } = useSelector((state: RootState) => state.auth);

  const deliveryFee = totalPrice > 2000 ? 0 : 150;
  const grandTotal = totalPrice + deliveryFee;
  const orderPlacedRef = useRef(false);

  useEffect(() => {
    if (items.length === 0 && !orderPlacedRef.current) router.push("/cart");
  }, [items, router]);

  if (items.length === 0) return null;

  return (
    <Box>
      <PageBanner title="CHECKOUT" />
      <Box maxW="1100px" mx="auto" p={{ base: 4, md: 8 }}>
        <Flex direction={{ base: "column", lg: "row" }} gap={8}>
          {/* Checkout Form */}
          <Box flex="2">
            <Formik
              initialValues={{
                name: customer?.name || "",
                email: customer?.email || "",
                phone: customer?.phone || "",
                address: customer?.address || "",
                city: customer?.city || "",
                zipCode: customer?.zipCode || "",
                note: "",
                paymentMethod: "COD" as "CARD" | "COD",
                cardNumber: "",
                cardExpiry: "",
                cardCvv: "",
                cardName: "",
              }}
              validationSchema={checkoutSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const res = await fetch("/api/orders", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("foodzilla-auth-token")}`,
                    },
                    body: JSON.stringify({
                      items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
                      shippingAddress: `${values.address}, ${values.city} ${values.zipCode}`,
                      phone: values.phone,
                      paymentMethod: values.paymentMethod,
                      note: values.note,
                    }),
                  });

                  if (!res.ok) throw new Error("Failed to place order");

                  dispatch(clearCart());
                  orderPlacedRef.current = true;
                  toast({ title: "Order Placed!", description: "Your order has been placed successfully.", status: "success", duration: 3000 });
                  router.push("/checkout/success");
                } catch {
                  toast({ title: "Error", description: "Failed to place order. Please try again.", status: "error" });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form>
                  {/* Shipping Info */}
                  <Box bg="white" p={6} borderRadius="12px" boxShadow="md" mb={6}>
                    <Text className={oswald700.className} fontSize="xl" fontWeight="bold" mb={4}>1. Shipping Information</Text>
                    <Flex direction="column" gap={4}>
                      <Flex gap={4} direction={{ base: "column", sm: "row" }}>
                        <FormControl isInvalid={touched.name && !!errors.name}>
                          <FormLabel fontWeight="bold" fontSize="sm">Full Name</FormLabel>
                          <Field as={Input} name="name" placeholder="John Doe" />
                        </FormControl>
                        <FormControl isInvalid={touched.phone && !!errors.phone}>
                          <FormLabel fontWeight="bold" fontSize="sm">Phone</FormLabel>
                          <Field as={Input} name="phone" placeholder="03001234567" />
                        </FormControl>
                      </Flex>
                      <FormControl isInvalid={touched.email && !!errors.email}>
                        <FormLabel fontWeight="bold" fontSize="sm">Email</FormLabel>
                        <Field as={Input} name="email" type="email" placeholder="your@email.com" />
                      </FormControl>
                      <FormControl isInvalid={touched.address && !!errors.address}>
                        <FormLabel fontWeight="bold" fontSize="sm">Delivery Address</FormLabel>
                        <Field as={Input} name="address" placeholder="Street address" />
                      </FormControl>
                      <Flex gap={4} direction={{ base: "column", sm: "row" }}>
                        <FormControl isInvalid={touched.city && !!errors.city}>
                          <FormLabel fontWeight="bold" fontSize="sm">City</FormLabel>
                          <Field as={Input} name="city" placeholder="Lahore" />
                        </FormControl>
                        <FormControl isInvalid={touched.zipCode && !!errors.zipCode}>
                          <FormLabel fontWeight="bold" fontSize="sm">Zip Code</FormLabel>
                          <Field as={Input} name="zipCode" placeholder="54000" />
                        </FormControl>
                      </Flex>
                      <FormControl>
                        <FormLabel fontWeight="bold" fontSize="sm">Delivery Instructions (optional)</FormLabel>
                        <Field as={Textarea} name="note" placeholder="Any special instructions..." size="sm" />
                      </FormControl>
                    </Flex>
                  </Box>

                  {/* Payment */}
                  <Box bg="white" p={6} borderRadius="12px" boxShadow="md" mb={6}>
                    <Text className={oswald700.className} fontSize="xl" fontWeight="bold" mb={4}>2. Payment Method</Text>
                    <RadioGroup value={values.paymentMethod} onChange={(v) => setFieldValue("paymentMethod", v)} mb={4}>
                      <Stack direction="row" gap={6}>
                        <Radio value="COD">Cash on Delivery</Radio>
                        <Radio value="CARD">Credit / Debit Card</Radio>
                      </Stack>
                    </RadioGroup>

                    {values.paymentMethod === "CARD" && (
                      <Box bg="gray.50" p={4} borderRadius="8px" mt={4}>
                        <Flex direction="column" gap={4}>
                          <FormControl isInvalid={touched.cardName && !!errors.cardName}>
                            <FormLabel fontWeight="bold" fontSize="sm">Cardholder Name</FormLabel>
                            <Field as={Input} name="cardName" placeholder="John Doe" />
                          </FormControl>
                          <FormControl isInvalid={touched.cardNumber && !!errors.cardNumber}>
                            <FormLabel fontWeight="bold" fontSize="sm">Card Number</FormLabel>
                            <Field
                              as={Input}
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const v = e.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
                                setFieldValue("cardNumber", v);
                              }}
                            />
                          </FormControl>
                          <Flex gap={4}>
                            <FormControl isInvalid={touched.cardExpiry && !!errors.cardExpiry}>
                              <FormLabel fontWeight="bold" fontSize="sm">Expiry</FormLabel>
                              <Field as={Input} name="cardExpiry" placeholder="MM/YY" maxLength={5} />
                            </FormControl>
                            <FormControl isInvalid={touched.cardCvv && !!errors.cardCvv}>
                              <FormLabel fontWeight="bold" fontSize="sm">CVV</FormLabel>
                              <Field as={Input} name="cardCvv" type="password" placeholder="•••" maxLength={4} />
                            </FormControl>
                          </Flex>
                        </Flex>
                      </Box>
                    )}
                  </Box>

                  <Button type="submit" w="100%" colorScheme="teal" size="lg" isLoading={isSubmitting} h="56px" fontSize="lg">
                    {isSubmitting ? <Spinner size="sm" /> : `Place Order - Rs. ${grandTotal.toLocaleString()}`}
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>

          {/* Order Summary Sidebar */}
          <Box flex="1">
            <Box bg="white" p={6} borderRadius="12px" boxShadow="md" position="sticky" top="100px">
              <Text className={oswald700.className} fontSize="xl" fontWeight="bold" mb={4}>Order Summary</Text>
              <Divider mb={4} />
              {items.map((item) => (
                <Flex key={item.id} justify="space-between" mb={3}>
                  <Text color="gray.600" fontSize="sm">
                    {item.title} x {item.quantity}
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">Rs. {(item.price * item.quantity).toLocaleString()}</Text>
                </Flex>
              ))}
              <Divider my={4} />
              <Flex justify="space-between" mb={2}>
                <Text color="gray.600">Subtotal</Text>
                <Text fontWeight="bold">Rs. {totalPrice.toLocaleString()}</Text>
              </Flex>
              <Flex justify="space-between" mb={2}>
                <Text color="gray.600">Delivery</Text>
                <Text fontWeight="bold" color={deliveryFee === 0 ? "green.500" : "inherit"}>
                  {deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee}`}
                </Text>
              </Flex>
              <Divider my={4} />
              <Flex justify="space-between">
                <Text fontSize="lg" fontWeight="bold">Total</Text>
                <Text fontSize="lg" fontWeight="bold" color="#00813d">Rs. {grandTotal.toLocaleString()}</Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
