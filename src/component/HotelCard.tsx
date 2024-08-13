import React from "react";
import {
  Box,
  Button,
  Card,
  HStack,
  Image,
  Spacer,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import getImageUrl from "../services/image-url";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { Hotel } from "../Interfaces/Hotel";
import { COLORS } from "../colors";
import useSendData from "../hooks/useSendData";
import useRefetchState from "../state-managment/RefetchState";

interface Props {
  hotel: Hotel;
  search?: boolean;
}

const HotelCard = ({ hotel, search }: Props) => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { mutate } = useSendData<Hotel>("/admin/change_visible");
  const { mutate: mutateDelete } = useSendData<Hotel>( //fix if add password
    "/admin/delete-hotel-for-super-admin"
  );

  const toast = useToast();
  const handleChangeVisible = (id) => {
    mutate(
      { id: id, visible: hotel.visible ? "0" : "1" },
      {
        onSuccess: (data) => {
          toast({
            title: "success",
            description: "status changed successfully",
            status: "success",
            position: "bottom-right",
            variant: "left-accent",
            isClosable: true,
            duration: 4000,
          });

          setShouldRefetch({ hotels: true });
        },
      }
    );
  };

  const handleDelete = (id) => {
    mutateDelete(
      { hotel_id: id },
      {
        onSuccess: (data) => {
          toast({
            title: "success",
            description: "delete done successfully",
            status: "success",
            position: "bottom-right",
            variant: "left-accent",
            isClosable: true,
            duration: 4000,
          });

          setShouldRefetch({ hotels: true });
        },
      }
    );
  };
  let rating = hotel.stars;
  return (
    <Card
      w="80vw"
      h="100px"
      borderRadius={10}
      overflow="hidden"
      p={1}
      _hover={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transform: "scale(1.01)",
        transition: "box-shadow 0.7s ease, transform 0.7s ease",
      }}
      border={search ? `2px solid ${COLORS.green}` : " "}
    >
      <HStack
        h="100%"
        gap={"4vw"}
        justifyContent={"space-around"}
        textAlign={"center"}
      >
        <Image
          borderRadius={7}
          src={getImageUrl(hotel.image)}
          w="10%"
          h="100%"
        />{" "}
        <VStack>
          <Text w={"8vw"} mb={0}>
            {hotel.name}{" "}
          </Text>

          <HStack gap={0.001}>
            {[...Array(5)].map((_, idx) =>
              idx < rating ? (
                <IoMdStar key={idx} color={"#ffd500"} size={20} />
              ) : (
                <IoMdStarOutline color="gray" key={idx} size={20} />
              )
            )}
          </HStack>
        </VStack>
        <Text w={"8vw"}>{hotel.number_rooms} rooms</Text>
        <Text w={"8vw"}>
          {hotel?.country?.name} - {hotel?.area?.name}{" "}
        </Text>
        <Text w={"8vw"}>{hotel.user.name} </Text>
        <Box>
          {hotel.visible ? (
            <Button onClick={() => handleChangeVisible(hotel.id)}>
              Make Invisible
            </Button>
          ) : (
            <Button onClick={() => handleChangeVisible(hotel.id)}>
              Make visible
            </Button>
          )}
          <Button
            ml={3}
            bgColor={"red.200"}
            onClick={() => handleDelete(hotel.id)}
          >
            Delete
          </Button>
        </Box>
      </HStack>
    </Card>
  );
};

export default HotelCard;
