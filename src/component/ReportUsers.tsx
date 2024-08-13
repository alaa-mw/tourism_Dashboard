import {
  Avatar,
  Card,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import useFetchData from "../hooks/useFetchData";
import { FetchResponse } from "../services/api-client";
import { User } from "../Interfaces/User";
import getImageUrl from "../services/image-url";
import { COLORS } from "../colors";
import { FONTS } from "../fonts";

const ReportUsers = () => {
  const { data, refetch } = useFetchData<FetchResponse<User[]>>(
    "/admin/get-users-with-the-most-bookings"
  );
  return (
    <Card
      width={"30%"}
      h={"40vh"}
      //   justifyContent={"center"}
      alignItems={"center"}
      borderRadius={20}
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      p={2}
      border={`1px solid ${COLORS.cyan}`}
    >
      <Text fontFamily={FONTS.third} m={1}>
        Most interactive users{" "}
      </Text>
      <VStack
        w="100%"
        overflow={"auto"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "10px",
            borderRadius: "8px",
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
            borderRadius: `8px`,
          },
        }}
      >
        {data?.data.map((user) => (
          <>
            <HStack
              w="100%"
              key={user.id}
              justifyContent={"space-between"}
              p={"2px 14px"}
              h={"7vh"}
              borderRadius={10}
              border={"1px solid #ddd"}
            >
              <HStack>
                <Avatar
                  size="sm"
                  src={user.image ? getImageUrl(user.image) : ""}
                  boxSize={45}
                  border="1px solid white"
                  mr={3}
                />
                <Text m={0} fontFamily={FONTS.third}>
                  {user.name}
                </Text>
              </HStack>
              <HStack>
                <CircularProgress
                  size={"40px"}
                  value={user.number_of_trips}
                  color={COLORS.ha}
                >
                  <CircularProgressLabel>
                    {user.number_of_trips}
                  </CircularProgressLabel>
                </CircularProgress>
                <Text m={0} fontFamily={FONTS.third} color={COLORS.Gray2}>
                  books
                </Text>
              </HStack>
            </HStack>
          </>
        ))}
      </VStack>
    </Card>
  );
};

export default ReportUsers;
