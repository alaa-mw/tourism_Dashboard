import React from "react";
import NavBar from "../component/NavBar";
import { Box, HStack } from "@chakra-ui/react";
import SideBar from "../component/SideBar";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../contents/tripAdmin/Home";
import { SidebarData } from "../sidebarTripData";
import Books from "../contents/tripAdmin/Books";
import NewTrip from "../contents/tripAdmin/NewTrip";
import Trips from "../contents/tripAdmin/Trips";
import Help from "../contents/superAmin/Help";

const TripAdminDashboard = () => {
  return (
    <>
      <NavBar path="/trip-admin" />
      <HStack alignItems={"flex-start"}>
        <Box w="230px" h="100vh" >
          <SideBar sidebarData={SidebarData} />
        </Box>
        <Box
          border="1px solid #ccc"
          borderRadius="md"
          width={"85vw"}
          mt={"70px"}
          p={"20px"}
        >
          <Outlet />
          <Routes>
            <Route path="trips" element={<Trips />} />
            <Route path="new-trip" element={<NewTrip />} />
            <Route path="books" element={<Books />} />
            <Route path="help" element={<Help/>}/>
            <Route index element={<Home />} />
          </Routes>
        </Box>
      </HStack>
    </>
  );
};

export default TripAdminDashboard;
