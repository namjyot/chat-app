import {
  Tab,
  TabList,
  TabPanels,
  Tabs,
  TabPanel,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/user/authUser`
      );
      if (res.data.success) {
        setTimeout;
      }
    };
    setTimeout(() => {
      authUser();
    }, 1000);
  }, []);

  return (
    <>
      <Flex
        align={"center"}
        h={"100svh"}
        justifyContent={"center"}
        direction={"column"}
      >
        <Tabs
          w={{ base: "20em", sm: "25em", md: "30em" }}
          variant="enclosed"
          isFitted
          mt={"2rem"}
        >
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};

export default Authentication;
