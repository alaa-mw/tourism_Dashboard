import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Image,
  Spacer,
  Text,
  VStack,
  keyframes,
} from "@chakra-ui/react";
import { TripDetails } from "../Interfaces/Trip";
import image from "../assets/plane.png";
import { FONTS } from "../fonts";
import { COLORS } from "../colors";
import { MdLocalAirport } from "react-icons/md";
import { PiAirplaneTiltLight } from "react-icons/pi";
import { LiaHotelSolid } from "react-icons/lia";
import getImageUrl from "../services/image-url";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { BsTelegram } from "react-icons/bs";
const backInDown = keyframes` 
    from {
      transform: translateX(20%);
      opacity: 0.5;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  `;

interface Props {
  tripDetails: TripDetails;
}

const TripDetailsCard = ({ tripDetails }: Props) => {
  console.log("here trip details");
  console.log(tripDetails);
  // const [shouldAnimate, setShouldAnimate] = useState(false);

  // useEffect(() => {
  //   setShouldAnimate(true);
  //   const timeoutId = setTimeout(() => {
  //     setShouldAnimate(false);
  //   }, 1000);

  //   return () => clearTimeout(timeoutId);
  // }, [tripDetails]);

  return (
    <VStack h="100%">
      <CardBody
        h="100%"
        overflow="hidden"
        // animation={shouldAnimate ? `${backInDown} 1s ease-in-out` : undefined}
      >
        <VStack h="98%" justifyContent={"space-between"}>
          <Text as="b">{tripDetails?.static_trip.trip_name}</Text>

          <Image src={image} />

          <HStack gap="4rem">
            <Text as="b">
              {tripDetails?.source_trip?.name}

              <br />
              {tripDetails.static_trip.start_date}
            </Text>
            <Text as="b">
              {tripDetails?.destination_trip.name}
              <br />
              {tripDetails.static_trip.end_date}
            </Text>
          </HStack>

          <HStack>
            <PiAirplaneTiltLight />
            <Text m={0}>
              {" Go Plane: "}
              {tripDetails?.going_trip.going_plane.name}
            </Text>
          </HStack>
          <HStack>
            <PiAirplaneTiltLight style={{ transform: "scaleX(-1)" }} />
            <Text m={0}>
              {" Back Plane: "}
              {tripDetails?.return_trip.return_plane.name}
            </Text>
          </HStack>

          <HStack>
            <LiaHotelSolid />
            <Text m={0}>
              {"Hotel: "}
              {tripDetails.hotel.name}
            </Text>
          </HStack>
          <Text m={0} as="b">
            Visited Places{" "}
          </Text>
          <HStack
            w={"20vw"}
            h={"110px"}
            justifyContent={"center"}
            overflow={"hidden"}
          >
            {tripDetails.places.slice(0, 4).map(
              (
                place // fix -confirm
              ) => (
                <VStack minW={"100px"} h={"100px"} key={place.id}>
                  <Image
                    boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
                    borderRadius={10}
                    boxSize="50px"
                    src={getImageUrl(place.images[0]?.image)}
                  />
                  <Text h={"10%"}>{place.name}</Text>
                </VStack>
              )
            )}
          </HStack>
          <HStack>
            <Text as="b" m={0}>
              Activites:
            </Text>
            {tripDetails.activities.map((act) => (
              <Text m={0} key={act.id}>
                {act.name}{" "}
              </Text>
            ))}
          </HStack>

          {tripDetails.static_trip.new_price ? (
            <Text m={0}>
              <b>Price:</b>
              <Text as="span" textDecor="line-through">
                {tripDetails.static_trip.price}
              </Text>
              {"   "}
              {tripDetails.static_trip.new_price} ${" "}
            </Text>
          ) : (
            <Text m={0}>
              <b>Price:</b> {tripDetails.static_trip.price} $ -
              <Text as="span" fontFamily={FONTS.normal}>
                {tripDetails.static_trip.number_of_people} peoples
              </Text>{" "}
            </Text>
          )}
          <Text m={0}>
            <b>Notes:</b> {tripDetails.static_trip.trip_note.substring(0, 90)}
          </Text>
          <Flex>
            <a href={`https://t.me/+CaFDyE2sTd45YmU0`} target="_blank">
              <Button
                borderRadius={20}
                leftIcon={<BsTelegram color="#00A3C4" />}
                w={"15vw"}
                border={`1px solid ${COLORS.cyan}`}
                shadow={"sm"}
              >
                Go to Group
              </Button>
            </a>
          </Flex>
        </VStack>
      </CardBody>
    </VStack>
  );
};

export default TripDetailsCard;
