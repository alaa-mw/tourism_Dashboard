import { Avatar, HStack, Spinner, Text } from "@chakra-ui/react";
import { COLORS } from "../colors";
import { FONTS } from "../fonts";
import useFetchDataId from "../hooks/useFetchDataId";
import { StaticBookDetails } from "../Interfaces/Book";
import { FetchResponse } from "../services/api-client";
import getImageUrl from "../services/image-url";

const BookStaticDetails = ({ id }) => {
  console.log(id);
  const { data, isLoading } = useFetchDataId<FetchResponse<StaticBookDetails>>(
    `/admin/show-details-trip/${id}`,
    id
  );
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {data?.data.details.length === 0 ? (
            <Text as="b">Nobody register</Text>
          ) : (
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
                <Text minW={"10vw"} m={0}>
                  Image{" "}
                </Text>
                <Text minW={"10vw"} m={0}>
                  Name
                </Text>
                <Text minW={"10vw"} m={0}>
                  Email{" "}
                </Text>
                <Text minW={"10vw"} m={0}>
                  Phone number{" "}
                </Text>
                <Text minW={"10vw"} m={0}>
                  number of friend{" "}
                </Text>
                <Text minW={"10vw"} m={0}>
                  payments
                </Text>
              </HStack>
              {data?.data?.details.map((trip, index) => (
                <HStack
                  h="40px"
                  justifyContent="space-evenly"
                  ml={20}
                  w="70vw"
                  bgColor={index % 2 ? COLORS.GrayBlue : ""}
                  borderRadius={7}
                >
                  <Text minW={"10vw"} m={0}>
                    <Avatar
                      src={trip.user.image ? getImageUrl(trip.user.image) : ""}
                      boxShadow="md"
                      bgColor={COLORS.Gray}
                      boxSize={"30px"}
                    />
                  </Text>
                  <Text minW={"10vw"} m={0}>
                    {trip.user.name}
                  </Text>
                  <Text minW={"10vw"} m={0}>
                    {trip.user.email}{" "}
                  </Text>
                  <Text minW={"10vw"} m={0}>
                    {trip.user.phone_number}{" "}
                  </Text>
                  <Text minW={"10vw"} m={0}>
                    {trip.number_of_friend}{" "}
                  </Text>
                  <Text minW={"10vw"} m={0}>
                    {trip.book_price}
                    {" $"}
                  </Text>
                </HStack>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default BookStaticDetails;
