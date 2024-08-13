import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import useFetchData from "../hooks/useFetchData";
import { FetchResponse } from "../services/api-client";
import { Plane } from "../Interfaces/Airport";
import { FONTS } from "../fonts";
import PlaneModal from "./PlaneModal";
import { COLORS } from "../colors";
import PlaneTripCard from "./PlaneTripCard";
import p1 from "../assets/plane1.png";
import { LuSearchX } from "react-icons/lu";
import useFetchDataId from "../hooks/useFetchDataId";
import useRefetchState from "../state-managment/RefetchState";
import { useEffect } from "react";

const PlaneTripBar = ({ selectedPlane }) => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const {
    data: planeTrips,
    isLoading: isLoad,
    refetch,
  } = useFetchDataId<FetchResponse<Plane>>(
    `admin/get-all-trips-plane/${selectedPlane?.id}`,
    selectedPlane?.id
  );

  useEffect(() => {
    refetch();
    setShouldRefetch({ planeTrips: false });
  }, [shouldRefetch.planeTrips]);
  return (
    <>
      <HStack width="57vw" gap={"44vw"}>
        <Heading fontFamily={FONTS.heading} size={"md"} ml={4} mb={0}>
          Plane Trips
        </Heading>
        <PlaneModal
          title="Add Trip"
          icon={<IoMdAdd />}
          plane={selectedPlane ? selectedPlane : undefined}
          disable={!selectedPlane ? true : false}
        />
      </HStack>
      <VStack
        width="57vw"
        height="70vh"
        overflow={"auto"}
        p={"4px"}
        border={`3px solid ${COLORS.border} `}
        boxShadow="base"
        borderRadius={10}
        sx={{
          "&::-webkit-scrollbar": {
            width: "10px",
            borderRadius: "8px",
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `rgba(0, 0, 0, 0.06)`,
            borderRadius: `8px`,
          },
        }}
      >
        {isLoad && selectedPlane && <Spinner />}
        {!planeTrips || !planeTrips?.data?.tripss.length ? (
          <>
            <Box mt={10}>
              <LuSearchX color={COLORS.Gray2} size={"100px"} />
            </Box>
            <Text
              color={COLORS.Gray2}
              mt={3}
              fontSize={"30px"}
              fontWeight={"bold"}
              fontFamily={FONTS.normal}
            >
              No Trips Yet !
            </Text>
          </>
        ) : (
          <>
            {planeTrips?.data?.tripss.map((pTrip) => (
              <div key={pTrip.id}>
                <PlaneTripCard planeTrip={pTrip} />
              </div>
            ))}
          </>
        )}
      </VStack>
    </>
  );
};

export default PlaneTripBar;
