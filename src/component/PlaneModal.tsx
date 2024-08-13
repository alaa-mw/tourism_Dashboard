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

interface Props {
  title: string;
  icon?: ReactElement;
  plane?: Plane;
  disable?: boolean;
}

const PlaneModal = ({ title, icon, plane, disable }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor={COLORS.lightblue}
        color="white"
        size="sm"
        isDisabled={disable}
      >
        {icon}
        {title}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title} Plane </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!plane ? (
              <PlaneAddForm isOpen={isOpen} onClose={onClose} />
            ) : title !== "Add Trip" ? (
              <PlaneUpdateForm
                isOpen={isOpen}
                onClose={onClose}
                plane={plane}
              />
            ) : (
              <PlaneTripAddForm
                isOpen={isOpen}
                onClose={onClose}
                plane={plane}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlaneModal;
