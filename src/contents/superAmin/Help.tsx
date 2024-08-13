import {
  Avatar,
  Box,
  ChakraBaseProvider,
  Collapse,
  Fade,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FONTS } from "../../fonts";
import { PiCloudWarningLight } from "react-icons/pi";
import { COLORS } from "../../colors";
import { motion } from "framer-motion";
import img3 from "../../assets/sara.jpg";
import img5 from "../../assets/alaa.jpg";
import help from "../../assets/help.png";
const Help = () => {
  const data = [
    { id: 1, name: "Bilal Kassab", role: "laravel developer" },
    { id: 2, name: "Mohammad Jassem", role: "laravel developer" },
    { id: 3, name: "Sarah Alnajjar", role: "flutter developer", img: img3 },
    { id: 4, name: "Oula Mahfoud", role: "flutter developer" },
    { id: 5, name: "Alaa Almawaldi", role: "React developer", img: img5 },
  ];
  return (
    <HStack w="100%">
      <VStack h={"90vh"} alignItems={"flex-start"} ml="20px">
        <Heading fontFamily={FONTS.heading}>ABOUT US</Heading>
        <Text fontFamily={FONTS.heading}>
          <Text as="span" fontFamily={FONTS.fourth}>
            UniGo
          </Text>{" "}
          Dashboard, powered by:
        </Text>
        {data.map((i, index) => (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HStack mb={"20px"}>
              <Avatar
                src={i?.img}
                shadow={"md"}
                border={`1px solid ${COLORS.Gray}`}
              />
              {/* <VStack gap={0} alignItems={"flex-start"}> */}
              <Text m={0} fontFamily={FONTS.third} whiteSpace="pre-line">
                {i.name}
                {"\n"}
                <Text m={0} color={COLORS.Gray2} as="b" fontSize={"13px"}>
                  {i.role}
                </Text>
              </Text>

              {/* <Text
                m={0}
                fontFamily={FONTS.third}
                fontWeight={"0px"}
                fontSize={"12px"}
              >
                {i.name.replace(" ", ".").toLowerCase()}@gmail.com
              </Text> */}
              {/* </VStack> */}
            </HStack>
          </motion.div>
        ))}
        <Text fontFamily={FONTS.heading} m={0}>
          <PiCloudWarningLight size={"25px"} />
          If you encounter any problem or have any suggestions, contact the work
          team:{" "}
          <Text as="span" fontFamily={FONTS.fourth}>
            {" "}
            work.it@gmail.com
          </Text>
        </Text>
        <Text fontFamily={FONTS.heading}>
          Thank you for using our dashboard! ⁠◍⁠•⁠ᴗ⁠•⁠◍
        </Text>
      </VStack>
      <Flex w={"50%"} justifyContent={"center"}>
        <Image
          borderRadius={7}
          src={help}
          w="10%"
          h="100%"
          width={"20vw"}
          justifySelf={"flex-end"}
        />{" "}
      </Flex>
    </HStack>
  );
};

export default Help;
