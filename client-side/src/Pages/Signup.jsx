import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Center,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Components/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const navigate = useNavigate()

  const handelSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
      }
      toast.success("User Registered SuccessFully !", {
        position: "top-center",
      });
      setEmail("")
      setPassword("")
      setFname("")
      setLname("")
      navigate("/")
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
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
          <Heading as="h3" size="lg" textAlign="center" mb={3} color="gray.900">
            Sign Up
          </Heading>
          <Text textAlign="center" mb={4} color="gray.900">
            Create your account
          </Text>
          <Button
            leftIcon={<FaGoogle />}
            w="full"
            p={6}
            mb={6}
            bg="gray.200"
            colorScheme="gray"
          >
            Sign up with Google
          </Button>
          <Flex align="center" mb={3}>
            <Divider flex="1" borderColor="gray.500" />
            <Text mx={4} color="gray.600">
              or
            </Text>
            <Divider flex="1" borderColor="gray.500" />
          </Flex>
          <form onSubmit={handelSignup}>
            <Flex gap={4} mb={4}>
              <FormControl>
                <FormLabel htmlFor="firstName" color="gray.900">
                  First Name*
                </FormLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  focusBorderColor="gray.400"
                  bg="gray.200"
                  color="gray.900"
                  rounded="2xl"
                  _placeholder={{ color: "gray.700" }}
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="lastName" color="gray.900">
                  Last Name*
                </FormLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  focusBorderColor="gray.400"
                  bg="gray.200"
                  color="gray.900"
                  rounded="2xl"
                  _placeholder={{ color: "gray.700" }}
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </FormControl>
            </Flex>
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
            <FormControl mb={6}>
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
              Sign Up
            </Button>
            <Text textAlign="center" color="gray.900">
              Already have an account?{" "}
              <Link to={"/"} color="gray.700" fontWeight="bold">
                Sign In
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
  );
};

export default Signup;
