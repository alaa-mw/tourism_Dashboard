import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Plane } from "../Interfaces/Airport";
import useSendData from "../hooks/useSendData";
import { FetchResponse } from "../services/api-client";
import useRefetchState from "../state-managment/RefetchState";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  plane: Plane;
}

const PlaneUpdateForm = ({ isOpen, onClose, plane }: Props) => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { data, mutate, error } = useSendData<FetchResponse<Plane>>(
    `/admin/update-plane/${plane.id}`
  );
  const [formData, setFormData] = useState({
    name: plane.name,
    number_of_seats: plane.number_of_seats,
    ticket_price: plane.ticket_price,
    visible: plane.visible,
  });
  const toast = useToast();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };

  const handlecheckChange = (event) => {
    setFormData({ ...formData, visible: event.target.checked ? 1 : 0 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    mutate(formData, {
      onError: (error) => {
        console.error("Submission error:", error);
      },
      onSuccess: (data) => {
        setShouldRefetch({planes:true})
        console.log("Submission success:", data);
        onClose();
        toast({
          title: "updated successfully.",
          status: "success",
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
          duration: 4000,
        });
      },
    });
  };
  return (
    <Box maxW="400px" mx="auto">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Name </FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>number of seats </FormLabel>
          <Input
            type="text"
            name="number_of_seats"
            value={formData.number_of_seats}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Ticket price </FormLabel>
          <Input
            type="text"
            name="ticket_price"
            value={formData.ticket_price}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <HStack>
            <FormLabel m={0}>isVisible:</FormLabel>
            <Switch
              checked={formData.visible === 1}
              onChange={handlecheckChange}
            />
            <div> current: {formData.visible ? "visible" : "invisible"}</div>
          </HStack>
        </FormControl>
        {error && (
          <Alert
            status="error"
            fontSize={"14px"}
            p={"2px"}
            m={"5px 0px"}
            borderRadius={7}
          >
            <AlertIcon />
            {error.message}{" "}
          </Alert>
        )}
        <Flex justifyContent={"center"}>
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default PlaneUpdateForm;
