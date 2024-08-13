import { Box, HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ColorModeSwitch = () => {
  //        function   , property      custom hook to work in color mode
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <IconButton
        border={"1px solid white"}
        borderRadius={"100%"}
        pl={1.5}
        icon={
          colorMode == "dark" ? (
            <MdDarkMode color="white" size={25} />
          ) : (
            <MdLightMode color="white" size={25} />
          )
        }
        _hover={{
          transform: "scale(1.04)",
          transition: "transform 0.7s ease",
        }}
        variant="unstyled" // Remove default styles
        bg="transparent" // Remove default background color
        colorScheme="green"
        onClick={toggleColorMode}
        aria-label="Toggle Color Mode"
      />
    </HStack>
  );
};

export default ColorModeSwitch;
