import {
  AccordionButton,
  AccordionIcon,
  Button,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { DBook } from "../Interfaces/Book";
import { COLORS } from "../colors";
import { FONTS } from "../fonts";
import useFetchData from "../hooks/useFetchData";
import { FetchResponse } from "../services/api-client";
import BookDynamicDetails from "./BookDynamicDetails";

const CustomTableContainer = styled.div`
  table {
    width: 100%;
    // text-align: center;
    font-size: 16px;
    // border-collapse: separate;
    border-radius: 5px;
  }
  th {
    text-align: center;
    font-size: 17px;
  }
  ,
  tr {
  }
  ,
  td {
    text-align: center;
    padding: 5px 0px;
    border-bottom: 1px solid #ddd;
  }

  @media only screen and (max-width: 768px) {
    th,
    td {
      display: block;
      width: 100%;
    }

    // nth-child
    th::nth-of-type(1),
    td:nth-of-type(1) {
      display: none;
    }

    tr {
      margin-bottom: 16px;
      border-radius: 20px;
    }

    th {
      font-weight: bold;
    }
  }
`;

const BookDynamic = () => {
  const { data, isLoading } = useFetchData<FetchResponse<DBook[]>>(
    "/admin/get_all_dynamic_book"
  );

  const AccordionIconButton = () => (
    <AccordionButton as={IconButton} icon={<AccordionIcon />} px="0" w="10px" />
  );
  const [selectedRowIndex, setSelectedRowIndex] = useState("0");
  const [selectedType, setSelectedType] = useState("");
  const handleClick = (index, type) => {
    if (index === selectedRowIndex) setSelectedRowIndex("0");
    else setSelectedRowIndex(index);
    setSelectedType(type);
  };
  const tableHeaders = [
    "Book ID",
    "USER NAME",
    "START DATE",
    "END DATE",
    "PRICE",
    "TYPE",
    "RESERVATION DATE",
  ];
  return (
    <CustomTableContainer>
      <Table variant="striped" colorScheme="gray" border={"1px solid #ddd"}>
        <Thead>
          <Tr>
            {tableHeaders.map((header, index) => (
              <Th
                key={index}
                fontSize={"16px"}
                fontFamily={FONTS.third}
                fontWeight="bold"
              >
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && <Spinner/>}
          {data?.data.map((dBook, index) => (
            <>
              <Tr
                key={index}
                fontWeight={selectedRowIndex === dBook.id ? "bold" : ""}
                border={
                  selectedRowIndex === dBook.id
                    ? `3px solid ${COLORS.cyan}`
                    : "2px solid #ddd"
                }
              >
                <Td>{dBook.id}</Td>
                <Td>{dBook.user.name}</Td>
                <Td>{dBook.start_date}</Td>
                <Td>{dBook.end_date}</Td>
                <Td>{dBook.price}$</Td>
                <Td>{dBook.type}</Td>
                <Td>{dBook.created_at.substring(0, 19).replace("T", "  ")}</Td>
                {/* // fix */}
                <Td>
                  <Button
                    bgColor={COLORS.trans}
                    borderRadius={20}
                    onClick={() => handleClick(dBook.id, dBook.type)}
                    ml={8}
                  >
                    <GoTriangleDown size={20} />
                  </Button>
                </Td>
              </Tr>
              {selectedRowIndex === dBook.id && (
                <BookDynamicDetails book={dBook} />
              )}
            </>
          ))}
        </Tbody>
      </Table>
    </CustomTableContainer>
  );
};

export default BookDynamic;
