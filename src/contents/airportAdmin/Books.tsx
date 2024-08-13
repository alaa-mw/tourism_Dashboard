import {
    Box,
    Heading,
    Skeleton,
    Stack
} from "@chakra-ui/react";
import { AirportBook } from "../../Interfaces/Book";
import BookAirportAccordion from "../../component/BookAirportAccordion";
import Header from "../../component/Header";
import { FONTS } from "../../fonts";
import useFetchData from "../../hooks/useFetchData";
import { FetchResponse } from "../../services/api-client";
const Books = () => {
  const { data, isLoading } = useFetchData<FetchResponse<AirportBook[]>>(
    "/admin/get_all_plane_book"
  );
  console.log(data?.data[0].planetrip.current_price);
  return (
    <Box>
      <Heading fontFamily={FONTS.heading}>Flight Books</Heading>

      <Header list={["BOOK ID", "PLANE", "SOURCE", "DESTINATION", "PRICE",""]} />
      {isLoading && (
        <Stack>
          <Skeleton height="70px" />
          <Skeleton height="70px" />
          <Skeleton height="70px" />
        </Stack>
      )}
      {data?.data?.map((book) => (
        <div key={book.id}>
          <BookAirportAccordion book={book} />
        </div>
      ))}
    </Box>
  );
};

export default Books;
