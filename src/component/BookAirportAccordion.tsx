import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import BookAirportUsers from "./BookAirportUsers";
import { AirportBook } from "../Interfaces/Book";
import { COLORS } from "../colors";

interface Props {
  book: AirportBook;
}
const BookAirportAccordion = ({ book }: Props) => {
  const [id, setId] = useState("");

  const handleClick = () => {
    setId(book.id);
  };

  return (
    <Accordion allowToggle>
      {" "}
      {/* Allow toggling individual items */}
      <AccordionItem borderRadius={7}>
        <AccordionButton>
          <HStack
            h="40px"
            justifyContent="space-around"
            w="75vw"
            textAlign={"center"}
          >
            <Text w={"10vw"}>{book.id} </Text>
            <Text w={"10vw"}>{book.planetrip.plane?.name}</Text>

            <Text w={"12vw"} m={0} whiteSpace="pre-line">
              <Box as="b"> {book.planetrip.airport_source.name} </Box>
              {"\n"}
              {book.planetrip.flight_date}{" "}
            </Text>

            <Text w={"12vw"} m={0} whiteSpace="pre-line">
              <Box as="b"> {book.planetrip.airport_destination.name} </Box>
              {"\n"}
              {book.planetrip.landing_date}{" "}
            </Text>

            <Text w={"10vw"}>{book.planetrip.current_price} $ </Text>
            <Text />
          </HStack>
          <AccordionIcon onClick={handleClick} />
        </AccordionButton>
        <AccordionPanel pb={4} textAlign={"center"}>
          {" "}
          <BookAirportUsers data={book.planetrip.booking}/>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default BookAirportAccordion;
