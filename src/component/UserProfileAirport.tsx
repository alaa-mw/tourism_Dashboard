import {
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
    <VStack alignItems="flex-start" justifyContent='flex-start'>
      <HStack>
        <Text
          fontFamily={FONTS.heading}
          fontSize={"1.5em"}
          color={COLORS.darkblue}
          p="0 6px"
          m="0"
        >
          Airport Name:
        </Text>
        <Text fontSize={"1.2em"} p="0 6px" m="0">
          {airport?.data?.name}
        </Text>
      </HStack>

      <HStack>
        <Text
          fontFamily={FONTS.heading}
          fontSize={"1.5em"}
          color={COLORS.darkblue}
          p="0 6px"
          m="0"
        >
          Airport Location:
        </Text>
        <Text fontSize={"1.2em"} p="0 6px" m="0">
          {airport?.data?.country.name} - {airport?.data?.area.name}
        </Text>
      </HStack>
    </VStack>
  );
};

export default UserProfileAirport;
