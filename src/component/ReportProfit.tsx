import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js"; // Import CategoryScale
import { Card, Heading, HStack, Spinner, Text } from "@chakra-ui/react";
import useSendData from "../hooks/useSendData";
import { Profit } from "../Interfaces/Report";
import { useEffect, useState } from "react";
import { FONTS } from "../fonts";
import { COLORS } from "../colors";

ChartJS.register(CategoryScale); // Register the CategoryScale

const ReportProfit = ({ year }) => {
  const { data, isLoading, mutate } =
    useSendData<Profit[]>("/admin/get-profits");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    mutate(
      { year: year },
      {
        onError: (error) => {
          console.error("Submission error:", error);
        },
        onSuccess: (data) => {
          console.log("Submission success:", data);
        },
      }
    );
  }, [year]);
  const mappedData = data?.data.map((item) => ({
    monthName: monthNames[item.month - 1],
    price: item.price,
  }));
  return (
    <Card
      width={"70%"}
      h={"40vh"}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={20}
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      p={2}
      border={`1px solid ${COLORS.cyan}`}
    >
      <HStack w={"100%"} alignItems={"flex-start"}>
        <Text
          fontFamily={FONTS.third}
          whiteSpace="pre-line"
          lineHeight="2"
          m={1}
        //   textAlign={"center"}
        >
          Annual{"\n"}profit{"\n"}chart
        </Text>
        {/* <Text fontFamily={FONTS.third}  transform="rotate(90deg)"  transformOrigin="left bottom">Annual profit chart</Text> */}
        {isLoading ? (
          <Spinner boxSize={"100px"} />
        ) : (
          <div
            className="dataCard revenueCard"
            style={{ height: "38vh", width: "69%" }}
          >
            <Line
              data={{
                labels: mappedData?.map((i) => i.monthName),
                datasets: [
                  {
                    label: "Profits",
                    data: mappedData?.map((i) => i.price),
                    backgroundColor: "#064FF0",

                    borderColor: "#064FF0",
                  },
                  {
                    label: "Cost",
                    data: [100, 200, 120], //fix
                    backgroundColor: "#FF3030",
                    borderColor: "#FF3030",
                  },
                ],
              }}
              options={{
                elements: {
                  line: {
                    tension: 0.5,
                  },
                },
                plugins: {
                  title: {
                    text: "Monthly Revenue & Cost",
                  },
                },
              }}
            />
          </div>
        )}
      </HStack>
    </Card>
  );
};

export default ReportProfit;
