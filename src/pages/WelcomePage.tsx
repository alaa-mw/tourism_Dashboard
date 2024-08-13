import { Box, HStack, Show } from "@chakra-ui/react";
import SimpleImageSlider from "react-simple-image-slider";
import { COLORS } from "../colors";
import WelcomeForm from "../component/WelcomeForm";
import image1 from "../assets/managing.jpg";
import image2 from "../assets/flight.png";
import image3 from "../assets/hotel.jpg";

const WelcomePage = () => {
  const images = [image1, image2, image3];
  return (
    <>
      <HStack h={"100%"} gap={0} bgColor={COLORS.GrayBlue}>
        <Show breakpoint="(min-width: 800px)">
          <Box width={"45%"} height={"100vh"} shadow={"xxl"} m={0}>
            <SimpleImageSlider
              width={"45%"}
              height={"100vh"}
              images={images}
              showBullets={true}
              showNavs={false}
              slideDuration={2}
              autoPlay
            />
          </Box>
          <Box
            width={"4%"}
            height={"100vh"}
            m={0}
            bgColor={COLORS.darkblue}
          />
        </Show>

        <WelcomeForm />
      </HStack>
    </>
  );
};

export default WelcomePage;
