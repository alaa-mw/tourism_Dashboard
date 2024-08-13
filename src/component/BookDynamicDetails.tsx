import { Td, Tr } from "@chakra-ui/react";
import { DBookDetails } from "../Interfaces/Book";
import { FONTS } from "../fonts";
import useFetchData from "../hooks/useFetchData";
import { FetchResponse } from "../services/api-client";
import { COLORS } from "../colors";
import useFetchDataId from "../hooks/useFetchDataId";

const BookDynamicDetails = ({ book }) => {
  const { data } =
    book.type === "dynamic"
      ? useFetchDataId<FetchResponse<DBookDetails>>(
          `/admin/show_dynamic_trip/${book.id}`,book.id
        )
      : book.type === "hotel"
      ? useFetchDataId<FetchResponse<DBookDetails>>(
          `/admin/show_hotel_trip/${book.id}`,book.id
        )
      : useFetchDataId<FetchResponse<DBookDetails>>(
          `/admin/show_plane_trip/${book.id}`,book.id
        );

  function determineTripType(trip: DBookDetails): string | null {
    const goingTripEmpty =
      Array.isArray(trip.going_trip) && trip.going_trip.length === 0;
    const returnTripEmpty =
      Array.isArray(trip.return_trip) && trip.return_trip.length === 0;

    if (goingTripEmpty && returnTripEmpty) {
      return "noTrip";
    } else if (!goingTripEmpty && returnTripEmpty) {
      return "OneWay";
    } else if (!goingTripEmpty && !returnTripEmpty) {
      return "RoundTrip";
    } else {
      throw new Error("Invalid trip details");
    }
  }

  return (
    <>
      <Tr
        fontFamily={FONTS.normal}
        fontWeight={"bold"}
        border={`3px solid ${COLORS.cyan}`}
      >
        <Td>Source</Td>
        <Td>Destination</Td>
        <Td>Places</Td>
        <Td>Hotel</Td>
        <Td>Count rooms</Td>
        <Td>Airport Source</Td>
        <Td>Airport Destination</Td>
        <Td>Trip Type</Td>
      </Tr>
      <Tr
        fontFamily={FONTS.normal}
        fontWeight={"bold"}
        border={`3px solid ${COLORS.cyan}`}
        mb={"5px"}
        _selected={{
          transform: "scale(1.01)", // Optional: Scale up the card on hover
          transition: "box-shadow 0.7s ease, transform 0.7s ease", // Smooth transition
        }}
      >
        <Td>{data?.data.source_trip.name}</Td>
        <Td>{data?.data.destination_trip.name}</Td>
        <Td>{data?.data?.places?.[0]?.name} ...</Td>
        <Td>{data?.data?.hotel?.name}</Td>
        <Td>{data?.data?.dynamic_trip?.rooms_count}</Td>
        <Td>
          {!Array.isArray(data?.data.going_trip)
            ? data?.data?.going_trip?.airport_source?.name
            : ""}
        </Td>
        <Td>
          {!Array.isArray(data?.data.return_trip)
            ? data?.data?.return_trip?.airport_source?.name
            : ""}
        </Td>
        <Td>{data?.data ? determineTripType(data.data) : "..."}</Td>
      </Tr>
    </>
  );
};

export default BookDynamicDetails;
