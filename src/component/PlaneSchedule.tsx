import { Box, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { DateRangeIcon } from "@mui/x-date-pickers";
import { DateRangePicker } from "react-date-range";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { COLORS } from "../colors";
import { RangeCalendar } from "@nextui-org/calendar";
import useSendData from "../hooks/useSendData";
import { format } from "date-fns";
import { AirportTrip } from "../Interfaces/Airport";
import { FetchResponse } from "../services/api-client";
import PlaneTripCard from "./PlaneTripCard";
import { FONTS } from "../fonts";
import p1 from "../assets/plane1.png";
import { LuSearchX } from "react-icons/lu";

const PlaneSchedule = () => {
  const { data, mutate, isLoading } = useSendData<AirportTrip>("/admin/my-airport-trip");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (state[0].startDate && state[0].endDate) {
      const formatedDate = format(state[0].startDate, "yyyy-MM-dd");
      const formatedDate2 = format(state[0].endDate, "yyyy-MM-dd");

      console.log(state);
      console.log(typeof formatedDate);
      console.log(formatedDate2);
      mutate({
        flight_date: formatedDate,
        flight_date2: formatedDate2,
      });
    }
  }, [state[0].startDate, state[0].endDate]);

  console.log("air trip",data);
  return (
    <>
      <div style={{ width: "21vw" }}>
        <DateRange
          rangeColors={[COLORS.darkblue]}
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
      <VStack
        w="100%"
        overflow={"auto"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "10px",
            borderRadius: "8px",
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
            borderRadius: `8px`,
          },
        }}
      >
        {isLoading && <Spinner/>}
        {data?.data.coming_trip.length === 0 &&
          data?.data.going_trip.length === 0 && (
            <>
            <Box mt={10}>
              <LuSearchX color={COLORS.Gray2} size={"100px"} />
            </Box>
            <Text
              color={COLORS.Gray2}
              mt={3}
              fontSize={"20px"}
              fontFamily={FONTS.normal}
              textAlign={"center"}
            >
              no trips..<br/> select another data range if you want
            </Text>
          </>
          )}
        {data?.data.coming_trip.map((pTrip) => (
          <div key={pTrip.id}>
            <PlaneTripCard planeTrip={pTrip} image={false} />
          </div>
        ))}
        {data?.data.going_trip.map((pTrip) => (
          <div key={pTrip.id}>
            <PlaneTripCard planeTrip={pTrip} image={false} />
          </div>
        ))}
      </VStack>
    </>
  );
};

export default PlaneSchedule;
