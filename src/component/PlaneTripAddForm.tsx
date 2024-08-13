import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Airport, Plane } from "../Interfaces/Airport";
import useFetchData from "../hooks/useFetchData";
import useSendData from "../hooks/useSendData";
import { FetchResponse } from "../services/api-client";
import DurationPicker from "react-duration-picker";
import useRefetchState from "../state-managment/RefetchState";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  plane: Plane;
}

const PlaneTripAddForm = ({ isOpen, onClose, plane }: Props) => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();

  const { data: airports } =
    useFetchData<FetchResponse<Airport[]>>("/admin/all-airport");

  const { data, mutate, error } =
    useSendData<FetchResponse<Plane>>("/admin/add-trip");

  const [formData, setFormData] = useState({
    plane_id: plane.id,
    airport_destination_id: "",
    going_flight_date: "",
    return_flight_date: "",
    flight_duration: "",
  });

  const toast = useToast();
  const [hour, setHour] = useState(0.0);
  const [minute, setMinute] = useState(0.0);

  const hours = Array.from({ length: 24 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 59 }, (_, i) => i + 1);

  const handleHoursChange = (e) => {
    const hour = Number(e.target.value);
    setHour(hour);
  };

  const handleMinutesChange = (e) => {
    const min = Number(e.target.value);
    setMinute(min);
  };
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const onChange = (duration) => {
    const { hours, minutes, seconds } = duration;
    setDuration({ hours, minutes, seconds });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    mutate(formData, {
      onError: (error) => {
        console.error("Submission error:", error);
      },
      onSuccess: (data) => {
        setShouldRefetch({ planeTrips: true });
        console.log("Submission success:", data);
        onClose();
        toast({
          title: "Success.",
          description: "A new trip has been scheduled for your plane.",
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
    console.log(hour);
    console.log(typeof hour);

    console.log(minute);
    setFormData({
      ...formData,
      flight_duration: (hour + minute / 60).toFixed(2),
    });
  }, [hour, minute]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Box maxW="400px" mx="auto">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel> Airport Destination </FormLabel>
          <Select name="airport_destination_id" onChange={handleInputChange}>
            <option key="none" value={""}>
              none
            </option>
            {airports?.data.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name} - {airport.country.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Going flight date </FormLabel>
          <Input
            type="date"
            name="going_flight_date"
            value={formData.going_flight_date}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Return flight date </FormLabel>
          <Input
            type="date"
            name="return_flight_date"
            value={formData.return_flight_date}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Duration </FormLabel>
          <Flex direction="row">
            <Select placeholder="Select hour" onChange={handleHoursChange}>
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </Select>

            <Text m={2}>:</Text>
            <Select placeholder="Select minute" onChange={handleMinutesChange}>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </Select>
          </Flex>
        </FormControl>
        {/* <DurationPicker
          onChange={onChange}
          initialDuration={{ hours: 2, minutes: 2, seconds: 3 }}
          maxHours={5}
        /> */}
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

export default PlaneTripAddForm;
