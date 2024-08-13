import {
  Button,
  Divider,
  HStack,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdLocationPin, MdManageAccounts } from "react-icons/md";
import { Area, Country, Place } from "../Interfaces/Place";
import { FONTS } from "../fonts";
import useFetchData from "../hooks/useFetchData";
import useSendData from "../hooks/useSendData";
import { FetchResponse } from "../services/api-client";
import { SlLocationPin } from "react-icons/sl";
import useFetchDataId from "../hooks/useFetchDataId";
import { Hotel } from "../Interfaces/Hotel";

interface Props {
  setFilterResult: (data: any) => void;
}

const HotelFilter = ({ setFilterResult }: Props) => {
  const modal1 = useDisclosure();
  const modal2 = useDisclosure();
  const modal3 = useDisclosure();
  const [form, setForm] = useState({
    country_id: "",
    country_name: "",
    area_id: "",
    area_name: "",
  });

  const { data: locations } = useFetchData<FetchResponse<Country[]>>(
    "/admin/get_all_country"
  );
  const { data: areas, mutate } = useSendData<Country[]>("/admin/get_all_area");

  const { data: hotelsCountry } = useFetchDataId<FetchResponse<Hotel>>(
    `/admin/get_Hotel_By_Country/${form.country_id}`,
    form.country_id
  );
  const { data: hotelsArea } = useFetchDataId<FetchResponse<Hotel>>(
    `/admin/get_Hotel_By_Area/${form.area_id}`,
    form.area_id
  );

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    const [selectedId, selectedName] = selectedValue.split("-");
    setForm({
      ...form,
      [event.target.name + "_id"]: selectedId,
      [event.target.name + "_name"]: selectedName,
    });
  };

  const handleNoFilter = () => {
    modal3.onToggle();
    modal1.onClose();
    modal2.onClose();
    setForm({
      country_id: "",
      country_name: "",
      area_id: "",
      area_name: "",
    });
    setFilterResult(undefined);
  };

  useEffect(() => {
    if (form.country_id) mutate({ country_id: form.country_id });

    if (hotelsArea) setFilterResult(hotelsArea?.data);
    else setFilterResult(hotelsCountry?.data);
  }, [form.country_id, hotelsCountry, form.area_id, hotelsArea]);

  return (
    <>
      <HStack m={0} w="98%">
        <Text fontFamily={FONTS.heading} m={0} fontSize={"17px"}>
          Filter by :
        </Text>

        <Button
          backgroundColor={modal3.isOpen ? "blue.300" : ""}
          onClick={handleNoFilter}
          borderRadius={20}
        >
          <Text m={2}>All</Text>
        </Button>

        <Button
          backgroundColor={modal1.isOpen ? "blue.300" : ""}
          onClick={modal1.onToggle}
          borderRadius={20}
          w={"200px"}
        >
          <MdLocationPin />
          <Select
            m={2}
            name="country"
            variant="unstyled"
            placeholder={form.country_name}
            onChange={handleSelect}
          >
            <option key="none" value={""}>
              none
            </option>

            {locations?.data.map((item) => (
              <option key={item.id} value={`${item.id}-${item.name}`}>
                {item.name}
              </option>
            ))}
          </Select>
        </Button>

        <Button
          backgroundColor={modal2.isOpen ? "blue.300" : ""}
          onClick={modal2.onToggle}
          borderRadius={20}
          w={"200px"}
        >
          <MdLocationPin />
          <Select
            m={2}
            name="area"
            variant="unstyled"
            placeholder={form.area_name}
            onChange={handleSelect}
          >
            <option key="none" value={""}>
              none
            </option>

            {areas?.data?.[0].areas?.map((item) => (
              <option key={item.id} value={`${item.id}-${item.name}`}>
                {item.name}
              </option>
            ))}
          </Select>
        </Button>
      </HStack>
      <Divider m={0} />
    </>
  );
};

export default HotelFilter;
