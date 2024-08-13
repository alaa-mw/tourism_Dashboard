import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js"; // Import CategoryScale
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  HStack,
  Select,
} from "@chakra-ui/react";
import { COLORS } from "../../colors";
import ReportProfit from "../../component/ReportProfit";
import ReportPlaces from "../../component/ReportPlaces";
import { Position } from "../../Interfaces/User";
import ReportUsers from "../../component/ReportUsers";
import ReportCountries from "../../component/ReportCountries";
import { useState } from "react";
import { FONTS } from "../../fonts";
import { FaDownload } from "react-icons/fa6";
ChartJS.register(CategoryScale); // Register the CategoryScale

const Reports = () => {
  const [year, setYear] = useState("2024");
  // const yearList = ["2020","2021","2022","2023","2024","2025"]
  const years = Array.from(
    { length: 5 },
    (_, index) => new Date().getFullYear() - index
  );

  const handleChange = (event) => {
    setYear(event.target.value);
  };
  return (
    <>
      <HStack justifyContent={"space-between"}>
        <Heading fontFamily={FONTS.heading}>Reports</Heading>
        <Flex>
          <Select w="100px" value={year} onChange={handleChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <Button m="0 10px" bgColor={COLORS.cyan} leftIcon={<FaDownload />}>
            Download as PDF
          </Button>
        </Flex>
      </HStack>

      <HStack>
        <ReportProfit year={year} />
        <ReportUsers />
      </HStack>

      <HStack mt={2}>
        <ReportPlaces year={year} />
        <ReportCountries year={year} />
      </HStack>
    </>
  );
};

export default Reports;
