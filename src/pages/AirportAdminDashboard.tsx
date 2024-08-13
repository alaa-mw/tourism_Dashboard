import React from "react";
import NavBar from "../component/NavBar";
import { Box, Container, HStack } from "@chakra-ui/react";
import SideBar from "../component/SideBar";
import { Outlet, Route, Routes } from "react-router-dom";
import { SidebarData } from "../sidebarAirportData";
import Airports from "../contents/airportAdmin/Airports";
import Home from "../contents/airportAdmin/Home";
import Help from "../contents/superAmin/Help";
import Books from "../contents/airportAdmin/Books";

const AirportAdminDashboard = () => {
  return (
    <>
      <NavBar path="/airport-admin" />
      <HStack alignItems={"flex-start"}>
        <Box w="230px" h="100vh" >
        <SideBar sidebarData={SidebarData} />
        </Box>
        <Box
          border="1px solid #ccc"
          borderRadius="md"
          width={"100vw"}
          mt={"60px"}
          p={"20px"}
        >
          <Routes>
            <Route path="airports" element={<Airports />} />
            <Route path="books" element={<Books />} />
            <Route path="help" element={<Help/>}/>
            <Route index element={<Home />} />
          </Routes>
          <Outlet />
        </Box>
      </HStack>
    </>
  );
};

export default AirportAdminDashboard;
