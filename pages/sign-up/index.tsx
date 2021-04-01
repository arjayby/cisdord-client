import React, { FormEvent, useRef, useState } from "react";
import Layout from "@components/Layout";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import api from "@api";

const SignUp: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const [errors, setErrors] = useState<{
    name?: string;
    username?: string;
    password?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      await api.users.create({
        name,
        username,
        password,
      });
      await api.app.authenticate({
        strategy: "local",
        username,
        password,
      });
    } catch (e) {
      let errors = {};

      if (e.name === "TooManyRequests") {
        const secondsBeforeNextRequest = Math.ceil(e.data.msBeforeNext / 1000);
        alert(
          `You kinda sus bro 🤨. We limit your request rate. You need to calm down for at least ${secondsBeforeNextRequest} second${
            secondsBeforeNextRequest > 1 ? "s" : ""
          }.`
        );
      }

      if (e.name === "BadRequest") {
        e.errors.map((err) => {
          errors[err.path] = "Not valid 😐";
        });

        if (password.length <= 5) {
          errors["password"] = "Not valid 😐";
        }
      }

      setErrors(errors);
    }
  };

  return (
    <Layout title="Sign up | cisdord">
      <Box h="100%" display="grid" placeItems="center">
        <Box maxW="450" w="100%">
          <SimpleGrid as="form" gap="3" onSubmit={handleSignUp}>
            <FormControl id="name">
              <FormLabel htmlFor="name">What should we call you?</FormLabel>
              <Input ref={nameRef} type="name" placeholder="name" />
              <FormHelperText>{errors.name}</FormHelperText>
            </FormControl>
            <FormControl id="username">
              <FormLabel htmlFor="username">Your unique username?</FormLabel>
              <Input ref={usernameRef} type="username" placeholder="username" />
              <FormHelperText>{errors.username}</FormHelperText>
            </FormControl>
            <FormControl id="password">
              <FormLabel htmlFor="password">Very secret password.</FormLabel>
              <InputGroup>
                <Input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                />
                <InputRightElement>
                  <Button variant="ghost" onClick={handleShowPassword}>
                    {showPassword ? "🙉" : "🙈"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>{errors.password}</FormHelperText>
            </FormControl>
            <Button mt="5" type="submit" colorScheme="brand">
              Create my account
            </Button>
            <Text textAlign="center">or</Text>
            <Button>Sign up with Github</Button>
          </SimpleGrid>
        </Box>
      </Box>
    </Layout>
  );
};

export default SignUp;
