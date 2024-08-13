import React, { useEffect, useState } from "react";
import UserProfile from "../../component/UserProfile";
import Cookies from "universal-cookie";
import LoginModal from "../../component/LoginForm/LoginModal";

const Home = () => {
  return (
    <>
      <UserProfile />
    </>
  );
};

export default Home;
