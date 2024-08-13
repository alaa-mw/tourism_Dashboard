import { DBook } from "./Book";
import { Area, Country } from "./Place";
import { User } from "./User";

export interface PlaneImage{
    id: string;
    plane_id: string;
    image:string;
}

export interface Plane{
    id: string;
    name: string;
    ticket_price: number;
    visible: number;
    number_of_seats: number;
    airport: Airport;
    images: PlaneImage[];
    tripss: PlaneTrip[];
}

export interface Airport {
    id: string;
    name: string;
    visible: boolean;
    country: Country;
    area: Area;
    user: User;
}

export interface PlaneTrip {
    id: string;
    plane_id: string;
    current_price: string;
    available_seats: number;
    flight_duration:number;
    flight_date: string;
    landing_date: string;
    plane: Plane;
    country_source: Country;
    country_destination: Country;
    airport_source: Airport;
    airport_destination: Airport;
    booking: DBook[];
}

export interface AirportTrip {
   
    going_trip: PlaneTrip[] ;
    coming_trip: PlaneTrip[] ;
   
}