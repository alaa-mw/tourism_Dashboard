import React, { useContext, useEffect } from "react";
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { IconBase } from "react-icons";
import {
  Link as ReactRouterLink,
  NavLink as RouterLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import PathLocationContext from "../state-managment/PathLocationContext";
import { COLORS } from "../colors";
import { FONTS } from "../fonts";
interface Props {
  icon: React.ElementType;
  title: string;
  path: string;
  active?: boolean;
  navSize: string;
}

const SideBarItem = ({ icon, title, path, active, navSize }: Props) => {
  const { setPathLocation } = useContext(PathLocationContext);

  const handleClick = () => {
    setPathLocation(path);
    sessionStorage.setItem("pathLocation", path);
  };

  return (
    <Flex
      mt={0}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="left">
        <Link
          as={RouterLink}
          to={path}
          end // only active
          onClick={handleClick}
          replace={false}
          _activeLink={{ fontWeight: "bold" }}
          backgroundColor={active ? COLORS.hover : undefined}
          p={2.5}
          borderRadius={20}
          _hover={{ textDecor: "none", backgroundColor: COLORS.hover }}
          w={navSize === "large" ? "100%" : undefined}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                boxSize={"21px"}
              />
              <Text
                ml={5}
                mb={1}
                display={navSize == "small" ? "none" : "flex"}
                as="b"
                fontSize={"19px"}
                fontFamily={FONTS.heading}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export default SideBarItem;
