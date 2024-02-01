import React from "react";
import { Link } from "react-router-dom";

import {
    Button,
    Flex,
    Heading,
    Spacer,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";

import { 
    ArrowBackIcon ,
    AddIcon,
    EditIcon,
    DeleteIcon
} from "@chakra-ui/icons";


const Mill = () => {

    return(
        <>
        <Box bg='white'  p={3} mb={5}  style={{borderRadius:"10px"}}>
          <Flex alignItems="center" gap={2}>
            <Link to="">
                <ArrowBackIcon w={6} h={6} />
            </Link>

            <Heading as="h3" size="lg" color="gray.600">
              Mill 
            </Heading>

            <Spacer/>

            <Link to="/mill_add">
                <Button colorScheme="blue">
                    <AddIcon w={4} h={4}  pr={2}/>
                    Add Mill
                </Button>   
            </Link>

          </Flex>
        </Box>

        <Table variant="simple" bg='white'  p={3} mb={5}  style={{borderRadius:"10px"}}>
            <Thead>
                <Tr>
                    <Th>S.No</Th>
                    <Th>Mill Name</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>1</Td>
                    <Td>kkfg group</Td>
                    <Td>
                        <Link to="/mill_edit"  pr={5} color="#3182ce">
                            <EditIcon w={6} h={6} pr={2} color="#3182ce"/>
                        </Link>
                        <Link to="" pr={5} color="#3182ce">
                            <DeleteIcon w={6} h={6} pr={2} color="#3182ce"/>
                        </Link>
                    </Td>
                </Tr>
            </Tbody>
            
        </Table>


        </>
    );
}

export default Mill;