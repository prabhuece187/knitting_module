import React from "react";
import { Link } from "react-router-dom";

import { 
    useGetCustomerQuery,
} from "../../services/master/customerApi";

import {
    Button,
    Flex,
    Heading,
    Spacer,
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
import CustomBox from "../../components/customBox";

import { 
    useDispatch 
} from "react-redux";

import { 
    clearState 
} from "../../features/knitting/knittingSlice";

const Customer = () => {

    const { data:customerData } = useGetCustomerQuery();

    const dispatch = useDispatch();

    return(
        <>
        {/* <Box bg='white'  p={3} mb={5}  style={{borderRadius:"10px"}}>
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
        </Box> */}

        <CustomBox>
            <Flex alignItems="center" gap={2}>
                <Link to="">
                    <ArrowBackIcon w={6} h={6} />
                </Link>

                <Heading as="h3" size="lg">
                    Customers 
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
        </CustomBox>

        <CustomBox>
            <Table variant="simple"   style={{borderRadius:"10px"}}>
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
                {customerData && customerData.map((cus, index) => {
                    return (
                        <Tr>
                            <Td>{ index + 1 }</Td>
                            <Td>{ cus.customer_name }</Td>
                            <Td>{ cus.customer_state }</Td>
                            <Td>{ cus.customer_gst_no }</Td>
                            <Td>{ cus.customer_mobile }</Td>
                            <Td>{ cus.customer_email }</Td>
                            <Td>{ cus.customer_address }</Td>
                            <Td>
                                <Link to={{
                                      pathname: `/customer_edit/${cus.id}`,
                                    }}  pr={5} color="#3182ce">
                                    <EditIcon w={6} h={6} pr={2} color="#3182ce"/>
                                </Link>
                                <Link to="" pr={5} color="#3182ce">
                                    <DeleteIcon w={6} h={6} pr={2} color="#3182ce"/>
                                </Link>
                            </Td>
                        </Tr>
                    );
                })}
                </Tbody>
                
            </Table>
        </CustomBox>


        </>
    );
}

export default Customer;