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
  InputRightElement,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Country, Place } from "../Interfaces/Place";
import category from "../data/category";
import useFetchData from "../hooks/useFetchData";
import useSendData from "../hooks/useSendData";
import { FetchResponse } from "../services/api-client";
import useRefetchState from "../state-managment/RefetchState";
import { SiGooglemaps } from "react-icons/si";
import { COLORS } from "../colors";
import { FONTS } from "../fonts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PlaceForm = ({ isOpen, onClose }: Props) => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    text: "",
    area_id: "",
    category_ids: [""],
    place_price: "",
    images: null as File[] | null,
  });

  const { data: countries } = useFetchData<FetchResponse<Country[]>>(
    "/admin/get_all_country"
  );
  const {
    data,
    mutate: mutateAddPlace,
    error,
  } = useSendData<Place>("/admin/add-place");

  const [countryId, setCountryId] = useState<string>("");

  const { data: areas, mutate } = useSendData<FetchResponse<Country[]>>(
    "/admin/get_all_area"
  );

  useEffect(() => {
    if (countryId) mutate({ country_id: countryId });
  }, [countryId]);

  useEffect(() => console.log("formData", formData), [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckBoxChange = (selectedValues) => {
    const categoryIds = selectedValues.map((sel) => {
      const matchingCategory = category.find((cat) => cat.name === sel);
      return matchingCategory ? matchingCategory.id.toString() : null;
    });
    setFormData((prevData) => ({
      ...prevData,
      category_ids: categoryIds,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = event.target.files;
    if (newImages) {
      const imageArray = Array.from(newImages);
      console.log("New Images:", imageArray);

      setFormData((prevData) => ({
        ...prevData,
        images: imageArray,
      }));
    }
  };

  const handleCoordinateChange = (e) => {
    const str = e.target.value;

    const [latitude, longitude] = str.split(",");
    console.log("lat", latitude);
    console.log("long", longitude);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form data submitted:", formData);

    const trimmedData = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, value]) => value !== null && value !== ""
      )
    );
    mutateAddPlace(trimmedData, {
      onSuccess: (data) => {
        console.log("Submission success:", data);
        onClose();
        toast({
          title: "success",
          description: "New place created",
          status: "success",
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
          duration: 4000,
        });
        setShouldRefetch({ places: true });
      },
    });
  };

  return (
    <Box maxW="400px" mx="auto">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel mb={0.5}>Name </FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel mb={0.5}>
            Coordinate{" "}
            <Text fontFamily={FONTS.normal} as="span">
              {" "}
              (get from google map and paste)
            </Text>{" "}
          </FormLabel>

          <InputGroup>
            <Input
              type="text"
              name="coordinate"
              // value={"formData.name"}
              onChange={handleCoordinateChange}
            />
            <InputRightElement w={"30%"}>
              <Button
                as="a" // Treat button as anchor tag for navigation
                href={`https://www.google.com/maps/place/${formData.name.replace(
                  /\s+/g,
                  "+"
                )}`}
                target="_blank"
                borderRadius={"0 10px 10px 0"}
                leftIcon={<SiGooglemaps size={"25px"} />}
                // border={`1px solid ${COLORS.cyan}`} (optional)
                shadow={"sm"}
                fontSize={"12px"}
              >
                Google Maps
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel mb={0.5}>Description</FormLabel>
          <Textarea
            name="text"
            value={formData.text}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <HStack>
            <FormLabel mb={0.5}>Country</FormLabel>
            <Select onChange={(event) => setCountryId(event.target.value)}>
              <option key="none" value="">
                None
              </option>
              {countries?.data.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </Select>

            <FormLabel mb={0.5}>Area</FormLabel>
            <Select name="area_id" onChange={handleInputChange}>
              <option key="none" value="">
                None
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
          <FormLabel mb={0.5}>Categories </FormLabel>
          <CheckboxGroup
            colorScheme="blue"
            // value={formData.category}
            onChange={handleCheckBoxChange}
          >
            <Grid
              templateColumns="repeat(3, 1fr)"
              templateRows="repeat(2, 1fr)"
              gap={2}
            >
              {category.map((category) => (
                <Checkbox value={category.name}>{category.name}</Checkbox>
              ))}
            </Grid>
          </CheckboxGroup>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel mb={0.5}>Price </FormLabel>
          <Input
            type="text"
            name="place_price"
            value={formData.place_price}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel mb={0.5}>
            Upload Image{" "}
            <Text fontFamily={FONTS.normal} as="span">
              (two at least)
            </Text>
          </FormLabel>
          <Input
            multiple
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageUpload}
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

export default PlaceForm;
