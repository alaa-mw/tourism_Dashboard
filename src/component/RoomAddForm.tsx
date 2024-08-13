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
import { Room } from "../Interfaces/Hotel";
import useRefetchState from "../state-managment/RefetchState";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  capacity: string;
}

const RoomAddForm = ({ isOpen, onClose, capacity }: Props) => {
  
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const {
    data,
    mutate: mutateAddPlane,
    error,
  } = useSendData<FetchResponse<Room>>("/admin/Add_rooms");

  const [formData, setFormData] = useState({
    capacity: capacity,
    count: "",
    price: "",
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
        setShouldRefetch({hotels:true});
        console.log("Submission success:", data);
        onClose();
        toast({
          title: "Rooms created.",
          description: "We've created new rooms for you.",
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
          <FormLabel>Capacity </FormLabel>
          <Input type="text" name="count" value={formData.capacity} disabled />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>count </FormLabel>
          <Input
            type="text"
            name="count"
            value={formData.count}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>price </FormLabel>
          <Input
            type="text"
            name="price"
            value={formData.price}
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
export default RoomAddForm;
