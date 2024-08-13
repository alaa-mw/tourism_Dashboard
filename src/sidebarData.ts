import {
    FiMenu,
    FiHome,
    FiUsers,
  } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { BiTrip } from "react-icons/bi";
import { MdLocalAirport } from "react-icons/md";
import { FaHotel } from 'react-icons/fa';
import { FaChartArea } from 'react-icons/fa6';
import { Item } from './component/SideBar';
import { TbHelp } from "react-icons/tb";

export const SidebarData = [
    {
        title: 'Home',
        path: '/admin',
        icon: FiHome,
    },
    {
        title: 'Accounts',
        path: '/admin/accounts',
        icon: FiUsers,
    },
    {
        title: 'Places',
        path: '/admin/places',
        icon: FaChartArea,
    },
    {
        title: 'Airports',
        path: '/admin/airports',
        icon: MdLocalAirport,
    },
    {
        title: 'Hotels',
        path: '/admin/hotels',
        icon: FaHotel,
    },
    {
        title: 'books',
        path: '/admin/books',
        icon: LiaSwatchbookSolid,
    },
    {
        title: 'Reports',
        path: '/admin/reports',
        icon: HiOutlineDocumentReport,
    },
    {
        title: 'Help',
        path: '/admin/help',
        icon: TbHelp,
    },
]