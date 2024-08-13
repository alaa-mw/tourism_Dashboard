import {
  Card,
  CardBody,
  Flex,
  HStack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { Room } from "../Interfaces/Hotel";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { COLORS } from "../colors";
import { CgUnavailable } from "react-icons/cg";
import useSendData from "../hooks/useSendData";
import { FetchResponse } from "../services/api-client";
import useRefetchState from "../state-managment/RefetchState";

interface Props {
  room: Room;
}

const RoomCard = ({ room }: Props) => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { mutate } = useSendData<FetchResponse<Room>>(
    "/admin/change_status_room"
  );
  const toast = useToast();
  const handle = () => {
    mutate(
      {
        id: room.id,
        status: room.status === 0 ? 1 : 0,
      },
      {
        onSuccess: () => {
          setShouldRefetch({ hotels: true });
          toast({
            title: "Status Updated.",
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
  console.log(room.status);
  return (
    <Card
      borderRadius={10}
      h={"130px"}
      w="160px"
      overflow="hidden"
      _hover={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transform: "scale(1.01)",
        transition: "box-shadow 0.7s ease, transform 0.7s ease",
      }}
      m={1}
      p={1}
    >
      <Flex justifyContent="flex-start">
        <CardBody p={"5px"}>
          <HStack justifyContent={"space-between"}>
            <Text m={0} as="b">
              Room{"     "}
              <span
                style={{
                  backgroundColor: "#63b3ed",
                  borderRadius: "4px",
                  padding: "2px",
                }}
              >
                {room.id}
              </span>
            </Text>
            {room.status === 0 && (
              <Tooltip label="visible" placement="top">
                <button>
                  <FaCheckCircle
                    size="20px"
                    onClick={handle}
                    color={COLORS.lightblue}
                  />
                </button>
              </Tooltip>
            )}
            {room.status === 1 && (
              <Tooltip label="invisible" placement="top">
                <button>
                  <CgUnavailable size="20px" onClick={handle} color="red" />
                </button>
              </Tooltip>
            )}
          </HStack>
          <Text m={0} fontSize={"15px"}>
            {" "}
            Capacity: {room.capacity}
          </Text>
          <Text m={0} fontSize={"15px"}>
            Status: {room.status === 0 ? "available" : "not available"}
          </Text>
          <Text m={0} fontSize={"15px"}>
            {" "}
            Price: {room.price} $
          </Text>
        </CardBody>
      </Flex>
    </Card>
  );
};

export default RoomCard;
