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
import { useEffect, useState } from "react";
import { Trip, TripDetails } from "../../Interfaces/Trip";
import Header from "../../component/Header";
import SearchInput from "../../component/SearchInput";
import TripCard from "../../component/TripCard";
import { FONTS } from "../../fonts";
import useFetchData from "../../hooks/useFetchData";
import { FetchResponse } from "../../services/api-client";
import TripDetailsContainer from "../../component/TripDetailsContainer";
import useFetchDataId from "../../hooks/useFetchDataId";
import useRefetchState from "../../state-managment/RefetchState";

const Trips = () => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const {
    data: trip,
    isLoading,
    refetch,
  } = useFetchData<FetchResponse<Trip[]>>("/admin/get-trip-admin-trips");

  const [tripId, setTripId] = useState("");
  const {
    data: tripDetails,
    isLoading: isLoadDet,
    refetch: refetchDetails,
  } = useFetchDataId<FetchResponse<TripDetails>>(
    `/admin/show-static-trip/${tripId}`,
    tripId
  );

  useEffect(() => {
    refetch();
    setShouldRefetch({ trips: false });
  }, [shouldRefetch.trips]);
  useEffect(() => {
    refetchDetails();
    setShouldRefetch({ tripDetails: false });
  }, [shouldRefetch.tripDetails]);
  
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
