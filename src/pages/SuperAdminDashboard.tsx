import { Box, Flex, HStack } from "@chakra-ui/react";
import { Outlet, Route, Routes } from "react-router-dom";
import NavBar from "../component/NavBar";
import SideBar from "../component/SideBar";
import Accounts from "../contents/superAmin/Accounts";
import Airports from "../contents/superAmin/Airports";
import Books from "../contents/superAmin/Books";
import Home from "../contents/superAmin/Home";
import Hotels from "../contents/superAmin/Hotels";
import Places from "../contents/superAmin/Places";
import Reports from "../contents/superAmin/Reports";
import { SidebarData } from "../sidebarData";
import Help from "../contents/superAmin/Help";

const SuperAdminDashboard = () => {
  return (
    <>
      <NavBar path="/admin" />
      <HStack alignItems={"flex-start"}>
        <Box mr={"220px"}>
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
            <Route path="accounts" element={<Accounts />} />
            <Route path="places" element={<Places />} />
            <Route path="airports" element={<Airports />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="books" element={<Books />} />
            <Route path="reports" element={<Reports />} />
            <Route path="help" element={<Help />} />
            <Route index element={<Home />} />
          </Routes>
        </Box>
      </HStack>
    </>
  );
};

export default SuperAdminDashboard;
