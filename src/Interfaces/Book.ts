import { Airport, Plane, PlaneTrip } from './Airport';
import { Hotel, Room } from './Hotel';
import { Country, Place } from "./Place";
import { Activities } from "./Trip";
import { User } from "./User";

export interface DBook {
    id:string;
    user_id: number;
    trip_name: string;
    price: string; 
    new_price: string | null;
    number_of_people: number;
    trip_capacity: number | null; 
    start_date: string; 
    end_date: string;
    stars: string;
    trip_note: string;
    type: string; 
    rooms_count: number;
    user: User;
    created_at:string;
    updated_at:string;
}

interface TripLegs {
    airport_source: Airport;
    airport_destination: Airport;
}
  
export interface DBookDetails {
    dynamic_trip: DBook;
    activities: Activities[];
    source_trip: Country;
    destination_trip: Country;
    places: Place[];
    going_trip: TripLegs | [];
    return_trip: TripLegs |[];
    hotel:Hotel;
    rooms:Room[];
}
export interface StaticBookUsers {
    id: string;
    number_of_friend: number;
    book_price:number;
    
    user: User;
  
}
export interface StaticBookDetails {
    trip_admin: User;
    details:StaticBookUsers[]; 
}

export interface AirportBook {
    id: string;
    planetrip: PlaneTrip; 
}

export interface HotelBook {
    id:string;
    current_price: number,
    start_date: string,
    end_date: string,
    created_at: string,
    user:User;
    roomss:Room;
    
}