import { Airport, Plane } from './Airport';
import { Hotel } from './Hotel';
import { Country, Place } from './Place';

export interface Activities {
    id: string;
    name: string;
} 

// get trip
export interface Trip {
    id: string;
    trip_name: string;
    price: number;
    new_price:number;
    number_of_people: number;
    trip_capacity: number;
    start_date: string;
    end_date: string;
    stars: number;
    trip_note: string;
    // type: String;
    // rooms_count: number;
    // source_trip_id: string;
    // destination_trip_id : string;
}

export interface Go{
    going_plane: Plane;
    airport_source: Airport;
    airport_destination: Airport;
}
export interface Return{
    return_plane: Plane;
    airport_source: Airport;
    airport_destination: Airport;
}

export interface TripDetails{
    static_trip: Trip;
    activities: Activities[];
    source_trip:Country;
    destination_trip: Country;
    places:Place[];
    going_trip:Go;
    return_trip:Return;
    hotel:Hotel;
}