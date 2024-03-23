import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Chat } from "../context/ChatState";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useContext(Chat);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const showHandler = () => {
    setShow(!show);
  };
  const passHandler = (e) => {
    setPassword(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const fillCredentials = () => {
    setEmail("abc@gmail.com");
    setPassword("helloww");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/login`,
        {
          email: email,
          password: password,
        }
      );
      if (!res.data.success) {
        setLoading(false);
        showToast(res.data.message, "error");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setLoading(false);
      showToast(`Something went wrong ${error}`, "error");
    }
  };

  return (
    <>
      <VStack>
        <FormControl onSubmit={submitHandler}>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={emailHandler}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
          <InputGroup>
            <Input
              id="pass"
              mt={"1em"}
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={passHandler}
            />
            <InputRightElement width="4.5rem" mt={"1em"}>
              <Button h="1.75rem" size="xs" onClick={showHandler}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            isLoading={loading}
            colorScheme="messenger"
            size={"md"}
            width={"full"}
            mt={"1.5em"}
            onClick={submitHandler}
          >
            Login
          </Button>
          <Button
            colorScheme="red"
            size={"md"}
            width={"full"}
            mt={"0.5em"}
            onClick={fillCredentials}
          >
            Guest Credentials
          </Button>
        </FormControl>
      </VStack>
    </>
  );
};

export default Login;
