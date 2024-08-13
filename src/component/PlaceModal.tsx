import {
  Button,
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
import PlaceForm from "./PlaceForm";
import { COLORS } from "../colors";
import { Place } from "../Interfaces/Place";
import PlaceUpdateForm from "./PlaceUpdateForm";
import { SlPicture } from "react-icons/sl";
import useRefetchState from "../state-managment/RefetchState";

interface Props {
  title: string;
  icon?: ReactElement;
  place?: Place;
}

const PlaceModal = ({ title, icon, place }: Props) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor={COLORS.lightblue}
        color="white"
        size={!place ? "md" : "sm"}
      >
        {icon}
        {title}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title} Place </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!place ? (
              <PlaceForm isOpen={isOpen} onClose={onClose} />
            ) : (
              <PlaceUpdateForm
                isOpen={isOpen}
                onClose={onClose}
                place={place}
              />
            )}
          </ModalBody>

          {/* <ModalFooter justifyContent="center">
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlaceModal;
