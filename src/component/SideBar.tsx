import { Box, Button, Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import SideBarItem from "./SideBarItem";
import { COLORS } from "../colors";
import { FONTS } from "../fonts";

export interface Item {
  title: string;
  path: string;
  icon: React.ElementType;
}

interface Props {
  sidebarData: Item[];
}

const SideBar = ({ sidebarData }: Props) => {
  const [navSize, changeNavSize] = useState("large");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleLogOut = () => {
    axios
      .get("http://127.0.0.1:8000/api/admin-logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("logout successfull");
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("userRole");
        sessionStorage.removeItem("pathLocation");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        alert("Something wrong!try later");
      });
  };

  return (
    <Flex
      pos={"fixed"}
      mt={"60px"}
      h="92vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.3)"
      borderRadius={navSize == "small" ? "0 10px 10px 0" : "0 20px 20px 0"}
      w={navSize == "small" ? "75px" : "210px"}
      flexDirection="column"
      justifyContent="space-between"
      // bgGradient={[`linear(to-b,${COLORS.lightblue} ,blue.100,${COLORS.cyan_2},${COLORS.lightblue} )`]}
      bgGradient={[`linear(to-b,#018ABE ,#97CADB,#018ABE)`]}
      // bgGradient={[`linear(to-b, #335566, #8899AA, #335566)`]}

    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          aria-label="manage section"
          background="none"
          color={"white"}
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        {/* map */}
        {sidebarData.map((item, index) => {
          return (
            <Box key={index} onClick={() => setSelectedIndex(index)} w={"180px"}>
              <SideBarItem
                navSize={navSize}
                icon={item.icon}
                title={item.title}
                path={item.path}
                key={index}
                active={index === selectedIndex}
              />
            </Box>
          );
        })}
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />

        <Flex pl="10px">
          <Button onClick={handleLogOut} bgColor={"transparent"}>
            <CiLogout size={20} />
            <Text
              ml={4}
              mb={0}
              display={navSize == "small" ? "none" : "flex"}
              as="b"
              fontSize={"19px"}
              fontFamily={FONTS.heading}
            >
              Log Out
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
