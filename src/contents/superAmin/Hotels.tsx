import {
  Box,
  Card,
  HStack,
  Heading,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchInput from "../../component/SearchInput";
import { FONTS } from "../../fonts";
import HotelCard from "../../component/HotelCard";
import Header from "../../component/Header";
import useFetchData from "../../hooks/useFetchData";
import { FetchResponse } from "../../services/api-client";
import { Hotel } from "../../Interfaces/Hotel";
import useSendData from "../../hooks/useSendData";
import useRefetchState from "../../state-managment/RefetchState";
import PlaceFilter from "../../component/PlaceFilter";
import { Place } from "../../Interfaces/Place";
import HotelFilter from "../../component/HotelFilter";

const Hotels = () => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const [lastSearchTerm, setLastSearchTerm] = useState();

  const [filterResult, setFilterResult] = useState<Hotel[] | undefined>([]);
  const { data, isLoading, refetch } = useFetchData<FetchResponse<Hotel[]>>(
    "/admin/get_all_Hotel"
  );
  const { data: searched, mutate } = useSendData<Hotel[]>(
    "/admin/search_Hotel_by_name"
  );
  const handleSearch = (searchTerm) => {
    if (searchTerm !== undefined) {
      mutate({ name: searchTerm });
      setLastSearchTerm(searchTerm);
    }
    console.log("Search term:", searchTerm);
    console.log("result:", searched);
  };
  const dataAfterFilter = filterResult ? filterResult : data?.data;
  const dataNoSearched = dataAfterFilter?.filter(
    (hotel) =>
      !searched?.data?.find((searchedHotel) => searchedHotel.id === hotel.id)
  );

  useEffect(() => {
    refetch();
    handleSearch(lastSearchTerm);
    setShouldRefetch({ hotels: false });
  }, [shouldRefetch.hotels]);
  return (
    <VStack>
      <HStack width="80vw">
        <SearchInput onSearch={handleSearch} />
      </HStack>
      <Heading fontFamily={FONTS.heading}>Hotels</Heading>
      <HotelFilter setFilterResult={setFilterResult} />
      <Header
        list={[
          "IMAGE",
          "NAME",
          "TOTAL ROOMS",
          "LOCATION",
          "OWNER",
          "PROCCESES",
        ]}
      />

      {isLoading && <Spinner />}
      {searched?.data?.map((hotel) => (
        <div key={hotel.id}>
          <HotelCard hotel={hotel} search></HotelCard>
        </div>
      ))}
      {dataNoSearched?.map((hotel) => (
        <div key={hotel.id}>
          <HotelCard hotel={hotel}></HotelCard>
        </div>
      ))}
    </VStack>
  );
};

export default Hotels;
