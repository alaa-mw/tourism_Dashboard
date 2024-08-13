import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
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
  useToast,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { MdAddAPhoto, MdOutlineEdit } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { COLORS } from "../colors";
import axios from "axios";
import getImageUrl from "../services/image-url";
import { FetchResponse } from "../services/api-client";
import useFetchData from "../hooks/useFetchData";
import { User } from "../Interfaces/User";
import { Country } from "../Interfaces/Place";
import { Airport } from "../Interfaces/Airport";
import useSendData from "../hooks/useSendData";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import UserProfileHotel from "./UserProfileHotel";
import UserProfileAirport from "./UserProfileAirport";
import { FONTS } from "../fonts";
import useRefetchState from "../state-managment/RefetchState";

const UserProfile = () => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const token = localStorage.getItem("authToken");
  const role = sessionStorage.getItem("userRole");

  const { data, refetch } = useFetchData<FetchResponse<User>>("/admin-profile");
  const { data: locations } = useFetchData<FetchResponse<Country[]>>(
    "/admin/get_all_country"
  );
  const { data: areas, mutate } = useSendData<FetchResponse<Country[]>>(
    "/admin/get_all_area"
  );
  const { mutate: updateImg } = useSendData<FetchResponse<User>>(
    "/change-profile-photo"
  );
  const [user, setUser] = useState({ ...data?.data });
  const [error, setError] = useState("");
  const toast = useToast();
  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
    setError("");
  }, [data]);

  useEffect(() => {
    refetch();
    setShouldRefetch({ users: false });
  }, [shouldRefetch.users]);

  const [file, setFile] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target?.files[0];
    setFile(e.target?.files[0]);

    const formData = new FormData();
    formData.append("image", file);

    console.log(formData);
    updateImg(formData, {
      onSuccess: (data) => {
        setShouldRefetch({ users: true });
        console.log("Submission success:", data);
        toast({
          title: "Profile photo changed.",
          status: "success",
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
          duration: 4000,
        });
      },
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSelectChange = (event) => {
    const id = event.target.value;
    setUser({ ...user, position: { ...user.position, id: id } });
  };

  const handleUpdateData = () => {
    const prevUser = { ...user };
    console.log({
      name: user.name,
      position: user.position?.id,
      phone_number: user.phone_number,
    });

    axios
      .post(
        "http://127.0.0.1:8000/api/update-profile",
        {
          name: user.name,
          position: user.position?.id,
          phone_number:
            data?.data.phone_number !== user.phone_number
              ? user.phone_number
              : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setShouldRefetch({ users: true });

        toast({
          title: "success",
          description: "Your information updated",
          status: "success",
          position: "bottom-right",
          variant: "left-accent",
          size: "1700px",
          isClosable: true,
          duration: 4000,
        });
      })
      .catch((error) => {
        setError(error.response.data.message);
        setUser({ ...prevUser });
      });
  };

  return (
    <Container
      maxW="90vw"
      p={2}
      borderWidth="1px"
      borderRadius="lg"
      textAlign="left"
    >
      <Box
        // bgGradient={["linear(to-b, gray.200,blue.200,transparent)"]}
        bgGradient={[`linear(to-b,${COLORS.cyan_2},blue.100,transparent)`]}
        h="150px"
        borderRadius={10}
      />
      <Container mb="6px" mt="-100px" ml={"5px"}>
        <Avatar
          border="2px solid gray"
          size="2xl"
          src={data?.data.image ? getImageUrl(data?.data.image) : ""}
          boxShadow="lg"
        />
        <Box ml="120px" mt="-20px">
          <FormControl mb={4}>
            <FormLabel>
              <MdAddAPhoto
                size={27}
                cursor="pointer"
                onClick={handleImageUpload}
              />
            </FormLabel>
            <Input
              type="file"
              accept="image/*"
              name="image"
              hidden
              onChange={handleImageUpload}
            />
          </FormControl>
        </Box>
        <Heading fontSize="4xl" fontFamily={FONTS.third}>
          {data?.data.name}
        </Heading>
        <Text color={COLORS.Gray2} fontFamily={FONTS.third}>
          {data?.data.role[0].toString()}
        </Text>
      </Container>
      <HStack gap={"10vw"}>
        <FormControl w="30%" ml={"5px"}>
          <Text
            color={COLORS.darkblue}
            p="0 6px"
            m="0"
            fontFamily={FONTS.heading}
            fontSize={"1.2em"}
          >
            Email address
          </Text>
          <InputGroup mb="20px">
            <InputLeftElement pointerEvents="none">
              <EmailIcon color={COLORS.darkblue} />
            </InputLeftElement>
            <Input variant="flushed" type="email" value={data?.data.email} />
          </InputGroup>

          <Text
            color={COLORS.darkblue}
            p="0 6px"
            m="0"
            fontFamily={FONTS.heading}
            fontSize={"1.2em"}
          >
            Location address
          </Text>
          <InputGroup mb="20px">
            <InputLeftElement pointerEvents="none">
              <FaLocationDot color={COLORS.darkblue} />
            </InputLeftElement>
            <Select
              name="position"
              variant="flushed"
              ml={10}
              placeholder={user.position?.name}
              onChange={handleSelectChange}
            >
              <option key={"none"} value={""}>
                {" "}
              </option>
              {locations?.data.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </Select>
          </InputGroup>

          <Text
            color={COLORS.darkblue}
            p="0 6px"
            m="0"
            fontFamily={FONTS.heading}
            fontSize={"1.2em"}
          >
            Phone Number
          </Text>
          <InputGroup mb="20px">
            <InputLeftElement pointerEvents="none">
              <PhoneIcon color={COLORS.darkblue} /*boxSize={5}*/ />
            </InputLeftElement>
            <Input
              name="phone_number"
              variant="flushed"
              type="tel"
              value={user.phone_number}
              onChange={handleInputChange}
            />
          </InputGroup>

          {error && <FormHelperText color="red">{error}</FormHelperText>}
          <Container textAlign="right">
            <Button
              onClick={handleUpdateData}
              backgroundColor={COLORS.lightblue}
              color="white"
              leftIcon={<MdOutlineEdit />}
            >
              Update
            </Button>
          </Container>
        </FormControl>

        {role === "Airport admin" && <UserProfileAirport />}
        {role === "Hotel admin" && <UserProfileHotel />}
      </HStack>
    </Container>
  );
};

export default UserProfile;
