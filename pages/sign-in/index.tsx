import React, { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import {
  Alert,
  AlertIcon,
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
import Layout from "@components/Layout";
import withAuth from "@components/withAuth";

const SignIn: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    setErrors({});

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      setErrors({
        username: "Not valid 😐",
        password: "Not valid 😐",
      });
      return;
    }

    try {
      await api.app.authenticate({
        strategy: "local",
        username,
        password,
      });
    } catch (e) {
      setLoginError(e.message);
    }
  };

  return (
    <Layout title="Sign in | cisdord">
      <Box h="100%" display="grid" placeItems="center">
        <Box maxW="450" w="100%">
          <SimpleGrid as="form" gap="3" onSubmit={handleSignIn}>
            {loginError && (
              <Alert mb="5" status="error">
                <AlertIcon />
                {loginError}
              </Alert>
            )}
            <FormControl id="username">
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input ref={usernameRef} type="username" />
              <FormHelperText>{errors.username}</FormHelperText>
            </FormControl>
            <FormControl id="password">
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
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
              Sign in
            </Button>
            <Text textAlign="center">or</Text>
            <Button>Sign in with Github</Button>
            <Link href="/sign-up">
              <Button
                as="a"
                href="/sign-up"
                mt="5"
                variant="ghost"
                fontWeight="normal"
              >
                Don't have an account? Sign up here.
              </Button>
            </Link>
          </SimpleGrid>
        </Box>
      </Box>
    </Layout>
  );
};

export default withAuth(SignIn, { isReverse: true });
