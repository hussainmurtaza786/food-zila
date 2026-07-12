"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Text, Input, Button, FormControl, FormLabel, Alert, AlertIcon, Spinner, Link } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { registerCustomer, clearAuthError } from "@/redux/slices/customer/authSlice";
import { customerRegisterSchema } from "@/lib/validations";
import { patrickHand } from "@/lib/fonts";
import NextLink from "next/link";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) router.push("/shop");
  }, [isAuthenticated, router]);

  useEffect(() => {
    return () => { dispatch(clearAuthError()); };
  }, [dispatch]);

  if (isAuthenticated) return null;

  return (
    <Box minH="80vh" display="flex" justifyContent="center" alignItems="center" bg="gray.50" px={4}>
      <Box bg="white" p={8} borderRadius="16px" boxShadow="xl" w="100%" maxW="420px">
        <Text className={patrickHand.className} fontSize="3xl" textAlign="center" mb={2} color="#00813d">
          Create Account
        </Text>
        <Text textAlign="center" color="gray.500" mb={6}>Join FoodZila today</Text>

        {error && (
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />{error}
          </Alert>
        )}

        <Formik
          initialValues={{ name: "", email: "", password: "", phone: "" }}
          validationSchema={customerRegisterSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await dispatch(registerCustomer(values));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <FormControl mb={4} isInvalid={touched.name && !!errors.name}>
                <FormLabel fontWeight="bold">Full Name</FormLabel>
                <Field as={Input} name="name" placeholder="John Doe" />
              </FormControl>
              <FormControl mb={4} isInvalid={touched.email && !!errors.email}>
                <FormLabel fontWeight="bold">Email</FormLabel>
                <Field as={Input} name="email" type="email" placeholder="your@email.com" />
              </FormControl>
              <FormControl mb={4} isInvalid={touched.phone && !!errors.phone}>
                <FormLabel fontWeight="bold">Phone</FormLabel>
                <Field as={Input} name="phone" placeholder="03001234567" />
              </FormControl>
              <FormControl mb={6} isInvalid={touched.password && !!errors.password}>
                <FormLabel fontWeight="bold">Password</FormLabel>
                <Field as={Input} name="password" type="password" placeholder="••••••••" />
              </FormControl>
              <Button type="submit" w="100%" colorScheme="teal" isLoading={isSubmitting} h="48px" fontSize="md">
                {loading ? <Spinner size="sm" /> : "Create Account"}
              </Button>
            </Form>
          )}
        </Formik>

        <Text textAlign="center" mt={6} color="gray.500">
          Already have an account?{" "}
          <Link as={NextLink} href="/auth/login" color="#00813d" fontWeight="bold">
            Sign In
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
