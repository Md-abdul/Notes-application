import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Center,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../Components/firebaseConfig";

import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handelLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("User loggd in Successfully", {
        position: "top-center",
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Center minH="100vh" bg="gray.100">
        <Flex
          align="center"
          justify="center"
          bg="white"
          p={{ base: 6, lg: 12 }}
          rounded="lg"
          boxShadow="lg"
          width={{ base: "full", md: "md", lg: "lg" }}
        >
          <Box width="full">
            <Heading
              as="h3"
              size="lg"
              textAlign="center"
              mb={3}
              color="gray.900"
            >
              Sign In
            </Heading>
            <Text textAlign="center" mb={4} color="gray.900">
              Enter your email and password
            </Text>
            <Button
              leftIcon={<FaGoogle />}
              w="full"
              p={6}
              mb={6}
              bg="gray.200"
              colorScheme="gray"
            >
              Sign in with Google
            </Button>
            <Flex align="center" mb={3}>
              <Divider flex="1" borderColor="gray.500" />
              <Text mx={4} color="gray.600">
                or
              </Text>
              <Divider flex="1" borderColor="gray.500" />
            </Flex>
            <form onSubmit={handelLogin}>
              <FormControl mb={4}>
                <FormLabel htmlFor="email" color="gray.900">
                  Email*
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  focusBorderColor="gray.400"
                  bg="gray.200"
                  color="gray.900"
                  rounded="2xl"
                  _placeholder={{ color: "gray.700" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="password" color="gray.900">
                  Password*
                </FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  focusBorderColor="gray.400"
                  bg="gray.200"
                  color="gray.900"
                  rounded="2xl"
                  _placeholder={{ color: "gray.700" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Flex justify="space-between" mb={6}>
                <Checkbox defaultChecked colorScheme="purple">
                  Keep me logged in
                </Checkbox>
                <Link color="purple.500">Forget password?</Link>
              </Flex>
              <Button
                w="full"
                py={5}
                mb={5}
                colorScheme="purple"
                rounded="2xl"
                fontWeight="bold"
                fontSize="sm"
                type="submit"
              >
                Sign In
              </Button>
              <Text textAlign="center" color="gray.900">
                Not registered yet?{" "}
                <Link to={"/signup"} color="gray.700" fontWeight="bold">
                  Create an Account
                </Link>
              </Text>
            </form>
          </Box>
        </Flex>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Center>
    </>
  );
};

export default Login;
