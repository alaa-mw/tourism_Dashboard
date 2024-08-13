import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import BookDynamic from "../../component/BookDynamic";
import { FONTS } from "../../fonts";
import BookStatic from "../../component/BookStatic";

const Books = () => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab fontFamily={FONTS.heading} fontSize={"30px"}>Dynamic Books</Tab>
        <Tab fontFamily={FONTS.heading} fontSize={"30px"}>Static Books</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <BookDynamic/>
        </TabPanel>
        <TabPanel>
          <BookStatic/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Books;
