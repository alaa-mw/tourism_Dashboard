import { BiTrip } from "react-icons/bi";
import { FaHotel } from 'react-icons/fa';
import {
    FiHome
} from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { MdLocalAirport } from "react-icons/md";
import { MdAddLocationAlt } from "react-icons/md";
import { TbHelp } from "react-icons/tb";

export const SidebarData = [
    {
        title: 'Home',
        path: '/trip-admin',
        icon: FiHome,
    }, 
    {
        title: 'My Trips',
        path: '/trip-admin/trips',
        icon: BiTrip,
    },
    {
        title: 'New Trip',
        path: '/trip-admin/new-trip',
        icon: MdAddLocationAlt,
    },
    {
        title: 'books',
        path: '/trip-admin/books',
        icon: LiaSwatchbookSolid,
    },
    {
        title: 'Help',
        path: '/trip-admin/help',
        icon: TbHelp,
    },
]