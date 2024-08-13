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
import BookStatic from "../../component/BookStatic";
import BookStaticAccordion from "../../component/BookStaticAccordion";
import useRefetchState from "../../state-managment/RefetchState";

const Books = () => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { data: trip, isLoading,refetch } = useFetchData<FetchResponse<Trip[]>>(
    "/admin/get-trip-admin-trips"
  );

  const [tripId, setTripId] = useState("");
  useEffect(() => {
    refetch();
    setShouldRefetch({tripBook:false})
  }, [shouldRefetch.tripBook]);
  return (
    <VStack w="95%">
      {/* <SearchInput /> */}

      <Box>
        <Heading fontFamily={FONTS.heading}>Trips Books</Heading>

        <Header
          list={["NAME", "START DATE", "END DATE", "PRICE", "CAPACITY"]}
        />
        {isLoading && (
          <Stack>
            <Skeleton height="70px" />
            <Skeleton height="70px" />
            <Skeleton height="70px" />
          </Stack>
        )}
        {trip?.data?.map((trip) => (
          <div key={trip.id}>
            <BookStaticAccordion trip={trip} tripAdmin />
          </div>
        ))}
      </Box>
    </VStack>
  );
};

export default Books;
