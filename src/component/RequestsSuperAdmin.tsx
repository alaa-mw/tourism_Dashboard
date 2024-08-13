import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { MdNotificationsActive } from "react-icons/md";
import { COLORS } from "../colors";
import React, { useEffect, useState } from "react";
import { EmailIcon } from "@chakra-ui/icons";
import useFetchData from "../hooks/useFetchData";
import { FetchResponse } from "../services/api-client";
import { User } from "../Interfaces/User";
import { GiNewShoot } from "react-icons/gi";
import useSendData from "../hooks/useSendData";
import { HiMiniUsers } from "react-icons/hi2";
import { FONTS } from "../fonts";

const RequestsSuperAdmin = () => {
  const toast = useToast();
  const { data, refetch } =
    useFetchData<FetchResponse<User[]>>("/admins-requests");
  const { mutate: mutateApprove } = useSendData<User>("/approve-user");

  const handleApprove = (id) => {
    mutateApprove(
      { user_id: id, status: 1 },
      {
        onSuccess: (data) => {
          refetch();
          toast({
            title: "success",
            description: `${data.message}`,
            status: "success",
            position: "bottom-right",
            variant: "left-accent",
            isClosable: true,
            duration: 4000,
          });
        },
      }
    );
  };
  const handleReject = (id) => {
    mutateApprove(
      { user_id: id, status: 0 },
      {
        onSuccess: (data) => {
          refetch;
          toast({
            title: "success",
            description: `${data.message}`,
            status: "success",
            position: "bottom-right",
            variant: "left-accent",
            isClosable: true,
            duration: 4000,
          });
        },
      }
    );
  };

  useEffect(()=>{

  },[refetch])
  return (
    <Popover
      // initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button bgColor="transparent">
          {/* <MdNotificationsActive */}
          <HiMiniUsers
            color={COLORS.white}
            size={25}
            // onClick={() => console.log("notif")}
            cursor="pointer"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent borderRadius={10} shadow={"md"}>
        <PopoverHeader pt={4} fontWeight="bold">
          Admins Requests
        </PopoverHeader>
        {/* <Divider  
          border="1px solid gray" /> */}
        <PopoverArrow />
        <PopoverCloseButton />
        {data?.data.length === 0 && (
          <>
            <Text alignSelf={"center"} fontFamily={FONTS.normal} m={2}>
              No any new Request{" "}
            </Text>
            <Divider m={1} />
          </>
        )}
        {data?.data?.map((user) => (
          <>
            <PopoverBody>
              <HStack justifyContent={"space-between"}>
                <VStack alignItems={"flex-start"}>
                  <Text m={0} as="b">
                    {user.name}-{user.id}
                  </Text>
                  <Text
                    m={0}
                    fontSize={"14px"}
                    maxW={"140px"}
                    overflow={"hidden"}
                  >
                    {user.email}
                  </Text>
                </VStack>
                <ButtonGroup size="sm">
                  <Button
                    bgColor={COLORS.green}
                    color={COLORS.white}
                    onClick={() => handleApprove(user.id)}
                  >
                    approve
                  </Button>
                  <Button
                    bgColor="red.500"
                    color={COLORS.white}
                    onClick={() => handleReject(user.id)}
                  >
                    reject
                  </Button>
                </ButtonGroup>
              </HStack>
            </PopoverBody>
            <Divider m={1} />
          </>
        ))}

        <PopoverFooter
          border="0"
          p={1}
          textAlign={"center"}
          fontSize={"12px"}
          fontWeight={"bold"}
        >
          <EmailIcon mr={1} mb={0.5} />
          contact me : alaa.almawaldi@gmail.com
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default RequestsSuperAdmin;
