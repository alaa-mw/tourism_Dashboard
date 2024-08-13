import {
  Button,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { COLORS } from "../colors";
import useSendData from "../hooks/useSendData";
import { TripDetails } from "../Interfaces/Trip";
import useRefetchState from "../state-managment/RefetchState";

const OfferSlider = ({ tripId }) => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { data, mutate } = useSendData<TripDetails>(`/admin/offer/${tripId}`);
  const [sliderValue, setSliderValue] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  const toast = useToast();

  const handleSubmit = () => {
    const value = sliderValue / 100;
    console.log(value);
    mutate(
      {
        ratio: value,
      },
      {
        onSuccess: () => {
          setShouldRefetch({ tripBook: true });
          toast({
            title: "success",
            description: "offer set to trip",
            status: "success",
            position: "bottom-right",
            variant: "left-accent",
            isClosable: true,
            duration: 4000,
          });
        },
      }
    );
  };
  useEffect(() => {
    console.log(sliderValue);
  }, [sliderValue]);
  return (
    <>
      <Slider
        width={"50%"}
        id="slider"
        defaultValue={5}
        min={0}
        max={100}
        colorScheme="teal"
        onChange={(v) => setSliderValue(v)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
          25%
        </SliderMark>
        <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
          50%
        </SliderMark>
        <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
          75%
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`${sliderValue}%`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
      <Button
        borderRadius={20}
        ml={2}
        bgColor={COLORS.cyan}
        leftIcon={<FaCheck size={"25px"} />}
        onClick={handleSubmit}
      />
    </>
  );
};
export default OfferSlider;
