import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Chat } from "../context/ChatState";

const Register = () => {
  let image;
  const navigate = useNavigate();
  const { showToast } = useContext(Chat);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const mTop = "1em";
  const showHandler = () => {
    setShow(!show);
  };
  const passHandler = (e) => {
    setPassword(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const nameHandler = (e) => {
    setUsername(e.target.value);
  };
  const confirmPassHandler = (e) => {
    setConfirmPass(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      showToast("Password doesn't match", "error");
      return;
    } else if (password.length < 6) {
      showToast("Password must contain 6 characters", "error");
    } else {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("avatar", image);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);

        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/user/register`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
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
        showToast(`Something went wrong, Error: ${error}`, 'error');
      }
    }
  };

  return (
    <>
      <VStack mt={"-1em"}>
        <form onSubmit={submitHandler}>
          <FormControl>
            <Input
              id="name"
              type="text"
              placeholder="Username"
              value={username}
              onChange={nameHandler}
            />
            <Input
              id="remail"
              mt={mTop}
              type="email"
              placeholder="Email"
              value={email}
              onChange={emailHandler}
            />

            <InputGroup>
              <Input
                id="rpass"
                mt={mTop}
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={passHandler}
              />
              <InputRightElement width="4.5rem" mt={mTop}>
                <Button
                  id="show"
                  colorScheme="gray"
                  h="1.75rem"
                  size="xs"
                  onClick={showHandler}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Input
              mt={mTop}
              id="cpass"
              type={show ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={confirmPassHandler}
            />
            <input
              style={{
                width: "100%",
                marginTop: "1em",
              }}
              type="file"
              id="avatar"
              name="avatar"
              onChange={(e) => {
                image = e.target.files[0];
              }}
            />
            <Button
              id="reg"
              isLoading={loading}
              colorScheme="messenger"
              size={"md"}
              width={"full"}
              mt={mTop}
              type="submit"
              onClick={submitHandler}
            >
              Register
            </Button>
          </FormControl>
        </form>
      </VStack>
    </>
  );
};

export default Register;
