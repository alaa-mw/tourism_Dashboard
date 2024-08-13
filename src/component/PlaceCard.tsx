import {
  Box,
  Button,
  Card,
  CardBody,
  Collapse,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Show,
  Text,
  Tooltip,
  VStack,
  color,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";
import image from "../images/wall4.jpg";
import { COLORS } from "../colors";
import PlaceModal from "./PlaceModal";
import getImageUrl from "../services/image-url";
import { ImagePlace, Place } from "../Interfaces/Place";
import useSendData from "../hooks/useSendData";
import { FetchResponse } from "../services/api-client";
import { AddIcon, TriangleDownIcon } from "@chakra-ui/icons";
import useRefetchState from "../state-managment/RefetchState";

interface Props {
  place: Place;
  search?: boolean;
}

const PlaceCard = ({ place, search }: Props) => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { mutate } = useSendData<Place>("/admin/change-visible-place");

  const { mutate: mutateImg } = useSendData<Place>("/admin/add-place-image");
  const toast = useToast();
  const handleClick = () => {
    mutate(
      { place_id: place.id },
      {
        onSuccess: () => {
          toast({
            title: "change status done successfully",
            status: "success",
            position: "bottom-right",
            variant: "left-accent",
            isClosable: true,
            duration: 4000,
          });
          setShouldRefetch({ places: true });
        },
      }
    );
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    console.log(fileInputRef);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = event.target.files;
    if (newImages) {
      const imageArray = Array.from(newImages);
      console.log("New Images:", imageArray);
      mutateImg(
        {
          place_id: place.id,
          images: imageArray,
        },
        {
          onError: (error) => {
            console.error("Submission error:", error);
            toast({
              title: "Warning",
              description: `${error.message}`,
              status: "error",
              position: "bottom-right",
              variant: "left-accent",
              isClosable: true,
              duration: 4000,
            });
          },
          onSuccess: () => {
            toast({
              title: "Image added successfully",
              status: "success",
              position: "bottom-right",
              variant: "left-accent",
              isClosable: true,
              duration: 4000,
            });
            setShouldRefetch({ places: true });
          },
        }
      );
    }
  };

  const { isOpen, onToggle } = useDisclosure();
  return (
    <Card
      textAlign="left"
      w="40vw"
      borderRadius={10}
      overflow="hidden"
      _hover={{
        transform: "scale(1.01)", // Optional: Scale up the card on hover
        transition: "box-shadow 0.7s ease, transform 0.7s ease", // Smooth transition
      }}
      boxShadow={"md"}
      border={search ? `2px solid ${COLORS.green}` : ""}
      bgColor={COLORS.GrayBlue}
    >
      <HStack h="70%">
        <Image
          borderRadius={7}
          src={getImageUrl((place.images as ImagePlace[])[0]?.image)}
          w="110px"
          h="110px"
          m={1}
        />
        <CardBody h="100%" p={2}>
          <HStack h="98%" justifyContent={"space-between"}>
            <Box w={"80%"}>
              <HStack mt={4}>
                <Heading mb={0} fontSize="2xl">
                  {place.name}
                </Heading>
                <Tooltip label={"click to change"} placement="top">
                  <Box
                    as="button"
                    color={
                      place.visible === 1
                        ? `${COLORS.green}`
                        : `${COLORS.red300}`
                    }
                    fontWeight="bold"
                    onClick={handleClick}
                    border={
                      place.visible === 1
                        ? `1px solid ${COLORS.green}`
                        : `1px solid ${COLORS.red300}`
                    }
                    borderRadius={20}
                    m={1}
                    p={"0 10px"}
                  >
                    {place.visible === 1 ? "visible" : "invisible"}
                  </Box>
                </Tooltip>
              </HStack>
              <Text color="gray.600">
                {place?.area?.name} , {place?.area?.country?.name}
              </Text>

              <HStack justifyContent={"space-between"}>
                <HStack w="17vw" overflow={"hidden"}>
                  {place.categories.map((cat) => (
                    <Text m={0} color={COLORS.lightblue} as="b" key={cat.id}>
                      {cat.name}
                    </Text>
                  ))}
                </HStack>
                <Text m={0} fontWeight={"bold"}>
                  {place.place_price} $
                </Text>
              </HStack>
            </Box>
            <VStack h="100px" direction="column" justify="space-between">
              <PlaceModal title="Update" place={place} />
              <Button
                onClick={onToggle}
                bgColor={"transparent"}
                boxSize={"15px"}
              >
                <TriangleDownIcon />
              </Button>
            </VStack>
          </HStack>
        </CardBody>
      </HStack>

      <Collapse in={isOpen} animateOpacity>
        <VStack p={1}>
          <Text m={1} p={2}>
            {place.text}
          </Text>
          <HStack justifyContent={"flex-start"} w="100%">
            {place.images.map((img) => (
              <Image
                borderRadius={7}
                src={getImageUrl(img.image)}
                boxSize={"70px"}
              />
            ))}
            <Button leftIcon={<AddIcon />} onClick={handleImageUpload} />

            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={handleFileChange} // Handle file selection
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </HStack>
        </VStack>
      </Collapse>
    </Card>
  );
};

export default PlaceCard;
