"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Text, Input, Button, FormControl, FormLabel, Alert, AlertIcon, Spinner, Link } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loginCustomer, clearAuthError } from "@/redux/slices/customer/authSlice";
import { customerLoginSchema } from "@/lib/validations";
import { patrickHand } from "@/lib/fonts";
import NextLink from "next/link";

export default function LoginPage() {
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
          Welcome Back
        </Text>
        <Text textAlign="center" color="gray.500" mb={6}>Sign in to your account</Text>

        {error && (
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />{error}
          </Alert>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={customerLoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await dispatch(loginCustomer(values));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <FormControl mb={4} isInvalid={touched.email && !!errors.email}>
                <FormLabel fontWeight="bold">Email</FormLabel>
                <Field as={Input} name="email" type="email" placeholder="your@email.com" />
              </FormControl>
              <FormControl mb={6} isInvalid={touched.password && !!errors.password}>
                <FormLabel fontWeight="bold">Password</FormLabel>
                <Field as={Input} name="password" type="password" placeholder="••••••••" />
              </FormControl>
              <Button type="submit" w="100%" colorScheme="teal" isLoading={isSubmitting} h="48px" fontSize="md">
                {loading ? <Spinner size="sm" /> : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>

        <Text textAlign="center" mt={6} color="gray.500">
          Don&apos;t have an account?{" "}
          <Link as={NextLink} href="/auth/register" color="#00813d" fontWeight="bold">
            Sign Up
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
