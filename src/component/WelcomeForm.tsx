import {
  Box,
  HStack,
  Heading,
  Image,
  Text,
  keyframes
} from "@chakra-ui/react";
import { useState } from "react";
import logo from "../assets/logot.webp";
import { COLORS } from "../colors";
import { FONTS } from "../fonts";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./LoginForm/RegisterForm";

const pulse = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.08); }
`;

const WelcomeForm = () => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <Box h="90vh" w="49vw" style={{ padding: "0% 10%" }}>
        <Image src={logo} boxSize="100px" borderRadius={10} ml={"40%"} />
        <Heading
          cursor="pointer"
          mt="20px"
          mb="-60px"
          color={COLORS.darkblue}
          fontFamily={FONTS.third}
          size="20px"
          ml="20px"
        >
          <HStack>
            <Text
              _hover={{
                animation: `${pulse} 0.3s ease-in-out forwards`,
              }}
              borderRadius={0}
              onClick={() => setLogin(true)}
              textDecoration={login ? "underline" : ""}
            >
              Sign In
            </Text>
            <Text>|</Text>
            <Text
              _hover={{
                animation: `${pulse} 0.3s ease-in-out forwards`,
              }}
              borderRadius={0}
              onClick={() => setLogin(false)}
              textDecoration={!login ? "underline" : ""}
            >
              Sign Up
            </Text>
          </HStack>
        </Heading>

        {login && <LoginForm />}
        {!login && <RegisterForm />}
      </Box>
    </>
  );
};

export default WelcomeForm;
