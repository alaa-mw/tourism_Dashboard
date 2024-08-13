import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  Textarea,
  VStack,
  useSteps,
} from "@chakra-ui/react";
import { MultiSelect } from "chakra-multiselect";
import React, { useState } from "react";
import { COLORS } from "../colors";
import { FONTS } from "../fonts";

const TripAddStep = ({ steps, handleSubmit, isLoading }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (newIndex) => {
    setActiveStep(newIndex);
  };

  // const { formControls } = steps;

  const renderFormControls = (step) => (
    <VStack>
      {step.formControls.map((control, index) => (
        <FormControl m={3} key={index} display={"flex"}>
          {control.label && (
            <FormLabel minWidth="160px" m={0} alignSelf={"flex-start"}>
              {control.label}
            </FormLabel>
          )}
          {control.type === "text" && (
            <Input
              name={control.name}
              onChange={control.onchange}
              value={control.value}
            />
          )}
          {control.type === "textarea" && (
            <Textarea
              name={control.name}
              onChange={control.onchange}
              value={control.value}
            />
          )}
          {control.type === "date" && (
            <Input
              name={control.name}
              placeholder="Select Date"
              size="md"
              type="date"
              value={control.value}
              onChange={control.onchange}
            />
          )}
          {control.type === "select" && (
            <Select
              width={"210px"}
              name={control.name}
              onChange={control.onchange}
              placeholder="select.."
              value={control.value}
            >
              {control.data?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
          )}
          {control.type === "multi-select" && ( // planeTrip , places activities
            <MultiSelect
              options={control.data}
              value={control.value}
              placeholder={`Choose a ${control.name}`}
              onChange={control.onchange}
              searchPlaceholder="search.."
              single={control.single}
            />
          )}
          {control.type === "range-number" && (
            <Input
              placeholder={`maximum number ${control.max}`}
              type="text"
              value={control.value}
              name={control.name}
              onChange={control.onchange}
            />
          )}
          {control.type === "radio-group" && (
            <RadioGroup
              defaultValue={control.value}
              onChange={control.onchange}
            >
              <Stack direction="row" spacing={6}>
                <Radio value="1">One</Radio>
                <Radio value="2">Two</Radio>
                <Radio value="4">Four</Radio>
                <Radio value="6">Six</Radio>
              </Stack>
            </RadioGroup>
          )}
        </FormControl>
      ))}
    </VStack>
  );

  return (
    <>
      <form onSubmit={handleSubmit} style={{ height: "1000px" }}>
        <Stepper
          index={activeStep}
          orientation="vertical"
          height="400px"
          gap="0"
          onSelect={handleStepChange}
        >
          {steps.map((step, index) => (
            <>
              <Step key={index} onClick={() => handleStepChange(index)}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box
                  flexShrink="0"
                  width={"110px"}
                  color={COLORS.lightblue}
                  fontFamily={FONTS.normal}
                >
                  <StepTitle as="b">{step.title}</StepTitle>
                  <br />
                  <StepDescription as="b">{step.description}</StepDescription>
                </Box>

                {renderFormControls(step)}

                <StepSeparator />
              </Step>
            </>
          ))}
        </Stepper>
        <Button
          mt={470}
          type="submit"
          width={"200px"}
          bgColor={COLORS.lightblue}
          color="white"
          onClick={() => handleStepChange(steps.length)}
        >
          {isLoading && <Spinner />} Submit
        </Button>
      </form>
    </>
  );
};

export default TripAddStep;
