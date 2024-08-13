import React from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Image,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Country, Place } from "../Interfaces/Place";
import category from "../data/category";
import useFetchData from "../hooks/useFetchData";
import useSendData from "../hooks/useSendData";
import { FetchResponse } from "../services/api-client";
import { Plane } from "../Interfaces/Airport";
import useRefetchState from "../state-managment/RefetchState";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PlaneAddForm = ({ isOpen, onClose }: Props) => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { data: countries } = useFetchData<FetchResponse<Country[]>>(
    "/admin/get_all_country"
  );
  const {
    data,
    mutate: mutateAddPlane,
    error,
  } = useSendData<FetchResponse<Plane>>("/admin/add-plane");

  const [formData, setFormData] = useState({
    name: "",
    number_of_seats: "",
    ticket_price: "",
    image: null as File[] | null,
  });
  const toast = useToast();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    mutateAddPlane(formData, {
      onError: (error) => {
        console.error("Submission error:", error);
      },
      onSuccess: (data) => {
        setShouldRefetch({ planes: true });
        console.log("Submission success:", data);
        onClose();
        toast({
          title: "Plane created.",
          description: "We've created your plane for you.",
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
          <FormLabel>number of seats *</FormLabel>
          <Input
            type="text"
            name="number_of_seats"
            value={formData.number_of_seats}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Ticket price *</FormLabel>
          <Input
            type="text"
            name="ticket_price"
            value={formData.ticket_price}
            onChange={handleInputChange}
          />
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

export default PlaneAddForm;
