import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { COLORS } from "../colors";
import { PlaneTrip } from "../Interfaces/Airport";
import image2 from "../assets/plane4.png";
import { FONTS } from "../fonts";
import { IconBase } from "react-icons";
import { MdOutlineTimer } from "react-icons/md";
import { FaMoneyBillWave, FaRegMoneyBillAlt } from "react-icons/fa";
import { FaPeopleLine } from "react-icons/fa6";
interface Props {
  planeTrip: PlaneTrip;
  image?: boolean;
}

const PlaneTripCard = ({ planeTrip, image }: Props) => {
  const displayedImage = image ?? true;
  return (
    <Card
      textAlign="left"
      h="100px"
      w="100%"
      borderRadius={10}
      overflow="hidden"
      p={1}
      borderBottom={`2px dashed ${COLORS.Gray} `}
    >
      <HStack h="100%" gap={"3vw"} justifyContent={"space-evenly"}>
        {displayedImage && (
          <Box position="relative" w="13%">
            <Image borderRadius={20} src={image2} alt="Image description" />
            <Box
              position="absolute"
              top="60%"
              left="50%"
              transform="translate(-50%)"
              textAlign="center"
              color="white"
              fontFamily={FONTS.third}
              fontSize={"14px"}
              w={"90%"}
            >
              {planeTrip.airport_source.name}
            </Box>
          </Box>
        )}

        <VStack>
          <Text m={0} as="b" fontSize={"1.1em"} fontFamily={FONTS.third}>
            {planeTrip.airport_source.name}{" "}
          </Text>
          <Text m={0} fontSize={"14px"}>
            {planeTrip.flight_date}
          </Text>
        </VStack>
        {displayedImage ? (
          <>
            <Flex align="center" direction={"column"}>
              <FaPeopleLine size={"25px"} />
              <Text m={0}>{planeTrip.available_seats} seats</Text>
            </Flex>
            <Flex align="center" direction={"column"}>
              {/* <FaRegMoneyBillAlt  size={"25px"} /> */}
              <FaMoneyBillWave size={"25px"} />
              <Text m={0}>{planeTrip.current_price} $</Text>
            </Flex>
            <Flex align="center" direction={"column"}>
              <MdOutlineTimer size={"25px"} color={COLORS.darkblue} />
              <Text m={0}>{planeTrip.flight_duration}</Text>
            </Flex>
          </>
        ) : (
          <Flex align="center" direction={"column"}>
            <MdOutlineTimer size={"25px"} color={COLORS.darkblue} />
            <Text m={0}>{planeTrip.flight_duration}</Text>
          </Flex>
        )}

        <VStack>
          <Text m={0} as="b" fontSize={"1.1em"} fontFamily={FONTS.third}>
            {planeTrip.airport_destination.name}{" "}
          </Text>
          <Text m={0} fontSize={"14px"}>
            {planeTrip.landing_date}
          </Text>
        </VStack>

        {/* <Button
          //   onClick={handleClick}
          color={"white"}
          backgroundColor={COLORS.lightblue}
          borderRadius={10}
        >
          Update
        </Button> */}
      </HStack>
    </Card>
  );
};

export default PlaneTripCard;
