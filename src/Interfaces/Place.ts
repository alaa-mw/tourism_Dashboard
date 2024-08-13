import { Airport } from "./Airport";

export interface Area {
    id: string;
    name: string;
    country?: Country;
    places?: Place[];
    airports?:Airport[];
}
export interface Country {
    id: string;
    name: string;
    areas: Area[];
    area_places: Area[];
    destination_bookings_count:number;
    users_count:number;
}
export interface Category {
    id: string;
    name: string;
}

export interface ImagePlace{
    id: string;
    place_id: string;
    image: string;
}

export interface Place {
    id: string;
    name: string;
    place_price: string;
    text: string;
    visible: number;
    images: ImagePlace[];
    categories: Category[];
    area: Area;
    bookings_count:number;
}