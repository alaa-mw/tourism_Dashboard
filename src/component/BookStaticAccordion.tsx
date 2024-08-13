import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import { Trip } from "../Interfaces/Trip";
import BookStaticDetails from "./BookStaticDetails";
import BookStaticUsers from "./BookStaticUsers";
interface Props {
  trip: Trip;
  tripAdmin?: boolean;
}
const BookStaticAccordion = ({ trip, tripAdmin }: Props) => {
  const [id, setId] = useState("");

  const handleClick = () => {
    setId(trip.id);
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
            <Text w={"12vw"}>{trip.trip_name} </Text>
            <Text w={"12vw"}>{trip.start_date}</Text>
            <Text w={"12vw"}>{trip.end_date} </Text>
            {trip.new_price ? (
              <Text w={"12vw"}>
                <Text as="span" textDecor="line-through">
                  {trip.price}$
                </Text>{"   "}
                {trip.new_price} ${" "}
              </Text>
            ) : (
              <Text w={"12vw"}> {trip.price} $ </Text>
            )}
            <Text w={"12vw"}>{trip.number_of_people} </Text>
          </HStack>
          <AccordionIcon onClick={handleClick} />
        </AccordionButton>
        <AccordionPanel pb={4} textAlign={"center"}>
          {" "}
          {tripAdmin ? (
            <BookStaticUsers id={id} />
          ) : (
            <BookStaticDetails id={id} />
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default BookStaticAccordion;
