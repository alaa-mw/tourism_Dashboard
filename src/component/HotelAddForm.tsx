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
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Country, Place } from "../Interfaces/Place";
import category from "../data/category";
import useFetchData from "../hooks/useFetchData";
import useSendData from "../hooks/useSendData";
import { FetchResponse } from "../services/api-client";
import { Airport, Plane } from "../Interfaces/Airport";
import { COLORS } from "../colors";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import useModalStore from "../state-managment/UseModalStore";
import { Hotel } from "../Interfaces/Hotel";
import { RiStarSmileFill, RiStarSmileLine } from "react-icons/ri";
import useRefetchState from "../state-managment/RefetchState";
const HotelAddForm = () => {
  
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { data: locations } = useFetchData<FetchResponse<Country[]>>(
    "/admin/get_all_country"
  );
  const { data, mutate, error } =
    useSendData<FetchResponse<Hotel>>("/admin/add_hotel");
  const { data: areas, mutate: mutateArea } = useSendData<
    FetchResponse<Country[]>
  >("/admin/get_all_area");

  const [form, setForm] = useState({
    name: "",
    area_id: "",
    stars: "",
  });

  const [countryId, setCountryId] = useState("");
  const toast = useToast();
  const { closeModal } = useModalStore();

  useEffect(() => {
    if (countryId) mutateArea({ country_id: countryId });
  }, [countryId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form, {
      onError: (error) => {
        console.error("Submission error:", error);
      },
      onSuccess: (data) => {
        setShouldRefetch({ hotels: true });
        console.log("Submission success:", data);
        closeModal();
        toast({
          title: "done successfully",
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
    <Box w="370px" mx="auto">
      <form onSubmit={handleSubmit}>
        <Text color={COLORS.darkblue} p="0 6px" m="0">
          Hotel Name
        </Text>
        <InputGroup mb="20px">
          <InputLeftElement pointerEvents="none">
            <MdDriveFileRenameOutline color={COLORS.darkblue} />
          </InputLeftElement>
          <Input name="name" variant="flushed" onChange={handleInputChange} />
        </InputGroup>
        <Text color={COLORS.darkblue} p="0 6px" m="0">
          Hotel Location
        </Text>

        <InputGroup mb="20px">
          <InputLeftElement pointerEvents="none">
            <FaLocationDot color={COLORS.darkblue} />
          </InputLeftElement>
          <Select
            name="country"
            variant="flushed"
            ml={10}
            onChange={(event) => setCountryId(event.target.value)}
            placeholder="select country"
          >
            <option key="none" value={""}>
              none
            </option>
            {locations?.data.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </Select>
        </InputGroup>

        <InputGroup mb="20px">
          <InputLeftElement pointerEvents="none">
            <FaLocationDot color={COLORS.darkblue} />
          </InputLeftElement>
          <Select
            name="area_id"
            variant="flushed"
            ml={10}
            onChange={handleInputChange}
            placeholder="select area"
          >
            <option key="none" value={""}>
              none
            </option>
            {areas?.data?.[0].areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </Select>
        </InputGroup>

        <Text color={COLORS.darkblue} p="0 6px" m="0">
          Stars
        </Text>
        <InputGroup mb="20px">
          <InputLeftElement pointerEvents="none">
            <RiStarSmileFill color={COLORS.darkblue} />
          </InputLeftElement>
          <Input
            type="number"
            name="stars"
            variant="flushed"
            onChange={handleInputChange}
            min="0"
            max="5"
          />
        </InputGroup>

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

export default HotelAddForm;
