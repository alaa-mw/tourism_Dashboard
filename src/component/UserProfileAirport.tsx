import {
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { COLORS } from "../colors";
import { FetchResponse } from "../services/api-client";
import { Airport } from "../Interfaces/Airport";
import useFetchData from "../hooks/useFetchData";
import { FONTS } from "../fonts";

const UserProfileAirport = () => {
  const { data: airport } = useFetchData<FetchResponse<Airport>>(
    "/admin/get-my-airport"
  );
  return (
    <VStack
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={5}
      borderLeft={`2px solid ${COLORS.border}`}
      h="40vh"
      p={2}
    >
      <Text
        fontFamily={FONTS.heading}
        fontSize={"1.5em"}
        color={COLORS.darkblue}
        p="0 6px"
        m="0"
      >
        {" "}
        Airport info:
      </Text>
      <HStack ml={2}>
        <Text
          fontFamily={FONTS.heading}
          fontSize={"1.2em"}
          color={COLORS.darkblue}
          p="0 6px"
          m="0"
        >
          Name:
        </Text>
        <Text fontSize={"1.2em"} p="0 6px" m="0">
          {airport?.data?.name}
        </Text>
      </HStack>

      <HStack ml={2}>
        <Text
          fontFamily={FONTS.heading}
          fontSize={"1.2em"}
          color={COLORS.darkblue}
          p="0 6px"
          m="0"
        >
          Location:
        </Text>
        <Text fontSize={"1.2em"} p="0 6px" m="0">
         {airport?.data?.area.name}, {airport?.data?.country.name} 
        </Text>
      </HStack>
    </VStack>
  );
};

export default UserProfileAirport;
