import {
  Button,
  Card,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Spacer,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Trip, TripDetails } from "../Interfaces/Trip";
import { COLORS } from "../colors";
import { MdDelete, MdLink, MdOutlineEditNote } from "react-icons/md";
import { useState } from "react";
import { motion } from "framer-motion";
import { GiConfirmed } from "react-icons/gi";
import { FaCheck } from "react-icons/fa6";
import useSendData from "../hooks/useSendData";
import TripUpdateModal from "./TripUpdateModal";
import { IoMdAdd } from "react-icons/io";

interface Props {
  trip: Trip;

  tripDetails?: TripDetails;
  setID: (id) => void;
}

const TripCard = ({ trip, setID, tripDetails }: Props) => {
  const { data, mutate: mutateDelete } = useSendData<Trip>(
    "/admin/trip-cancellation"
  );

  const toast = useToast();

  const handleClickId = () => {
    setID(trip.id);
  };
  const [showInputGroup, setShowInputGroup] = useState(false);

  const handleClick = () => {
    setID(trip.id);
    setShowInputGroup(!showInputGroup);
  };
  const handleDelete = (id) => {
    mutateDelete(
      { id },
      {
        onError: (error) => {
          toast({
            title: "Warning",
            description: `${error.message}`,
            status: "error",
            position: "bottom-right",
            variant: "left-accent",
            isClosable: true,
            duration: 4000,
          });
        },
        onSuccess: (data) => {
          toast({
            title: "success",
            description: `${data.message}`,
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
  return (
    <Card
      textAlign="left"
      h={showInputGroup ? "100px" : "70px"}
      borderRadius={10}
      overflow="hidden"
      p={1}
      m={1}
      _hover={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add your desired hover effect
        transform: "scale(1.01)", // Optional: Scale up the card on hover
        transition: "box-shadow 0.7s ease, transform 0.7s ease", // Smooth transition
      }}
      // scaleY={showInputGroup ? "100px" : "70px"}
    >
      <HStack h="100%" justifyContent={"space-between"} gap={10}>
        <HStack justifyContent={"space-evenly"} w={"75%"}>
          <Text minW="7vw">{trip.trip_name} </Text>

          <Text minW="7vw">{trip.start_date}</Text>

          <Text minW="7vw">{trip.end_date} </Text>
        </HStack>
        <Flex gap={1}>
          <Button
            onClick={handleClickId}
            color={"white"}
            backgroundColor={COLORS.lightblue}
            borderRadius={20}
          >
            view details
          </Button>
          <Button
            onClick={handleClick}
            // color={COLORS.red300}
            // backgroundColor={COLORS.trans}
            borderRadius={20}
            pl={7}
            w="5px"
            leftIcon={<MdOutlineEditNote size={"25px"} />}
          />
          <Button
            onClick={() => handleDelete(trip.id)}
            color={COLORS.red300}
            // backgroundColor={COLORS.trans}
            borderRadius={20}
            pl={6}
            w="5px"
            leftIcon={<MdDelete size={"25px"} />}
          />
        </Flex>
      </HStack>
      {showInputGroup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HStack spacing={4}>
            <InputGroup>
              <InputLeftAddon>
                <MdLink size={"25px"} />
              </InputLeftAddon>
              <Input placeholder="mygroup" type="link" />
            </InputGroup>
            <Button leftIcon={<FaCheck size={"25px"} />} />
            {/* <PlaneModal
          title="Add Trip"
          icon={<IoMdAdd />}
          plane={selectedPlane ? selectedPlane : undefined}
          disable={!selectedPlane ? true : false}
        /> */}
            <TripUpdateModal title="update" icon={<IoMdAdd />} trip={trip} tripDetails={tripDetails}/>
          </HStack>
        </motion.div>
      )}
    </Card>
  );
};

export default TripCard;
