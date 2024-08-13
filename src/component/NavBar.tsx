import { Avatar, Button, HStack, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../Interfaces/User";
import logo from "../assets/logot.webp";
import { COLORS } from "../colors";
import { FONTS } from "../fonts";
import useFetchData from "../hooks/useFetchData";
import { FetchResponse } from "../services/api-client";
import getImageUrl from "../services/image-url";
import PathLocationContext from "../state-managment/PathLocationContext";
import ColorModeSwitch from "./ColorModeSwitch";
import RequestsSuperAdmin from "./RequestsSuperAdmin";
import axios from "axios";
import useSendData from "../hooks/useSendData";

const NavBar = ({ path }) => {
  const { data } = useFetchData<FetchResponse<User>>("/admin-profile");

  const { mutate } = useSendData<User>("/push-noti");
  const { setPathLocation } = useContext(PathLocationContext);

  const role = sessionStorage.getItem("userRole");

  const handleClick = () => {
    // Update sessionLocation context only if the path is different
    setPathLocation(path);

    sessionStorage.setItem("pathLocation", path);
  };
  const handleSubmit = () => {
    const device_token = localStorage.getItem("fcm_token");
    mutate(
      {
        device_token: device_token,
      },
      {
        onError: (error) => {
          console.error("Submission error::", error);
        },
        onSuccess: (data) => {
          console.log("Submission success::", data);
        },
      }
    );
  };
  return (
    // horizontal stack
    <HStack
      position="fixed"
      w="100%"
      zIndex={1}
      backgroundColor={COLORS.darkblue}
      justifyContent="space-between"
      padding="10px"
      boxShadow="base"
      shadow={"0 0 10px rgba(0, 0, 0, 1)"}
    >
      <HStack>
        <Image src={logo} boxSize="40px" borderRadius={10} />
        <Text
          fontFamily={FONTS.heading}
          fontSize={27}
          color={COLORS.white}
          m={0}
        >
          UniGo Dashboard
        </Text>
      </HStack>
      <HStack gap={5}>
        {role === "Super Admin" && <RequestsSuperAdmin />}

        <Button onClick={handleSubmit}>send notifications</Button>
        <ColorModeSwitch />
        <Avatar
          size="sm"
          src={data?.data?.image ? getImageUrl(data?.data.image) : ""}
          boxSize={45}
          border="1px solid white"
          mr={3}
          as={Link}
          to={path}
          onClick={handleClick}
          cursor={"pointer"}
          _hover={{
            transform: "scale(1.08)",
            transition: "transform 0.5s ease",
          }}
        />
      </HStack>
    </HStack>
  );
};

export default NavBar;
