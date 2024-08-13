import { Trip } from "../Interfaces/Trip";
import useFetchData from "../hooks/useFetchData";
import { FetchResponse } from "../services/api-client";
import BookStaticAccordion from "./BookStaticAccordion";
import Header from "./Header";
///api
const BookStatic = () => {
  const { data } = useFetchData<FetchResponse<Trip[]>>(
    "/admin/all-static-trip"
  );
  return (
    <>
    <Header list={["TRIP NAME","START DATE",'END DATE','PRICE','TOTAL CAPACITY']}/>
      {data?.data.map((sb) => (
        <BookStaticAccordion trip={sb} />
      ))}
    </>
  );
};

export default BookStatic;
