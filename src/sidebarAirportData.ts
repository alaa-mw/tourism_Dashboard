import { BiTrip } from "react-icons/bi";
import { FaHotel } from 'react-icons/fa';
import {
    FiHome
} from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { MdLocalAirport } from "react-icons/md";
import { TbHelp } from "react-icons/tb";

export const SidebarData = [
    {
        title: 'Home',
        path: '/airport-admin',
        icon: FiHome,
    }, 
    {
        title: 'Management',
        path: '/airport-admin/airports',
        icon: MdLocalAirport,
    },
    {
        title: 'Books',
        path: '/airport-admin/books',
        icon: LiaSwatchbookSolid,
    },
    {
        title: 'Help',
        path: '/airport-admin/help',
        icon: TbHelp,
    },
]