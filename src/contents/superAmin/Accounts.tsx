import React, { useEffect } from "react";
import UserTable from "../../component/UserTable";
import { HStack, Heading, Spinner, Text, keyframes } from "@chakra-ui/react";
import UserFilter from "../../component/UserFilter";
import { FONTS } from "../../fonts";
import SearchInput from "../../component/SearchInput";
import useUsers from "../../hooks/useUsersFilter";
import useFilterStore from "../../state-managment/FilterState";
import useSendData from "../../hooks/useSendData";
import { User } from "../../Interfaces/User";
import useRefetchState from "../../state-managment/RefetchState";

const pulse = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.08); }
`;

const Accounts = () => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { data: searched, mutate: musearch } = useSendData<User[]>(
    "/search-by-username"
  );

  const { by_name, most_recent, role_id, user_type, setFilters } =
    useFilterStore();
  const { mutate, data, isLoading, error } = useUsers({
    ...(by_name !== null && { by_name }),
    most_recent,
    ...(role_id !== "0" && { role_id }),
    ...(user_type !== null && { user_type }), //fix -confirm
  });
  const handleSearch = (searchTerm) => {
    //fix
    musearch({ name: searchTerm });
    console.log("Search term:", searchTerm);
  };
  console.log(error);
  useEffect(() => {
    //Call mutate to trigger the mutation
    mutate({
      ...(by_name !== null && { by_name }),
      most_recent,
      ...(role_id !== "0" && { role_id }),
      ...(user_type !== null && { user_type }),
    });
  }, [by_name, most_recent, role_id, user_type, mutate]);

  useEffect(() => {
    mutate({
      ...(by_name !== null && { by_name }),
      most_recent,
      ...(role_id !== "0" && { role_id }),
      ...(user_type !== null && { user_type }),
    });
    setShouldRefetch({ users: false });
  }, [shouldRefetch.users]);

  const allData = [
    ...(searched?.data || []),
    ...(data?.data.filter(
      (user) =>
        !searched?.data?.some((searchedUser) => searchedUser.id === user.id)
    ) || []),
  ];

  return (
    <>
      <HStack align-item="flex-start">
        <Heading
          fontFamily={FONTS.heading}
          _hover={{
            animation: `${pulse} 0.3s ease-in-out forwards`,
          }}
        >
          Admins
        </Heading>
        <Heading>|</Heading>
        <Heading
          fontFamily={FONTS.heading}
          _hover={{
            animation: `${pulse} 0.3s ease-in-out forwards`,
          }}
        >
          Users
        </Heading>
      </HStack>
      <SearchInput onSearch={handleSearch} />
      <UserFilter />

      {isLoading && <Spinner />}
      {/* {searched?.data && <UserTable users={searched.data} />} */}
      {allData && (
        <UserTable users={allData} resultLen={searched?.data.length} />
      )}
    </>
  );
};

export default Accounts;
