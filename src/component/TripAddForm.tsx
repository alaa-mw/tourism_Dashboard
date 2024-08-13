import { Box, Divider, Heading, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FONTS } from "../fonts";
import useFetchData from "../hooks/useFetchData";
import useSendData from "../hooks/useSendData";
import { PlaneTrip } from "../Interfaces/Airport";
import { Hotel } from "../Interfaces/Hotel";
import { Country } from "../Interfaces/Place";
import { Activities, Trip } from "../Interfaces/Trip";
import { User } from "../Interfaces/User";
import { FetchResponse } from "../services/api-client";
import TripAddStep from "./TripAddStep";
import useFetchDataId from "../hooks/useFetchDataId";
import { COLORS } from "../colors";
import useTripStore from "../state-managment/TripState";

const TripAddForm = () => {
  const { formData, goRange, backRange, setFormData, resetAll } =
    useTripStore();

  const [minSeats, setMinSeats] = useState(0);

  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedActs, setSelectedActs] = useState([]);

  const toast = useToast();

  const { data: user } = useFetchData<FetchResponse<User>>("/admin-profile");

  const { data: countries } = useFetchData<FetchResponse<Country[]>>(
    "/admin/get_all_country"
  );

  console.log(" ---- ", formData?.destination_trip_id);

  const { data: hotels } = useFetchDataId<FetchResponse<Hotel[]>>(
    `/admin/get_Hotel_By_Country/${formData?.destination_trip_id}`,
    formData.destination_trip_id
  );

  const { data: places } = useFetchDataId<FetchResponse<Country>>(
    `/admin/places-depending-on-country/${formData?.destination_trip_id}`,
    formData.destination_trip_id
  );

  const { data: planeTrips, mutate: mutateGo } = useSendData<PlaneTrip[]>(
    "/admin/search-for-plane-trip"
  );

  console.log("planeTrips", planeTrips);
  const { data: planeTripsAway, mutate: mutateBack } = useSendData<PlaneTrip[]>(
    "/admin/search-for-plane-trip"
  );

  console.log("planeTripsAway", planeTripsAway);
  const { data: activities } = useFetchData<FetchResponse<Activities[]>>(
    "/admin/get-all-activity"
  );

  const {
    data: staticTrip,
    mutate: mutateStaticTrip,
    error,
    isLoading
  } = useSendData<FetchResponse<Trip[]>>("/admin/Add_booking_Admin");

  const resetForm = () => {
    console.log("resetForm");
    resetAll();
    setSelectedPlaces([]);
    setSelectedActs([]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  const handleRadioChange = (value) => {
    console.log("Selected value:", value);
    setFormData({ trip_capacity: value });
  };

  const handlePlaneChange = (selectedOption) => {
    console.log(selectedOption);
    const selectedValue = selectedOption;
    const [name, selectedId, selectedFlightDate, selectedAvailableSeats] =
      selectedValue.split("*");
    setFormData({
      [name]: selectedId,
      start_date: selectedFlightDate,
      flight_date2: selectedFlightDate, // plane_trip_away
    });
    setMinSeats(selectedAvailableSeats);
  };

  const handlePlaneAwayChange = (selectedOption) => {
    const selectedValue = selectedOption;
    const [name, selectedId, selectedFlightDate, selectedAvailableSeats] =
      selectedValue.split("*");
    setFormData({
      [name]: selectedId,
      end_date: selectedFlightDate,
    });
    if (minSeats > selectedAvailableSeats) setMinSeats(selectedAvailableSeats);
  };

  const handeSelectPlaces = (selectedOptions) => {
    setSelectedPlaces(selectedOptions);
    setFormData({
      places: selectedOptions.map((pl) => pl.id),
    });
    console.log("submit Form", formData);
  };
  const handeSelectActs = (selectedOptions) => {
    setSelectedActs(selectedOptions);
    setFormData({
      activities: selectedOptions.map((act) => act.id),
    });
    console.log("submit Form", formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateStaticTrip(formData, {
      onError: (error) => {
        console.error("Submission error:", error);
        toast({
          title: "Error",
          description: `${error.message}`,
          status: "error",
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
          duration: 4000,
        });
      },
      onSuccess: (data) => {
        console.log("Submission success:", data);
        toast({
          title: "Success",
          description: `Trip created succcessfly..enjoy!`,
          status: "success",
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
          duration: 4000,
        });
        resetForm();
      },
    });
    console.log("submit", formData);
  };

  useEffect(() => {
    setFormData({ source_trip_id: user?.data.position.id });
  }, [user?.data.position]);

  useEffect(() => {
    console.log("useEffect", formData);
    console.log("go", goRange);
    console.log("back", backRange);
    if (
      goRange.country_source_id &&
      goRange.country_destination_id &&
      goRange.flight_date
    )
      mutateGo(goRange);
    if (
      backRange.country_source_id &&
      backRange.country_destination_id &&
      backRange.flight_date
    )
      mutateBack(backRange);
  }, [formData]);

  const planeTripGoOptions = planeTrips?.data.map((pt) => ({
    id: pt.id,
    label: `${pt.plane.name}-${pt.flight_date}-${pt.available_seats}-${pt.current_price}`,
    value: `plane_trip*${pt.id}*${pt.flight_date}*${pt.available_seats}`,
  }));

  const planeTripBackOptions = planeTripsAway?.data.map((pt) => ({
    id: pt.id,
    label: `${pt.plane.name}-${pt.flight_date}-${pt.available_seats}-${pt.current_price}`,
    value: `plane_trip_away*${pt.id}*${pt.flight_date}*${pt.available_seats}`,
  }));

  const placesOptions = places?.data?.area_places.flatMap((area) =>
    area?.places?.map((place) => ({
      id: place.id.toString(),
      label: `${place.name} - ${place.place_price + "$"}`,
      value: place.name,
    }))
  );

  const actOptions = activities?.data.map((act) => ({
    id: act.id.toString(),
    label: act.name,
    value: act.name,
  }));

  const steps = [
    {
      title: "First",
      description: "Lets Start! ", //✷⁠‿⁠✷",
      formControls: [
        {
          label: "Trip Name",
          type: "text",
          name: "trip_name",
          value: formData.trip_name,
          onchange: handleInputChange,
        },
      ],
    },
    {
      title: "Second",
      description: "where would you like to create trip ?",
      formControls: [
        {
          label: "Destination Area",
          type: "select",
          name: "destination_trip_id",
          value: formData.destination_trip_id,
          data: countries?.data,
          onchange: handleInputChange,
        },
      ],
    },
    {
      title: "Third",
      description: "choose a date to help select plane ", //◔⁠‿⁠◔⁠",
      formControls: [
        {
          label: "Flight Date",
          type: "date",
          name: "flight_date",
          value: formData.flight_date,
          onchange: handleInputChange,
        },
        {
          label: "Go Plane",
          type: "multi-select",
          name: "plane_trip",
          data: planeTripGoOptions,
          value: formData.start_date,
          single: true,
          onchange: handlePlaneChange,
        },
        {
          label: "Back_Plane",
          type: "multi-select",
          name: "plane_trip_away",
          data: planeTripBackOptions,
          value: formData.end_date,
          single: true,
          onchange: handlePlaneAwayChange,
        },
      ],
    },
    {
      title: "Fourth",
      description: "Now hotel you like..",
      formControls: [
        {
          label: "Hotel",
          type: "select",
          name: "hotel_id",
          data: hotels?.data,
          value: formData.hotel_id,
          onchange: handleInputChange,
        },
        {
          label: "Hotel_capacity_type",
          type: "radio-group",
          value: formData.trip_capacity,
          onchange: handleRadioChange,
        },
      ],
    },
    {
      title: "Fifth",
      description: "Draw the itinerary with your imagination ", // ⁠ꈍ⁠ᴗ⁠ꈍ",
      formControls: [
        {
          label: "Places",
          type: "multi-select",
          name: "place",
          data: placesOptions,
          value: selectedPlaces,
          single: false,
          onchange: handeSelectPlaces,
        },
      ],
    },
    {
      title: "Sixth",
      description: "wait we not finish!", // ⁠◍⁠•⁠ᴗ⁠•⁠◍",
      formControls: [
        {
          label: "Activities",
          type: "multi-select",
          name: "activity",
          data: actOptions,
          value: selectedActs,
          single: false,
          onchange: handeSelectActs,
        },
      ],
    },
    {
      title: "Seventh",
      description: "Finaly some important details.",
      formControls: [
        {
          label: "Number of people",
          type: "range-number",
          max:minSeats,
          name: "number_of_people",
          value: formData.number_of_people,
          onchange: handleInputChange,
        },
        {
          label: "Trip Note",
          type: "textarea",
          name: "trip_note",
          value: formData.trip_note,
          required: false,
          onchange: handleInputChange,
        },
      ],
    },
  ];
  return (
    <Box ml={2}>
      <Heading fontFamily={FONTS.heading}>
        Follow these steps to create Trip:
        <Divider />
      </Heading>

      <Box>
        <TripAddStep steps={steps} handleSubmit={handleSubmit} isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default TripAddForm;
