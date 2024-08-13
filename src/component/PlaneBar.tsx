import { Flex, HStack, Heading, Skeleton } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FONTS } from "../fonts";
import PlaneModal from "./PlaneModal";
import { useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { FetchResponse } from "../services/api-client";
import { Plane } from "../Interfaces/Airport";
import { COLORS } from "../colors";
import PlaneCard from "./PlaneCard";
import useRefetchState from "../state-managment/RefetchState";

interface Props {
  selectedPlane: Plane | null;
  setPlane: (p: Plane) => void;
  selectedId: string;
  setId: (i) => void;
}
const PlaneBar = ({ selectedPlane, setPlane, selectedId, setId }: Props) => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { data, isLoading, refetch } = useFetchData<FetchResponse<Plane[]>>(
    "admin/get-my-planes"
  );
  const handleSelect = (p, i) => {
    setPlane(p);
    setId(i);
  };
  useEffect(() => {
    refetch();
    setShouldRefetch({ planes: false });
  }, [shouldRefetch.planes]);
  return (
    <>
      <HStack width="57vw" gap={"36vw"}>
        <Heading fontFamily={FONTS.heading} size={"lg"} ml={4} mb={0}>
          My Planes
        </Heading>
        <div>
          <PlaneModal title="Add" icon={<IoMdAdd />} />{" "}
          <PlaneModal
            title="Update"
            icon={<MdEdit />}
            plane={selectedPlane ? selectedPlane : undefined}
            disable={selectedPlane?.id !== selectedId ? true : false}
          />
        </div>
      </HStack>

      <HStack
        width="57vw"
        height="23vh"
        overflowX="auto"
        p={"3px"}
        border={`1px solid ${COLORS.Gray} `}
        borderRadius={10}
        sx={{
          "&::-webkit-scrollbar": {
            height: "10px",
            borderRadius: "8px",
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `rgba(0, 0, 0, 0.06)`,
            borderRadius: `8px`,
          },
        }}
      >
        {isLoading && (
          <HStack w="90%">
            <Skeleton width="200px" height="100px" />
            <Skeleton width="200px" height="100px" />
            <Skeleton width="200px" height="100px" />
            <Skeleton width="200px" height="100px" />
          </HStack>
        )}
        {data?.data.map((plane) => (
          <Flex
            key={plane.id}
            onClick={() => handleSelect(plane, plane.id)}
            cursor="pointer"
            p={0}
            borderRadius={10}
            bg={
              selectedPlane?.id === plane.id
                ? `${COLORS.lightblue}`
                : "transparent"
            }
          >
            <PlaneCard plane={plane} />
          </Flex>
        ))}
      </HStack>
    </>
  );
};

export default PlaneBar;
