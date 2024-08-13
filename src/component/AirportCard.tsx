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
import image from "../assets/airport.jpg";
import { Airport } from "../Interfaces/Airport";
import { COLORS } from "../colors";
import useSendData from "../hooks/useSendData";
import useRefetchState from "../state-managment/RefetchState";

interface Props {
  airport: Airport;
  search?: boolean;
}

const AirportCard = ({ airport, search }: Props) => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { mutate } = useSendData<Airport>("/admin/change-airport-visible");
  const { mutate: mutateDelete } = useSendData<Airport>( //fix if add password
    "/admin/delete-airport-for-super-admin"
  );

  const toast = useToast();
  const handleChangeVisible = (id) => {
    mutate(
      { airport_id: id },
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
          setShouldRefetch({airports:true})
        },
      }
    );
  };

  const handleDelete = (id) => {
    mutateDelete(
      { airport_id: id },
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
          setShouldRefetch({airports:true})
        },
      }
    );
  };
  return (
    <Card
      w="80vw"
      h="80px"
      borderRadius={10}
      overflow="hidden"
      p={1}
      _hover={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add your desired hover effect
        transform: "scale(1.01)", // Optional: Scale up the card on hover
        transition: "box-shadow 0.7s ease, transform 0.7s ease", // Smooth transition
      }}
      border={search ? `2px solid ${COLORS.green}` : " "}
    >
      <HStack h="100%" justifyContent={"space-around"} textAlign={"center"}>
        <Image borderRadius={7} src={image} w="10%" h="100%" />
        <Text>{airport.name} </Text>

        <Text>
          {airport?.area?.name} - {airport?.country?.name}{" "}
        </Text>

        <Text>{airport.user.name} </Text>
        <Box>
          {airport.visible ? (
            <Button onClick={() => handleChangeVisible(airport.id)}>
              Make Invisible
            </Button>
          ) : (
            <Button onClick={() => handleChangeVisible(airport.id)}>
              Make visible
            </Button>
          )}
          <Button
            ml={3}
            bgColor={"red.200"}
            onClick={() => handleDelete(airport.id)}
          >
            Delete
          </Button>
        </Box>
      </HStack>
    </Card>
  );
};

export default AirportCard;
