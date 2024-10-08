import { PhoneIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import { COLORS } from "../colors";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import useFetchData from "../hooks/useFetchData";
import { FetchResponse } from "../services/api-client";
import { Hotel } from "../Interfaces/Hotel";
import { FONTS } from "../fonts";
import useRefetchState from "../state-managment/RefetchState";
import { useEffect } from "react";
import { MdAddAPhoto } from "react-icons/md";
import getImageUrl from "../services/image-url";

const UserProfileHotel = () => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { data, refetch } = useFetchData<FetchResponse<Hotel[]>>(
    "/admin/get_my_hotel"
  );
  console.log(data?.data[0]);
  let rating = data?.data[0]?.stars || 0;

  const handleImageUpload = (e) => {
    console.log("");
    // const file = e.target?.files[0];
    // setFile(e.target?.files[0]);

    // const formData = new FormData();
    // formData.append("image", file);

    // console.log(formData);
    // updateImg(formData, {
    //   onSuccess: (data) => {
    //     console.log("Submission success:", data);
    //     toast({
    //       title: "Profile photo changed.",
    //       status: "success",
    //       position: "bottom-right",
    //       variant: "left-accent",
    //       isClosable: true,
    //       duration: 4000,
    //     });
    //   },
    // });
  };

  useEffect(() => {
    refetch();
    setShouldRefetch({ hotels: false });
  }, [shouldRefetch.hotels]);

  return (
    <VStack
      alignItems="flex-start"
      justifyContent="flex-start"
      borderLeft={`2px solid ${COLORS.border}`}
      h="45vh"
      p={2}
    >
      <Text
        fontFamily={FONTS.heading}
        fontSize={"1.3em"}
        color={COLORS.darkblue}
        p="0 6px"
        m="0"
      >
        Hotel Info:
      </Text>
      <HStack>
        <VStack>
          <Image
            border="1px solid gray"
            borderRadius={10}
            h={"200px"}
            w={"180px"}
            src={
              data?.data[0]?.image
                ? getImageUrl(data?.data[0].image)
                : getImageUrl("")
            }
            boxShadow="lg"
          />
          <FormControl mb={4} ml={10}>
            <FormLabel>
              <Button h="25px" onClick={handleImageUpload}>
                change photo
              </Button>
            </FormLabel>
            <Input
              type="file"
              accept="image/*"
              name="image"
              hidden
              onChange={handleImageUpload}
            />
          </FormControl>
        </VStack>
        <Box>
          <HStack>
            <Text
              fontFamily={FONTS.heading}
              fontSize={"1.3em"}
              color={COLORS.darkblue}
              p="0 6px"
              m="0"
            >
              Name:
            </Text>
            <Text fontSize={"1em"} p="0 6px" m="0">
              {data?.data[0]?.name}
            </Text>
          </HStack>
          <HStack>
            <Text
              fontFamily={FONTS.heading}
              fontSize={"1.3em"}
              color={COLORS.darkblue}
              p="0 6px"
              m="0"
            >
              Stars:
            </Text>
            <HStack gap={0.001}>
              {[...Array(5)].map((_, idx) =>
                idx < rating ? (
                  <IoMdStar key={idx} color={"#ffd500"} size={20} />
                ) : (
                  <IoMdStarOutline color="gray" key={idx} size={20} />
                )
              )}
            </HStack>
          </HStack>
          <HStack>
            <Text
              fontFamily={FONTS.heading}
              fontSize={"1.3em"}
              color={COLORS.darkblue}
              p="0 6px"
              m="0"
            >
              Location:
            </Text>
            <Text fontSize={"1em"} p="0 6px" m="0">
              {data?.data[0]?.area.name}, {data?.data[0]?.country.name}
            </Text>
          </HStack>
          <HStack>
            <Text
              fontFamily={FONTS.heading}
              fontSize={"1.3em"}
              color={COLORS.darkblue}
              p="0 6px"
              m="0"
            >
              Total Rooms:
            </Text>
            <Text fontSize={"1em"} p="0 6px" m="0">
              {data?.data[0]?.number_rooms} rooms
            </Text>
          </HStack>
        </Box>
      </HStack>
    </VStack>
  );
};

export default UserProfileHotel;
