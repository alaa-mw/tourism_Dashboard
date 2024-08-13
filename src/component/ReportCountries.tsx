import { CategoryScale } from "chart.js"; // Import CategoryScale
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import useSendData from "../hooks/useSendData";
import { Country } from "../Interfaces/Place";
import { Card, Spinner, Text } from "@chakra-ui/react";
import { COLORS } from "../colors";
import { FONTS } from "../fonts";
ChartJS.register(CategoryScale);

const ReportCountries = ({ year }) => {
  const { data, isLoading, mutate } = useSendData<Country[]>(
    "/admin/get-countries-with-the-most-registered"
  );
  useEffect(() => {
    mutate({ year: year });
  }, [year]);
  return (
    <Card
      width={"30%"}
      h={"35vh"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      borderRadius={20}
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      p={2}
      border={`1px solid ${COLORS.cyan}`}
    >
      <Text fontFamily={FONTS.third} m={1}>
        Top User Countries
      </Text>
      {isLoading ? (
        <Spinner boxSize={"100px"} />
      ) : (
        <div className="dataCard categoryCard" style={{ width: "18vw", marginTop:"-40px" }}>
          <Doughnut
            data={{
              labels: data?.data.map((i) => i.name),
              datasets: [
                {
                  label: "Countries",
                  data: data?.data.map((i) => i.users_count),
                  backgroundColor: [
                    `${COLORS.ta}`,
                    `${COLORS.lightblue}`,
                    "rgba(253, 135, 135, 0.8)",
                  ],
                  //   borderColor: [
                  //     "rgba(43, 63, 229, 0.8)",
                  //     "rgba(250, 192, 19, 0.8)",
                  //     "rgba(253, 135, 135, 0.8)",
                  //   ],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  position: "right", // Positions the labels to the right
                },
              },
            }}
          />
        </div>
      )}
    </Card>
  );
};

export default ReportCountries;
