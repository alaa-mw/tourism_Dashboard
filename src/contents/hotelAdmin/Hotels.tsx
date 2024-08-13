import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { FetchResponse } from "../../services/api-client";
import { Hotel, Room } from "../../Interfaces/Hotel";
import RoomCard from "../../component/RoomCard";
import { COLORS } from "../../colors";
import RoomCapacityButton from "../../component/RoomCapacityButton";
import { FONTS } from "../../fonts";
import RoomModal from "../../component/RoomModal";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import useSendData from "../../hooks/useSendData";
import useRefetchState from "../../state-managment/RefetchState";
const Hotels = () => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { data: rooms, refetch } = useFetchData<FetchResponse<Hotel[]>>(
    "/admin/get_my_rooms"
  );
  const { mutate: mutateDelete } = useSendData<Room>("/admin/delete_room");
  console.log(rooms?.data);
  const capacityOptions = [
    { value: 0, label: "All" },
    { value: 1, label: "one capacity" },
    { value: 2, label: "two capacity" },
    { value: 4, label: "four capacity" },
    { value: 6, label: "six capacity" },
  ];
  const [capacity, setCapacity] = useState(0);
  const [roomId, setRoomId] = useState("0");
  const filteredRooms =
    capacity === 0
      ? rooms?.data?.[0].rooms || [] // include all rooms if capacity is 0
      : rooms?.data?.[0].rooms?.filter((room) => room.capacity === capacity);

  const columns = useBreakpointValue({ base: 2, md: 3, lg: 4, xl: 6 });
  const toast = useToast();

  const handleDelete = () => {
    mutateDelete(
      { id: roomId },
      {
        onSuccess: () => {
          setShouldRefetch({ hotels: true });
          // fix - confirm
          toast({
            title: "deleted done",
            status: "success",
            position: "bottom-right",
            variant: "left-accent",
            isClosable: true,
            duration: 4000,
          });
        },
      }
    );
  };
  console.log(roomId === "0");
  useEffect(() => {
    refetch();
    setShouldRefetch({ hotels: false });
  }, [shouldRefetch.hotels]);
  return (
    <>
      <Heading fontFamily={FONTS.heading}>Management Hotel Rooms:</Heading>
      <HStack gap={3} justifyContent="flex-end" h="70vh">
        <VStack spacing={4} w={"20%"}>
          <HStack>
            <RoomModal
              title="Add Rooms"
              icon={<IoMdAdd />}
              capacity={capacity}
              disabled={capacity === 0}
            />{" "}
            <RoomModal
              title="Update Price capacity"
              icon={<MdEdit />}
              capacity={capacity}
              disabled={capacity === 0}
            />
          </HStack>
          {capacityOptions.map((option) => (
            <RoomCapacityButton
              key={option.value}
              capacity={option.label}
              onClick={() => setCapacity(option.value)}
              selected={capacity === option.value}
            />
          ))}
        </VStack>
        <Divider
          orientation="vertical"
          height="60vh"
          variant="dashed"
          borderColor="blue.900"
        />
        <SimpleGrid
          columns={columns}
          spacing={2}
          h="60vh"
          w="65vw"
          overflowY={"auto"}
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
          {filteredRooms?.map((room) => (
            <Flex
              key={room.id}
              onClick={() => setRoomId(room.id)}
              cursor="pointer"
              p={0}
              borderRadius={10}
              bg={roomId === room.id ? `${COLORS.lightblue}` : "transparent"}
              h="139px"
              w="159px"
            >
              <RoomCard room={room} />
            </Flex>
          ))}
        </SimpleGrid>
      </HStack>
      <HStack justifyContent="flex-end" h="40px">
        <Text color="gray" m={0}>
          {" "}
          select room to delete{" "}
        </Text>
        <Button
          bg="red.500"
          color="white"
          m={4}
          isDisabled={roomId === "0"}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </HStack>
    </>
  );
};

export default Hotels;
