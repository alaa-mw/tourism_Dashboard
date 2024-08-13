import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Image,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import image from "../assets/plane1.jpg";
import { Plane } from "../Interfaces/Airport";
import PlaneModal from "./PlaneModal";
import { COLORS } from "../colors";
import { TbPlaneTilt } from "react-icons/tb";
import {
  PiAirplaneDuotone,
  PiAirplaneTiltDuotone,
  PiAirplaneTiltFill,
} from "react-icons/pi";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineDoNotDisturb } from "react-icons/md";
interface Props {
  plane: Plane;
}

const PlaneCard = ({ plane }: Props) => {
  return (
    <Card
      width={"13.2vw"}
      borderRadius={10}
      height={"14.2vh"}
      overflow="hidden"
      _hover={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add your desired hover effect
        transform: "scale(1.01)", // Optional: Scale up the card on hover
        transition: "box-shadow 0.7s ease, transform 0.7s ease", // Smooth transition
      }}
      m={1}
      p={1}
      border={`2px solid ${COLORS.lightblue}`}
    >
      <Flex justifyContent="flex-start">
        <Show breakpoint="(min-width: 140px)">
          <Box width="30%">
            <PiAirplaneTiltDuotone size={"70%"} color={COLORS.cyan_2} />
          </Box>
        </Show>
        <CardBody p={"10px"}>
          <Text m={0} as="b" display={"flex"} justifyContent={"space-between"}>
            {plane.name}
            {plane.visible ? (
              <GiConfirmed size={"20px"} />
            ) : (
              <MdOutlineDoNotDisturb size={"20px"} />
            )}
          </Text>

          <Text m={0} fontSize={"13px"}>
            Total seats: {plane.number_of_seats}{" "}
          </Text>
          <Text m={0} fontSize={"13px"}>
            {" "}
            Day price: {plane.ticket_price} $
          </Text>
        </CardBody>
      </Flex>
    </Card>
  );
};

export default PlaneCard;
