import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Skeleton,
  Spinner,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Trip, TripDetails } from "../../Interfaces/Trip";
import Header from "../../component/Header";
import SearchInput from "../../component/SearchInput";
import TripCard from "../../component/TripCard";
import { FONTS } from "../../fonts";
import useFetchData from "../../hooks/useFetchData";
import { FetchResponse } from "../../services/api-client";
import TripDetailsContainer from "../../component/TripDetailsContainer";
import useFetchDataId from "../../hooks/useFetchDataId";

const Trips = () => {
  const { data: trip, isLoading } = useFetchData<FetchResponse<Trip[]>>(
    "/admin/get-trip-admin-trips"
  );

  const [tripId, setTripId] = useState("");
  const { data: tripDetails, isLoading: isLoadDet } = useFetchDataId<
    FetchResponse<TripDetails>
  >(`/admin/show-static-trip/${tripId}`, tripId);

  return (
    <HStack ml={5}>
      <VStack mr={5} h="90vh">
        {/* <SearchInput /> */}

        <Box width="50vw">
          <Heading fontFamily={FONTS.heading}>My Trips</Heading>

          <Header list={["NAME", "START DATE", "END DATE", "", "PROCESS"]} />
          {isLoading && (
            <Stack>
              <Skeleton height="70px" />
              <Skeleton height="70px" />
              <Skeleton height="70px" />
            </Stack>
          )}
          {trip?.data?.map((trip) => (
            <div key={trip.id}>
              <TripCard
                trip={trip}
                setID={setTripId}
                tripDetails={tripDetails?.data}
              />
            </div>
          ))}
        </Box>
      </VStack>
      <TripDetailsContainer
        tripDetails={tripDetails?.data}
        isLoading={isLoadDet}
      />
    </HStack>
  );
};

export default Trips;
