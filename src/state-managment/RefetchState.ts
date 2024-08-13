
import { create } from 'zustand';

export interface RefetchState {
    shouldRefetch: {
        users:boolean;
        places:boolean;
        airports:boolean;
        hotels:boolean;
        tripBook:boolean;

        // airport
        planes:boolean;
        planeTrips:boolean;
        
    }
    setShouldRefetch: (data:Partial<RefetchState['shouldRefetch']> ) => void,

}

const useRefetchState = create<RefetchState>((set) => ({
    shouldRefetch: {
        users:false,
        places:false,
        airports:false,
        hotels:false,
        tripBook:false,
        
        // airport
        planes:false,
        planeTrips:false,
    },
     
    setShouldRefetch: (data: Partial<RefetchState['shouldRefetch']>) =>  {
        set((state) => {
            const newstate = { ...state.shouldRefetch, ...data };

            return {
                shouldRefetch: newstate
            };
        });
    },
}));

export default useRefetchState;

