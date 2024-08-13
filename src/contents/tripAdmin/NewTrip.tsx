import React from "react";
import TripAddForm from "../../component/TripAddForm";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FONTS } from "../../fonts";
import { GiPathDistance } from "react-icons/gi";

const NewTrip = () => {
  return (
    <HStack>
      <Flex w="75%" >
        <TripAddForm />
      </Flex>

      <Flex h="90vh" alignItems={"flex-start"} position={"fixed"} right={2} bottom={0}>
        {" "}
        <Alert
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="400px"
          width={"150px"}
          fontFamily={FONTS.normal}
          borderRadius={10}
        >
          <GiPathDistance size={"100px"} />
          <AlertTitle mb={3} fontSize="lg" display={"flex"}>
            <AlertIcon />
            Some instructions
          </AlertTitle>
          <AlertDescription maxWidth="sm" textAlign={"left"}>
            1. You cannot cancel a trip after one user has booked. <br />
            2. You can modify some of the trip details, but not all of them, to
            achieve the application's efficiency policy
          </AlertDescription>
        </Alert>
      </Flex>
    </HStack>
  );
};

export default NewTrip;
