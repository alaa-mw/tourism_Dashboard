import {
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
  } from "@chakra-ui/react";
  import React, { ReactElement } from "react";
  import { COLORS } from "../colors";
  import { SlPicture } from "react-icons/sl";
  import PlaneSchedule from "./PlaneSchedule";
  import useFetchData from "../hooks/useFetchData";
  import { Plane } from "../Interfaces/Airport";
  import { FetchResponse } from "../services/api-client";
  import PlaneAddForm from "./PlaneAddForm";
  import PlaneUpdateForm from "./PlaneUpdateForm";
  import PlaneTripAddForm from "./PlaneTripAddForm";
import RoomAddForm from "./RoomAddForm";
import RoomUpdateForm from "./RoomUpdateForm";

const RoomModal = ({ title, icon, capacity,disabled }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        <Button
          onClick={onOpen}
          backgroundColor={COLORS.lightblue}
          color="white"
          size="sm"
          isDisabled={disabled}
        >
          {icon}
          {title}
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title} </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              { title === "Add Rooms" ? (
                <RoomAddForm
                  isOpen={isOpen}
                  onClose={onClose}
                  capacity = {capacity}
                />
              ) : (
                <RoomUpdateForm
                  isOpen={isOpen}
                  onClose={onClose}
                  capacity = {capacity}
                />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };

export default RoomModal