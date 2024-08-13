import React from "react";
import NavBar from "../component/NavBar";
import { Box, HStack } from "@chakra-ui/react";
import SideBar from "../component/SideBar";
import { Outlet, Route, Routes } from "react-router-dom";
import { SidebarData } from "../sidebarHotelData";
import Hotels from "../contents/hotelAdmin/Hotels";
import Home from "../contents/hotelAdmin/Home";
import Books from "../contents/hotelAdmin/Books";
import Help from "../contents/superAmin/Help";

const HotelAdminDashboard = () => {
  return (
    <>
      <NavBar path="/hotel-admin" />
      <HStack alignItems={"flex-start"}>
        <Box w="240px" h="100vh">
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
            <Route path="hotels" element={<Hotels />} />
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

export default HotelAdminDashboard;
