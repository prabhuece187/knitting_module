import React, { useEffect, useState } from "react";
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
import Paginator from "../../components/paginator";

const Customer = () => {
    const dispatch = useDispatch();

    // const [chitId, setChitid] = useState([]);
    // const [customers, setCustomers] = useState([]);
    // const [searchInput, setSearchInput] = useState("");
    // const [filteredResults, setFilteredResults] = useState([]);

    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [curpage,setCurPage] = useState(0);
    const [recordCount, setRecordCount] = useState(0);

    const { data: customerData, isLoading: customerLoading } = useGetCustomerQuery(
        {
          limit,
          offset,
          curpage,
        },
        {
          skip: limit === "" && offset === "" && curpage === "",
        }
    );


    useEffect(() => {
        if (!customerLoading) {
          setRecordCount(customerData.total);
        }
    }, [customerLoading, customerData]);


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
                {customerData && customerData.data.map((cus, index) => {
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

        <CustomBox padding={0}>
            <Paginator
              recordCount={recordCount}
              setLimit={setLimit}
              setOffset={setOffset}
              setCurPage={setCurPage}
            />
          </CustomBox>

        </>
    );
}

export default Customer;