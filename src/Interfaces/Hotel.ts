import { Area, Country } from "./Place";
import { User } from "./User";

export interface Room {
    id:string;
    capacity: number;
    status : number;
    price :  number;

}

export interface Hotel{
    id: string;
    name: string;
    number_rooms: number; 
    stars: number;
    visible: boolean;
    area: Area;
    country: Country;
    user: User;
    image: string; // fix 
    rooms:Room[];
    hotel:Hotel;
}