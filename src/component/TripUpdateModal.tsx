import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { COLORS } from "../colors";
import useFetchDataId from "../hooks/useFetchDataId";
import useSendData from "../hooks/useSendData";
import { Country } from "../Interfaces/Place";
import { Trip, TripDetails } from "../Interfaces/Trip";
import { FetchResponse } from "../services/api-client";
import { MultiSelect } from "chakra-multiselect";
import { FONTS } from "../fonts";

interface Props {
  title: string;
  icon?: ReactElement;
  trip?: Trip;
  tripDetails?: TripDetails;
}

const TripUpdateModal = ({ title, icon, trip, tripDetails }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    add_new_people: "",
    trip_note: trip?.trip_note,
    places: [], // fix - just new places
  });

  const { data, mutate, error } = useSendData<FetchResponse<Trip>>(
    `/admin/edit-static-trip/${trip?.id}`
  );

  const { data: places } = useFetchDataId<FetchResponse<Country>>(
    `/admin/places-depending-on-country/${tripDetails?.destination_trip.id}`,
    tripDetails?.destination_trip.id
  );

  console.log(tripDetails?.destination_trip.id);
  console.log(places);
  const placesOptions = places?.data?.area_places.flatMap((area) =>
    area?.places?.map((place) => ({
      id: place.id.toString(),
      label: `${place.name} - ${place.place_price + "$"}`,
      value: place.name,
    }))
  );

  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const handeSelectPlaces = (selectedOptions) => {
    setSelectedPlaces(selectedOptions);
    setFormData({ ...formData, places: selectedOptions.map((pl) => pl.id) });
    console.log("submit Form", formData);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const toast = useToast();
  const handleSubmit = () => {
    console.log(formData);
    mutate(formData, {
      onSuccess: () => {
        onClose();
        toast({
          title: "success",
          description: "trip updated !",
          status: "success",
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
          duration: 4000,
        });
      },
    });
  };

  useEffect(() => {
    console.log(tripDetails?.destination_trip.id);
  }, [tripDetails]);
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor={COLORS.lightblue}
        color="white"
        size="sm"
      >
        {icon}
        {title}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title} Trip Details </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>
                Add New Peoples on :
                <Text
                  fontFamily={FONTS.normal}
                  as="b"
                  m={1}
                  color={COLORS.green}
                >
                  {trip?.number_of_people} peoples
                </Text>
              </FormLabel>

              <Input
                type="text"
                name="add_new_people"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Places</FormLabel>
              <MultiSelect
                options={placesOptions ? placesOptions : Option[""]}
                value={selectedPlaces}
                placeholder={`Choose more places`}
                onChange={handeSelectPlaces}
                searchPlaceholder="search.."
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Trip Note</FormLabel>
              <Textarea
                name="trip_note"
                onChange={handleInputChange}
                value={formData.trip_note}
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

            <Flex mt={4} justifyContent={"center"}>
              <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
                Submit
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TripUpdateModal;
