import {
  Box,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { HotelBook } from "../../Interfaces/Book";
import { CustomTableContainer } from "../../component/UserTable";
import { FONTS } from "../../fonts";
import useFetchData from "../../hooks/useFetchData";
import { FetchResponse } from "../../services/api-client";
const Books = () => {
  const { data } = useFetchData<FetchResponse<HotelBook[]>>(
    "/admin/get_all_hotel_book"
  );

  return (
    <Box>
      {/* <SearchInput /> */}

      <Heading fontFamily={FONTS.heading}>Room Books</Heading>

      <CustomTableContainer>
        <Table variant="striped" colorScheme="gray" w={"200px"}>
          <TableCaption>B o o k s</TableCaption>
          <Thead>
            <Tr>
              <Th>BOOK ID</Th>
              <Th>USER</Th>
              <Th>ROOM ID</Th>
              <Th>START DATE</Th>
              <Th>END DATE</Th>
              <Th>PAYMENTS</Th>
              <Th>RESERVATION DATE</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.map((book, index) => (
              <Tr
                borderRadius={20}
                key={index}
                h={"50px"}
                // borderBottom={
                //   index < (resultLen || -1) ? `3px solid ${COLORS.green}` : ""
                // }
              >
                <Td>{book.id}</Td>
                <Td>{book?.user?.name ? book?.user?.name : "admin register wait user"}</Td>
                <Td>{book.roomss.id}</Td>
                <Td>{book.start_date}</Td>
                <Td>{book.end_date}</Td>
                <Td>{book.current_price} $</Td>
                <Td>{book.created_at.substring(0, 19).replace("T", "  ")}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CustomTableContainer>
    </Box>
  );
};

export default Books;
