import {
  Avatar,
  Box,
  HStack,
  Spinner,
  Text
} from "@chakra-ui/react";
import { COLORS } from "../colors";
import { FONTS } from "../fonts";
import useFetchDataId from "../hooks/useFetchDataId";
import { StaticBookUsers } from "../Interfaces/Book";
import { FetchResponse } from "../services/api-client";
import getImageUrl from "../services/image-url";
import OfferSlider from "./OfferSlider";

interface Props {
  id: String;
}

const BookStaticUsers = ({ id }) => {
  
  console.log(id);
  const { data, isLoading } = useFetchDataId<FetchResponse<StaticBookUsers[]>>(
    `/admin/show-trip-admin-trip-details/${id}`,
    id
  );
  
  // const [sliderValue, setSliderValue] = useState(5);
  console.log(data);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {data?.data.length === 0 ? (
            <Box
              alignItems={"center"}
              ml={20}
              w="70vw"
              borderRadius={7}
              border={`2px solid ${COLORS.cyan}`}
              bgColor={COLORS.GrayBlue}
              p={4}
            >
              <Text as="b">Nobody register</Text>
              <Text fontFamily={FONTS.normal} m={1} fontSize={"19px"}>
                make offer on price if you want
              </Text>
              <OfferSlider tripId={id} />
            </Box>
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
                  Phone_number{" "}
                </Text>
                <Text minW={"10vw"} m={0}>
                  number_of_friend{" "}
                </Text>
              </HStack>
              {/* {data?.data?.details?.length === 0 && <Text as="b">Nobody register</Text>} */}
              {data?.data?.map((trip, index) => (
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
                      src={
                        trip?.user?.image ? getImageUrl(trip.user.image) : ""
                      }
                      boxShadow="md"
                      bgColor={COLORS.Gray}
                      boxSize={"30px"}
                      mb={2}
                    />
                  </Text>
                  <Text minW={"10vw"} m={0}>
                    {trip.user.name}
                  </Text>
                  <Text minW={"10vw"} m={0}>
                    {trip?.user?.email}{" "}
                  </Text>
                  <Text minW={"10vw"} m={0}>
                    {trip.user.phone_number}{" "}
                  </Text>
                  <Text minW={"10vw"} m={0}>
                    {trip.number_of_friend}{" "}
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

export default BookStaticUsers;
