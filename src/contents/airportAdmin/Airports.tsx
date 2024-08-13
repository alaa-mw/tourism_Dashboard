import { HStack, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Plane } from "../../Interfaces/Airport";
import PlaneBar from "../../component/PlaneBar";
import PlaneModal from "../../component/PlaneModal";
import { FONTS } from "../../fonts";
import { COLORS } from "../../colors";
import useFetchData from "../../hooks/useFetchData";
import { FetchResponse } from "../../services/api-client";
import PlaneTripCard from "../../component/PlaneTripCard";
import PlaneTripBar from "../../component/PlaneTripBar";
import PlaneSchedule from "../../component/PlaneSchedule";

const Airports = () => {
  const [selectedPlane, setPlane] = useState<Plane | null>(null);
  const [selectedId, setId] = useState("0");
  return (
    <HStack justifyContent={"space-between"} ml={2}>
      <VStack
        border="1px solid #ccc"
        borderRadius="md"
        width="57vw"
        boxShadow="md"
        height={"90vh"}
      >
        {/* ---------Planes----------- */}
        <PlaneBar
          selectedPlane={selectedPlane}
          setPlane={setPlane}
          selectedId={selectedId}
          setId={setId}
        />
        {/* ---------Plane Trips----*/}
        <PlaneTripBar selectedPlane={selectedPlane} />
      </VStack>
      {/* ------second----------------------- */}
      <VStack
        width={"25vw"}
        border="1px solid #ccc"
        borderRadius="md"
        height={"90vh"}
        boxShadow="md"
      >
        <PlaneSchedule />
      </VStack>
    </HStack>
  );
};

export default Airports;
