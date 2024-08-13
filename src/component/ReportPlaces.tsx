import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js"; // Import CategoryScale
import { Card, Flex, HStack, Select, Spinner, Text } from "@chakra-ui/react";
import { COLORS } from "../colors";
import { useEffect, useState } from "react";
import useSendData from "../hooks/useSendData";
import { Country, Place } from "../Interfaces/Place";
import { FONTS } from "../fonts";

ChartJS.register(CategoryScale); // Register the CategoryScale
const ReportPlaces = ({ year }) => {
  const months = [
    { name: "January", num: "1" },
    { name: "February", num: "2" },
    { name: "March", num: "3" },
    { name: "April", num: "4" },
    { name: "May", num: "5" },
    { name: "June", num: "6" },
    { name: "July", num: "7" },
    { name: "August", num: "8" },
    { name: "September", num: "9" },
    { name: "October", num: "10" },
    { name: "November", num: "11" },
    { name: "December", num: "12" },
  ];

  const [form, setForm] = useState({
    month: "",
    year: year,
  });

  const {
    data: topPlaces,
    isLoading: isPlaces,
    mutate: mutateTopPlaces,
  } = useSendData<Place[]>("/admin/get-topPlaces");
  const {
    data: topCountries,
    isLoading: isCountries,
    mutate: mutateTopCountries,
  } = useSendData<Country[]>("/admin/get-the-most-visited-countries"); //fix

  const handleChange = (event) => {
    const { value } = event.target;
    const selectedMonth = months.find((month) => month.name === value);
    if (selectedMonth) setForm({ ...form, month: selectedMonth.num });
  };

  useEffect(() => {
    mutateTopPlaces({ form });
    mutateTopCountries({ year: form.year });
    // setForm({
    //   ...form,
    //   month: form.month,
    //   year: year,
    // });
    console.log("form", form);
  }, [form]);
  console.log("topPlaces", topPlaces?.data);
  return (
    <Card
      width={"70%"}
      h={"35vh"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      borderRadius={20}
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      p={2}
      border={`1px solid ${COLORS.cyan}`}
    >
      <HStack w={"100%"} justifyContent={"space-between"}>
        <Text fontFamily={FONTS.third} m={1}>
          Most popular destinations
        </Text>
        <Select w={40} placeholder="Select a month" onChange={handleChange}>
          {months.map((month) => (
            <option key={month.num} value={month.name}>
              {month.name.substring(0, 3)}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack width={"100%"} justifyContent={"space-evenly"}>
        {isPlaces ? (
          <Spinner boxSize={"70px"} />
        ) : (
          <div className="dataCard customerCard" style={{ width: "48%" }}>
            <Bar
              data={{
                //   labels: ["a","B","c","d"],
                labels: topPlaces?.data.map((i) => i.name),
                datasets: [
                  {
                    label: "Top places",
                    //   data: [100,200,246,57],
                    data: topPlaces?.data.map((i) => i.bookings_count),
                    backgroundColor: [`${COLORS.cyan}`, `${COLORS.lightblue}`],
                    borderRadius: 5,
                  },
                ],
              }}
            />
          </div>
        )}
        {isCountries ? (
          <Spinner boxSize={"70px"} />
        ) : (
          <div className="dataCard customerCard" style={{ width: "48%" }}>
            <Bar
              data={{
                //   labels: ["a","B","c","d"],
                labels: topCountries?.data.map((i) => i.name),
                datasets: [
                  {
                    label: "Top Countries",
                    //   data: [100,200,246,57],
                    data: topCountries?.data.map(
                      (i) => i.destination_bookings_count
                    ),
                    backgroundColor: [`${COLORS.cyan}`, `${COLORS.lightblue}`],
                    borderRadius: 5,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    text: "Revenue Source",
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

export default ReportPlaces;
