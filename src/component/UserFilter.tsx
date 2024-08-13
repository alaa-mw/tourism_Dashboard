import {
  Button,
  HStack,
  Select,
  Show,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { COLORS } from "../colors";
import { FaSortAlphaDown, FaUserCheck } from "react-icons/fa";
import { MdAppBlocking, MdRecentActors } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { FONTS } from "../fonts";
import roles from "../data/filterRoles";
import useFilterStore from "../state-managment/FilterState";
import { RiUserFollowLine, RiUserForbidLine } from "react-icons/ri";
import { LuUserCog2 } from "react-icons/lu";
import { LiaUserCogSolid } from "react-icons/lia";

const UserFilter = () => {
  const { by_name, most_recent, role_id, user_type, setFilters } =
    useFilterStore();

  const selectedRole = roles.find((role) => role.id === role_id);

  const modal1 = useDisclosure();
  const modal2 = useDisclosure();
  const modal3 = useDisclosure();
  const modal4 = useDisclosure();

  const handleOrderChange = () => {
    modal1.onToggle();
    setFilters({ by_name: by_name === null ? "asc" : null });
  };

  const handleRecentChange = () => {
    modal2.onToggle();
    setFilters({ most_recent: most_recent === 0 ? 1 : 0 });
  };

  const handleRoleChange = (event) => {
    const { value } = event.target;
    const selectedRole = roles.find((role) => role.name === value);
    setFilters({ role_id: selectedRole?.id });
  };
  const handleTypeChange = () => {
    modal4.onToggle();
    setFilters({ user_type: user_type === null ? "banned" : null });
    console.log("use_type", user_type === null, user_type);
  };

  return (
    <HStack m={5}>
      <Text fontFamily={FONTS.heading} mb={0}>
        Filter by :
      </Text>
      <Button
        backgroundColor={modal1.isOpen ? "blue.300" : ""} // Set background color
        onClick={handleOrderChange}
        borderRadius={20}
      >
        <FaSortAlphaDown size={"18px"} />
        <Show breakpoint="(min-width: 430px)">
          {" "}
          <Text m={2}>A to Z</Text>
        </Show>
      </Button>

      <Button
        backgroundColor={modal2.isOpen ? "blue.300" : ""}
        onClick={handleRecentChange}
        borderRadius={20}
      >
        <MdRecentActors size={"25px"}  />
        <Show breakpoint="(min-width: 430px)">
          <Text m={2}>Recently registered</Text>
        </Show>
      </Button>

      <Button
        backgroundColor={modal4.isOpen ? "blue.300" : ""}
        onClick={handleTypeChange}
        borderRadius={20}
      >
        <RiUserForbidLine size={"18px"} />
        <Show breakpoint="(min-width: 430px)">
          {" "}
          <Text m={2}> Banned </Text>
        </Show>
      </Button>

      <Button
        backgroundColor={modal3.isOpen ? "blue.300" : ""}
        onClick={modal3.onToggle}
        borderRadius={20}
      >
        <LiaUserCogSolid  size={"18px"}  />
        <Select
          m={2}
          variant="unstyled"
          placeholder={selectedRole?.name}
          onChange={handleRoleChange}
        >
          {roles.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
        <Show breakpoint="(min-width: 430px)"></Show>
      </Button>
    </HStack>
  );
};

export default UserFilter;
