import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import success from "../../assets/Success.png";
import { AiOutlineFileDone } from "react-icons/ai";
import { COLORS } from "../../colors";
import AirportAddForm from "../AirportAddForm";
import { FONTS } from "../../fonts";
import HotelAddForm from "../HotelAddForm";
const LoginModal = ({ isOpen, onClose }) => {
  const role = sessionStorage.getItem("userRole");

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => true}>
        <ModalOverlay />

        <ModalContent alignItems={"center"} p={3}>
          <ModalHeader fontFamily={FONTS.heading} fontSize={"1.9em"} p={"5px"}>
            Welcome to your first login!
          </ModalHeader>

          <ModalBody
            w={"400px"}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={0}
          >
            <AiOutlineFileDone color={COLORS.green} size={"100px"} />

            <Text color={"#68D391"}>please complete your information</Text>
            {role === "Airport admin" && <AirportAddForm />}
            {role === "Hotel admin" && <HotelAddForm />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
