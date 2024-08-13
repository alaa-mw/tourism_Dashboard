import { HStack, Text } from "@chakra-ui/react";
import { COLORS } from "../colors";
import { FONTS } from "../fonts";
import { DBook } from "../Interfaces/Book";

interface Props {
  data: DBook[];
}

const BookAirportUsers = ({ data }: Props) => {
  console.log(data);
  return (
    <>
      <HStack
        h="40px"
        justifyContent="space-evenly"
        alignItems={"center"}
        ml={20}
        w="70vw"
        borderRadius={7}
        border={`2px solid ${COLORS.cyan}`}
        fontFamily={FONTS.third}
      >
        <Text minW={"10vw"} m={0}>Name</Text>
        <Text minW={"10vw"} m={0}>Payments</Text>
        <Text minW={"10vw"} m={0}>Type </Text>
        <Text minW={"10vw"} m={0}>Booking date</Text>
      </HStack>
      {data.map((book, index) => (
        <HStack
          h="40px"
          justifyContent="space-evenly"
          textAlign={"center"}
          ml={20}
          w="70vw"
          bgColor={index % 2 ? "" : COLORS.GrayBlue}
          borderRadius={7}
        >
          <Text minW={"10vw"}>{book.user.name}</Text>
          <Text minW={"10vw"}>{book.price} </Text>
          <Text minW={"10vw"}>{book.type} </Text>
          <Text minW={"10vw"}>
            {book.created_at.substring(0, 19).replace("T", "  ")}{" "}
          </Text>
        </HStack>
      ))}
    </>
  );
};

export default BookAirportUsers;
