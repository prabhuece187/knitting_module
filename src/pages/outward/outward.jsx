import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    InputGroup,
    InputRightElement,
    Input,
} from "@chakra-ui/react";

import { 
    ArrowBackIcon ,
    AddIcon,
    EditIcon,
    DeleteIcon,
    Search2Icon
} from "@chakra-ui/icons";
import CustomBox from "../../components/customBox";
import { useGetOutwardQuery } from "../../services/outward/outwarApi";
import Paginator from "../../components/paginator";


const Outward = () => {

    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [curpage,setCurPage] = useState(0);
    const [recordCount, setRecordCount] = useState(0);
    const [searchInput, setSearchInput] = useState("");

    const {data:OutwardData, isLoading: outwardsLoading} = useGetOutwardQuery(
        {
            limit,
            offset,
            curpage,
            searchInput,
          },
          {
            skip: limit === 0 && offset === 0 && curpage === 0 && searchInput === "",
          }
    );

    const searchIteams = (e) => {
        if (e.target.value === "") {
            setSearchInput("true")
        }
        delayedFetchSearchResults(e.target.value);
    }

    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const delayedFetchSearchResults = debounce((query) => {
        setSearchInput(query);
    }, 2000);

    return(
        <>
         <CustomBox>
            <Flex alignItems="center" gap={2}>
                <Link to="">
                    <ArrowBackIcon w={6} h={6} />
                </Link>

                <Heading as="h3" size="lg">
                  Outwards  
                </Heading>

                <Spacer/>

                <Flex>
                    <InputGroup>
                        <Input onChange={(e) => searchIteams(e)} />
                        <InputRightElement
                        children={<Search2Icon color="blue.500" />}
                        />
                    </InputGroup>
                </Flex>

                <Link to="/outward_add">
                    <Button colorScheme="blue">
                        <AddIcon w={4} h={4}  pr={2}/>
                        Add Outward
                    </Button>   
                </Link>
            </Flex>
        </CustomBox>
        <CustomBox>
            <Table variant="simple"  style={{borderRadius:"10px"}}>
                <Thead>
                    <Tr>
                        <Th>S.No</Th>
                        <Th>Customer Name</Th>
                        <Th>Mill</Th>
                        <Th>Outward No</Th>
                        <Th>Inward No</Th>
                        <Th>Outward Tin No</Th>
                        <Th>Date</Th>
                        <Th>Total Weight</Th>
                        <Th>Total Qty</Th>
                        <Th>Vehicle No</Th>
                        <Th>Yarn Send</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                { !outwardsLoading && OutwardData.data.map((outward, index) => {
                    return (
                    <Tr key={index}>
                        <Td>{ index + 1 }</Td>
                        <Td>{ outward.customer.customer_name }</Td>
                        <Td>{ outward.mill.mill_name }</Td>
                        <Td>{ outward.outward_no }</Td>
                        <Td>{ outward.inward.inward_no }</Td>
                        <Td>{ outward.outward_tin_no }</Td>
                        <Td>{ outward.outward_date }</Td>
                        <Td>{ outward.total_weight }</Td>
                        <Td>{ outward.total_quantity }</Td>
                        <Td>{ outward.outward_vehicle_no }</Td>
                        <Td>{ outward.yarn_send }</Td>
                        <Td>{ outward.status }</Td>
                        <Td>
                        <Link to={{
                                      pathname: `/outward_edit/${outward.id}`,
                                    }}  pr={5} color="#3182ce">
                                    <EditIcon w={6} h={6} pr={2} color="#3182ce"/>
                                </Link>
                            <Link to="" pr={5} color="#3182ce">
                                <DeleteIcon w={6} h={6} pr={2} color="#3182ce"/>
                            </Link>
                        </Td>
                    </Tr>
                     );
                    })
                    }
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

export default Outward;