import "./App.css";
import ColorModeSwitch from "./component/ColorModeSwitch";
import WelcomeForm from "./component/WelcomeForm";
import NavBar from "./component/NavBar";
import UserProfile from "./component/UserProfile";
import Textra from "react-textra";
import { ChakraProvider, Container, HStack, Show } from "@chakra-ui/react";
import "./App.css";
import { COLORS } from "./colors";
import { PhoneIcon } from "@chakra-ui/icons";
import SideBar from "./component/SideBar";
//import { SidebarData } from "./sidebarData";

import { FiMenu, FiHome, FiUsers } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { BiTrip } from "react-icons/bi";
import { MdLocalAirport } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import { FaChartArea } from "react-icons/fa6";
import { SidebarData } from "./sidebarData";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import TripAdminDashboard from "./pages/TripAdminDashboard";
import AirportAdminDashboard from "./pages/AirportAdminDashboard";
import HotelAdminDashboard from "./pages/HotelAdminDashboard";
import UserTable from "./component/UserTable";
import PlaceCard from "./component/PlaceCard";
import PlaceForm from "./component/PlaceForm";
import PlaceModal from "./component/PlaceModal";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { useEffect, useState } from "react";
import UserRoleContext, {
  UserRoleProvider,
} from "../src/state-managment/UserRoleContext";
import WelcomePage from "./pages/WelcomePage";
import Accounts from "./contents/superAmin/Accounts";
import Places from "./contents/superAmin/Places";
import Home from "./contents/superAmin/Home";
import { PathLocationProvider } from "./state-managment/PathLocationContext";
import LoginModal from "./component/LoginForm/LoginModal";
import useModalStore from "./state-managment/UseModalStore";
import { generateToken, messaging } from "./firebase/firebaseConfig";
import { onMessage } from "firebase/messaging";

function App() {
  const { showModal, openModal, closeModal } = useModalStore();
  const setUserPath = () => {
    if (userRole === "Super Admin") return "/admin";
    if (userRole === "Airport admin") return "/airport-admin";
    if (userRole === "Hotel admin") return "/hotel-admin";
    if (userRole === "Trip manger") return "/trip-admin";
    // console.log("userRole", userRole);
    return "/";
  };

  const [userRole, setUserRole] = useState("");
  const [pathLocation, setPathLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = sessionStorage.getItem("userRole");
    if (storedRole) setUserRole(storedRole);
    //console.log(storedRole);
    setPathLocation(sessionStorage.getItem("pathLocation") || setUserPath);
    if (userRole && pathLocation) {
      // console.log(pathLocation);
      navigate(pathLocation);
    }
  }, [userRole, pathLocation, navigate]);

  useEffect(() => {
    generateToken();// fix - maybe commit
    onMessage(messaging, (payload) => {
      console.log(payload);
      // toast(<Message notification={payload.notification} />);
    });
  }, []);

  return (
    <>
      {showModal && <LoginModal isOpen={showModal} onClose={closeModal} />}
      <UserRoleProvider value={{ userRole, setUserRole }}>
        <PathLocationProvider value={{ pathLocation, setPathLocation }}>
          <Routes>
            <Route path="/admin/*" element={<SuperAdminDashboard />} />

            <Route path="/trip-admin/*" element={<TripAdminDashboard />} />

            <Route
              path="/airport-admin/*"
              element={<AirportAdminDashboard />}
            />

            <Route path="/hotel-admin/*" element={<HotelAdminDashboard />} />

            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </PathLocationProvider>
      </UserRoleProvider>

      {!userRole && <Navigate to="/" replace />}

      {userRole === "Super Admin" && <Navigate to="/admin" />}
      {userRole === "Airport admin" && <Navigate to="/airport-admin" />}
      {userRole === "Hotel admin" && <Navigate to="/hotel-admin" />}
      {userRole === "Trip manger" && <Navigate to="/trip-admin" />}
    </>
  );
}
export default App;
