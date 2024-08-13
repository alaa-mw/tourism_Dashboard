import React, { useEffect, useState } from "react";
import PlaceCard from "../../component/PlaceCard";
import PlaceModal from "../../component/PlaceModal";
import { IoMdAdd } from "react-icons/io";
import {
  Grid,
  GridItem,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import SearchInput from "../../component/SearchInput";
import { FONTS } from "../../fonts";
import useFetchData from "../../hooks/useFetchData";
import { FetchResponse } from "../../services/api-client";
import { Place } from "../../Interfaces/Place";
import useSendData from "../../hooks/useSendData";
import PlaceFilter from "../../component/PlaceFilter";
import useRefetchState from "../../state-managment/RefetchState";
import { COLORS } from "../../colors";

const Places = () => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const [filterResult, setFilterResult] = useState<Place[] | undefined>([]);
  console.log("init", filterResult);
  const { data, isLoading, refetch } =
    useFetchData<FetchResponse<Place[]>>("/admin/places");

  const {
    data: invisible,
    isLoading: is,
    refetch: refetchInvisible,
  } = useFetchData<FetchResponse<Place[]>>("/admin/un-visible-places");
  console.log(data?.data);

  const { data: searched, mutate } = useSendData<Place[]>(
    "/admin/search-for-place"
  );

  const handleSearch = (searchTerm) => {
    setFilterResult(undefined);
    mutate({ name: searchTerm });
    console.log("Search term:", searchTerm);
    console.log("result:", searched);
  };
  const nonCommonData = [
    ...(data?.data.filter(
      (place) => !searched?.data.some((SPlace) => place.id === SPlace.id)
    ) || []),
  ];

  const nonCommonDataIn = [
    ...(invisible?.data.filter(
      (place) => !searched?.data.some((SPlace) => place.id === SPlace.id)
    ) || []),
  ];
  console.log("filterResult", filterResult);
  useEffect(() => {
    refetch();
    refetchInvisible();
    setShouldRefetch({ places: false });
  }, [shouldRefetch.places]);

  return (
    <>
      <VStack>
        <HStack width="80vw">
          <SearchInput onSearch={handleSearch} />
          <PlaceModal title="Add" icon={<IoMdAdd />} />
        </HStack>
        <Heading fontFamily={FONTS.heading} m={0}>
          Places
        </Heading>
        <PlaceFilter setFilterResult={setFilterResult} />
        {isLoading && <Spinner />}

        {/* { !filterResult && <Text color={COLORS.Gray} m={1}>No filter result! </Text>} */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {filterResult ? (
            filterResult?.map((place) => (
              <GridItem key={place.id}>
                <PlaceCard place={place} />
              </GridItem>
            ))
          ) : (
            <>
              {searched?.data?.map((place) => (
                <GridItem key={place.id}>
                  <PlaceCard place={place} search />
                </GridItem>
              ))}
              {nonCommonData.map((place) => (
                <GridItem key={place.id}>
                  <PlaceCard place={place} />
                </GridItem>
              ))}
              {nonCommonDataIn.map((place) => (
                <GridItem key={place.id}>
                  <PlaceCard place={place} />
                </GridItem>
              ))}
            </>
          )}
        </Grid>
      </VStack>
    </>
  );
};

export default Places;
