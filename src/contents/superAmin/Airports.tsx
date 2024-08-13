import { HStack, Heading, Spinner, VStack } from "@chakra-ui/react";
import AirportCard from "../../component/AirportCard";
import SearchInput from "../../component/SearchInput";
import { FONTS } from "../../fonts";
import useFetchData from "../../hooks/useFetchData";
import { FetchResponse } from "../../services/api-client";
import { Airport } from "../../Interfaces/Airport";
import Header from "../../component/Header";
import useSendData from "../../hooks/useSendData";
import useRefetchState from "../../state-managment/RefetchState";
import { useEffect, useState } from "react";
import AirportFilter from "../../component/AirportFilter";

const Airports = () => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();

  const [lastSearchTerm, setLastSearchTerm] = useState();

  const [filterResult, setFilterResult] = useState<Airport[] | undefined>([]);
  const { data, isLoading, refetch } =
    useFetchData<FetchResponse<Airport[]>>("/admin/all-airport");
  const { data: searched, mutate } = useSendData<Airport[]>(
    "/admin/search-for-airport"
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
    (airport) =>
      !searched?.data?.find(
        (searchedAirport) => searchedAirport.id === airport.id
      )
  );

  useEffect(() => {
    refetch();
    handleSearch(lastSearchTerm);
    setShouldRefetch({ airports: false });
  }, [shouldRefetch.airports]);
  return (
    <VStack>
      <HStack width="80vw">
        <SearchInput onSearch={handleSearch} />
      </HStack>
      <Heading fontFamily={FONTS.heading}>Airports</Heading>
      <AirportFilter setFilterResult={setFilterResult} />
      <Header list={["IMAGE", "NAME", "LOCATION", "OWNER", "PROCCESES"]} />
      {searched?.data.map((airport) => (
        <div key={airport.id}>
          <AirportCard airport={airport} search></AirportCard>
        </div>
      ))}
      {isLoading && <Spinner />}
      {dataNoSearched?.map((airport) => (
        <div key={airport.id}>
          <AirportCard airport={airport}></AirportCard>
        </div>
      ))}
    </VStack>
  );
};

export default Airports;
