import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Position } from '../Interfaces/User';

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({onSearch}: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState(''); // Use initialSearchTerm if provided, otherwise an empty string

  return (
    <form
      style={{ width: "100%", margin: " 6px 2px" }}
      onSubmit={(event) => {
        event.preventDefault(); //to prevent form from being posted to the server
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup >
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search..."
          variant="filled"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        ></Input>
      </InputGroup>
    </form>
  );
};

export default SearchInput;
