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
import useRefetchState from "../state-managment/RefetchState";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  place: Place;
}
// fix category reqired, numeric
const PlaceUpdateForm = ({ isOpen, onClose, place }: Props) => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { data: countries } = useFetchData<FetchResponse<Country[]>>(
    "/admin/get_all_country"
  );

  const Id = place.id;
  console.log(Id);
  const {
    data: UpdatedData,
    mutate: mutateUpdatePlace,
    error,
  } = useSendData<FetchResponse<Place>>(`/admin/update-place/${Id}`);

  const [countryId, setCountryId] = useState<string>("");

  const { data: areas, mutate } = useSendData<FetchResponse<Country[]>>(
    "/admin/get_all_area"
  );

  useEffect(() => {
    if (countryId) mutate({ country_id: countryId });
  }, [countryId]);

  const [formData, setFormData] = useState({
    name: place.name,
    text: place.text,
    area_id: place.area.id,
    category_ids: place.categories.map((category) => category.id),
    place_price: place.place_price,
    image: null as File[] | null,
  });
  const toast = useToast();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };

  const handleCheckBoxChange = (selectedValues) => {
    // console.log(selectedValues)
    // console.log(place.categories)
    const categoryIds = selectedValues.map((sel) => {
      const matchingCategory = category.find((cat) => cat.name === sel);
      return matchingCategory ? matchingCategory.id.toString() : null;
    });
    console.log(categoryIds);
    setFormData((prevData) => ({
      ...prevData,
      category_ids: categoryIds,
    }));
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const trimmedData = Object.fromEntries(
    //   Object.entries(formData).filter(
    //     ([key, value]) => value !== null && value !== ""
    //   )
    // );
    // console.log("trimmedData", trimmedData);

    // const prevData = Object.fromEntries(
    //   Object.entries(place || {}) // Handle potential undefined or null place
    //     .filter(([key]) => key !== "categories") // Exclude category_ids
    // );
    // console.log("prev", prevData);
    // const updatedPrevData = {
    //   ...prevData, // Keep existing data from prevData
    //   ...trimmedData, // Override or update specific properties
    // };
    // console.log("Form data submitted:", updatedPrevData);

    mutateUpdatePlace(formData, {
      onSuccess: (data) => {
        console.log("Submission success:", data);
        onClose();
        toast({
          title: "success",
          description:" place updated",
          status: "success",
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
          duration: 4000,
        });
        setShouldRefetch({places:true})
      },
    });
  };

  return (
    <Box maxW="400px" mx="auto">
      <form>
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
          <FormLabel>Description</FormLabel>
          <Textarea
            name="text"
            value={formData.text}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <HStack>
            <FormLabel>Country</FormLabel>
            <Select onChange={(event) => setCountryId(event.target.value)}>
              <option key="none" value="">
                {" "}
              </option>
              {countries?.data.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </Select>

            <FormLabel>Area</FormLabel>
            <Select name="area_id" onChange={handleInputChange}>
              <option key="none" value="">
                {place.area.name}
              </option>
              {areas?.data?.[0].areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </Select>
          </HStack>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Categories </FormLabel>
          <CheckboxGroup
            colorScheme="blue"
            // value={formData.category}
            onChange={handleCheckBoxChange}
            defaultValue={place.categories.map((category) => category.name)}
          >
            <Grid
              templateColumns="repeat(3, 1fr)"
              templateRows="repeat(2, 1fr)"
              gap={2}
            >
              {category.map((category) => (
                <Checkbox key={category.id} value={category.name}>
                  {" "}
                  {category.name}
                </Checkbox>
              ))}
            </Grid>
          </CheckboxGroup>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Price </FormLabel>
          <Input
            type="text"
            name="place_price"
            value={formData.place_price}
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
          <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default PlaceUpdateForm;
