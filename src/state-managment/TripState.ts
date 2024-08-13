
import { create } from 'zustand';

export interface TripState {
    formData: {
        trip_name: string;
        source_trip_id:string;
        destination_trip_id: string;
        start_date: string;
        end_date: string;
        plane_trip: string;
        plane_trip_away: string;
        hotel_id: string;
        ratio: string;
        number_of_people: string;
        trip_capacity: string;
        trip_note: string;
        places: [];
        activities: [];
        flight_date: string;
        flight_date2: string;
    },
    goRange:{
        country_source_id: string | undefined,
        country_destination_id: string | undefined,
        flight_date: string | undefined,
        type: string,
    },
    backRange:{
        country_source_id: string |undefined,
        country_destination_id: string |undefined,
        flight_date: string |undefined,
        type: string,
    },
    setFormData: (data:Partial<TripState['formData']> ) => void,
    resetAll: () => void;
}

const useTripStore = create<TripState>((set) => ({
    formData: {
        trip_name: "",
        source_trip_id: "",
        destination_trip_id: "",
        start_date: "",
        end_date: "",
        plane_trip: "",
        plane_trip_away: "",
        hotel_id: "",
        ratio: "0.1",
        number_of_people: "",
        trip_capacity: "",
        trip_note: "",
        places: [],
        activities: [],
        flight_date: "",
        flight_date2: "",
      },
      goRange:{
        country_source_id: undefined,
        country_destination_id: undefined,
        flight_date: undefined,
        type: "1",
      },
      backRange:{
        country_source_id: undefined,
        country_destination_id: undefined,
        flight_date: undefined,
        type: "1",
      },
     
    setFormData: (data: Partial<TripState['formData']>) =>  {
        set((state) => {
            const newFormData = { ...state.formData, ...data };

            let newGoRange = state.goRange;
            if (data.flight_date || data.destination_trip_id || data.source_trip_id) {
                newGoRange = {
                    ...state.goRange,
                    country_source_id: data?.source_trip_id  ||  state.formData.source_trip_id,
                    country_destination_id:data?.destination_trip_id || state.formData.destination_trip_id  ,
                    flight_date: data?.flight_date || state.formData.flight_date,
                };
                console.log("newGoRange",newGoRange)
            }
            let newBackRange = state.backRange;
            if (data.flight_date2 || data.destination_trip_id || data.source_trip_id) {
                newBackRange = {
                    ...state.backRange,
                    country_source_id: data?.destination_trip_id || state.formData.destination_trip_id,
                    country_destination_id: data?.source_trip_id || state.formData.source_trip_id,
                    flight_date: data?.flight_date2 || state.formData.flight_date2,
                };
            }

            return {
                formData: newFormData,
                goRange: newGoRange,
                backRange: newBackRange,
            };
        });
        console.log("data", data);
    },
    resetAll: () => {
        set((state) => ({
          formData: {
            ...state.formData, // for no reset source_trip_id 
            trip_name: "",
            destination_trip_id: "",
            start_date: "",
            end_date: "",
            plane_trip: "",
            plane_trip_away: "",
            hotel_id: "",
            ratio: "0.1",
            number_of_people: "",
            trip_capacity: "",
            trip_note: "",
            places: [],
            activities: [],
            flight_date: "",
            flight_date2: "",
          },
          goRange: {
            country_source_id: state.formData.source_trip_id,
            country_destination_id: undefined,
            flight_date: undefined,
            type: "1",
          },
          backRange: {
            country_source_id: undefined,
            country_destination_id: undefined,
            flight_date: undefined,
            type: "1",
          },
        }));
      },
}));

export default useTripStore;

