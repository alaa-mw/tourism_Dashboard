import { Card, HStack, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { FONTS } from "../fonts";

const Header = ({ list  }) => {
  return (
    <Card
      w="100%"
      h="30px"
      borderRadius={7}
      overflow="hidden"
      border={"solid 1px gray"}
    >
      <HStack h="100%" justifyContent="space-around" textAlign={"center"}>
        {list.map((li, index) => (
          <Text key={index} as="b" fontFamily={FONTS.third} >
            {li}
          </Text>
        ))}
      </HStack>
    </Card>
  );
};

export default Header;
