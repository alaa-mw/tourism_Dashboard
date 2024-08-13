import { Box } from "@chakra-ui/react";
import React from "react";
import { COLORS } from "../colors";

const RoomCapacityButton = ({ capacity, onClick, selected }) => {
  return (
    <Box
      borderRadius="md"
      p={4}
      w={"250px"}
      shadow={"md"}
      textAlign={"center"}
      cursor={"pointer"}
      bg={selected ? `${COLORS.cyan}` : ""}
      onClick={onClick}
      _hover={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transform: "scale(1.04)",
        transition: "box-shadow 0.7s ease, transform 0.7s ease",
      }}
      as="b"
    >
      {capacity}
    </Box>
  );
};

export default RoomCapacityButton;
