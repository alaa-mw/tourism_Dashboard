import React, { useEffect, useState } from "react";
import { TripDetails } from "../Interfaces/Trip";
import { Card, Heading, Spinner, Text } from "@chakra-ui/react";
import { FONTS } from "../fonts";
import TripDetailsCard from "./TripDetailsCard";
import { COLORS } from "../colors";
import { motion, useAnimate } from "framer-motion";

interface Props {
  tripDetails?: TripDetails;
  isLoading: Boolean;
}

const TripDetailsContainer = ({ tripDetails, isLoading }: Props) => {
  console.log(tripDetails);
  return (
    <Card
      width={"27vw"}
      h={"90vh"}
      textAlign={"center"}
      borderRadius={20}
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      p={2}
      border={`2px solid ${COLORS.cyan}`}
    >
      <Heading fontFamily={FONTS.heading}>Trip Details</Heading>
      {/* //fix -last */}
      {/* {isLoading && tripDetails && <Spinner />}  */}

      {!tripDetails ? (
        <Text color={"gray.400"}>No Trip Selected Yet!</Text>
      ) : (
        <TripDetailsCard tripDetails={tripDetails} />
      )}
    </Card>
  );
};

export default TripDetailsContainer;
