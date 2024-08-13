import {
  Avatar,
  Box,
  Button,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { COLORS } from "../colors";
import useSendData from "../hooks/useSendData";
import { User } from "../Interfaces/User";
import getImageUrl from "../services/image-url";
import useRefetchState from "../state-managment/RefetchState";

export const CustomTableContainer = styled.div`
  table {
    width: 100%;
    // text-align: center;
  }
  th {
    text-align: center;
  }
  ,
  tr {
    border-radius: 15px;
  }
  ,
  td {
    text-align: center;
    padding: 5px 0px;
    // border-bottom: 1px solid #ddd;
  }

  @media only screen and (max-width: 768px) {
    th,
    td {
      display: block;
      width: 100%;
    }

    // nth-child
    th::nth-of-type(1),
    td:nth-of-type(1) {
      display: none;
    }

    tr {
      margin-bottom: 16px;
      border-radius: 20px;
    }

    th {
      font-weight: bold;
    }
  }
`;

interface Props {
  users: User[];
  resultLen?: number;
}

const UserTable = ({ users, resultLen }: Props) => {
  const { shouldRefetch, setShouldRefetch } = useRefetchState();
  const { mutate: mutateBan } = useSendData<User>("/ban-user");
  const toast = useToast();
  // fix_ delete account exist or not ?
  const handleBlock = (id) => {
    mutateBan(
      { user_id: id },
      {
        onSuccess: (data) => {
          toast({
            title: "success",
            description: `${data.message}`,
            status: "success",
            position: "bottom-right",
            variant: "left-accent",
            isClosable: true,
            duration: 4000,
          });
          setShouldRefetch({ users: true });
        },
      }
    );
  };
  return (
    <CustomTableContainer>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>Users & Admins Accounts</TableCaption>
        <Thead>
          <Tr>
            <Th>image</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone number</Th>
            <Th>Location</Th>
            <Th>role</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr
              borderRadius={20}
              key={index}
              borderBottom={
                index < (resultLen || -1) ? `3px solid ${COLORS.green}` : ""
              }
            >
              <Td>
                <Avatar
                  src={user.image ? getImageUrl(user.image) : ""}
                  boxShadow="md"
                  bgColor={COLORS.Gray}
                />
              </Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phone_number}</Td>
              <Td>{user.position.name}</Td>
              <Td w="10vw">
                {user.roles.map((role, index) => (
                  <Box
                    key={index}
                    w="8vw"
                    borderRadius="20px"
                    p={2}
                    ml={"1vw"}
                    boxShadow={"md"}
                    bg={
                      role.id == "2"
                        ? COLORS.user
                        : role.id == "3"
                        ? COLORS.ta
                        : role.id == "4"
                        ? COLORS.aa
                        : COLORS.ha
                    }
                  >
                    <Text
                      mb={0}
                      color={COLORS.white}
                      fontSize="15px"
                      textAlign="center"
                    >
                      {role.name}
                    </Text>
                  </Box>
                ))}
              </Td>
              <Td>
                <Button
                  borderRadius={20}
                  bg={COLORS.Gray}
                  mr={2}
                  onClick={() => handleBlock(user.id)}
                  w={"5vw"}
                >
                  {user?.permissions?.[0]?.name === "banned"
                    ? "unblock"
                    : "Block"}
                </Button>{" "}
                {/* fix - complete */}
                <Button borderRadius={20} bg={"red.200"} w={"5vw"}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </CustomTableContainer>
  );
};

export default UserTable;
