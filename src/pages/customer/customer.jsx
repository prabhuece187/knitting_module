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

import { 
    useDispatch 
} from "react-redux";

import { 
    clearState 
} from "../../features/knitting/knittingSlice";

const Customer = () => {
    const dispatch = useDispatch();

    return(
        <>
        <Box bg='white'  p={3} mb={5}  style={{borderRadius:"10px"}}>
          <Flex alignItems="center" gap={2}>
            <Link to="">
                <ArrowBackIcon w={6} h={6} />
            </Link>

            <Heading as="h3" size="lg" color="gray.600">
              Customer 
            </Heading>

            <Spacer/>

            <Link to="/customer_add">
                <Button colorScheme="blue">
                    <AddIcon w={4} h={4}  pr={2}/>
                    Add Customer
                </Button>   
            </Link>

            <Button colorScheme="blue" onClick={() => dispatch(clearState())}>
                Clear State
            </Button>

          </Flex>
        </Box>

        <Table variant="simple" bg='white'  p={3} mb={5}  style={{borderRadius:"10px"}}>
            <Thead>
                <Tr>
                    <Th>S.No</Th>
                    <Th>Customer Name</Th>
                    <Th>State</Th>
                    <Th>Gst No</Th>
                    <Th>Phone No</Th>
                    <Th>Email</Th>
                    <Th>Address</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>1</Td>
                    <Td>Prabhu</Td>
                    <Td>tamilnadu</Td>
                    <Td>33ASDBTIN12S</Td>
                    <Td>9566728542</Td>
                    <Td>prabhuking@gmail.com</Td>
                    <Td>tiruppur</Td>
                    <Td>
                        <Link to="/customer_edit"  pr={5} color="#3182ce">
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

export default Customer;