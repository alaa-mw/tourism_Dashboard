import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useQuery,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import styles from "./LoginForm.module.css";
import { COLORS } from "../../colors";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import App from "../../App";
import UserRoleContext from "../../state-managment/UserRoleContext";
import LoginModal from "./LoginModal";
import useModalStore from "../../state-managment/UseModalStore";
import { generateToken } from "../../firebase/firebaseConfig";

const LoginForm = () => {
  // const { setRole } = useUserRole();
  const { setUserRole } = useContext(UserRoleContext);
  const { showModal, openModal, closeModal } = useModalStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    message: null,
    email: null,
    password: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    generateToken();
    const fcm_token = localStorage.getItem("fcm_token");
    console.log(fcm_token)
    axios
      .post("http://127.0.0.1:8000/api/admin-login", {
        email: email,
        password: password,
        fcm_token: fcm_token,
      })
      .then((response) => {
        const token = response.data.token;
        const role = response.data.role;
        localStorage.setItem("authToken", token);
        sessionStorage.setItem("userRole", role);
        console.log(sessionStorage.getItem("userRole"));
        setUserRole(role);

        const isFirstLogin = response.data.object;

        if (isFirstLogin === null) {
          console.log(isFirstLogin);
          openModal();
        }
      })
      .catch((error) => {
        console.log(error);
        const errors = error.response.data;
        setError({
          email: errors.errors?.email?.[0],
          password: errors.errors?.password?.[0],
          message: errors.message,
        });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl className={styles.formControl}>
          <Input
            id="1"
            variant="flushed"
            borderBottom={`1px solid ${COLORS.darkblue}`}
            type="email"
            mb="4"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
          {error && <FormHelperText color="red">{error.email}</FormHelperText>}

          <Input
            id="2"
            variant="flushed"
            borderBottom={`1px solid ${COLORS.darkblue}`}
            type="password"
            mb="4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
          {error && (
            <FormHelperText color="red">{error.password}</FormHelperText>
          )}

          {!(error.password || error.email) && error && (
            <FormHelperText color="red">{error.message}</FormHelperText>
          )}
          <br />
          <Button
            size="md"
            mt="5"
            type="submit"
            bgColor={COLORS.darkblue}
            color={"white"}
          >
            Sign In
          </Button>
        </FormControl>
      </form>
    </>
  );
};

export default LoginForm;
