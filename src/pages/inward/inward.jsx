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
} from "@chakra-ui/react";

import { 
    ArrowBackIcon ,
    AddIcon,
    EditIcon,
    DeleteIcon
} from "@chakra-ui/icons";

import CustomBox from "../../components/customBox";
import { useGetInwardQuery } from "../../services/inward/inwardApi";
import Paginator from "../../components/paginator";

const Inward = () => {

    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [curpage,setCurPage] = useState(0);
    const [recordCount, setRecordCount] = useState(0);

    const { data: InwardData, isLoading: InwardLoading} = useGetInwardQuery(
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
        if (!InwardLoading) {
          setRecordCount(InwardData.total);
        }
      }, [InwardLoading, InwardData]);

    return(
        <>
        <CustomBox>
            <Flex alignItems="center" gap={2}>
                <Link to="">
                    <ArrowBackIcon w={6} h={6} />
                </Link>

                <Heading as="h3" size="lg">
                  Inwards  
                </Heading>

                <Spacer/>

                <Link to="/inward_add">
                    <Button colorScheme="blue">
                        <AddIcon w={4} h={4}  pr={2}/>
                        Add Inward
                    </Button>   
                </Link>
            </Flex>
        </CustomBox>

        <CustomBox>
            <Table variant="simple" style={{borderRadius:"10px"}}>
                <Thead>
                    <Tr>
                        <Th>S.No</Th>
                        <Th>Customer Name</Th>
                        <Th>Mill</Th>
                        <Th>Inward No</Th>
                        <Th>Inward Tin No</Th>
                        <Th>Date</Th>
                        <Th>Total Weight</Th>
                        <Th>Total Qty</Th>
                        <Th>Vehicle No</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {InwardData && InwardData.data.map((inward, index) => {
                    return (
                        <Tr>
                            <Td>{ index + 1 }</Td>
                            <Td>{ inward.customer.customer_name }</Td>
                            <Td>{ inward.mill.mill_name }</Td>
                            <Td>{ inward.inward_no }</Td>
                            <Td>{ inward.inward_tin_no }</Td>
                            <Td>{ inward.inward_date }</Td>
                            <Td>{ inward.total_weight }</Td>
                            <Td>{ inward.total_quantity }</Td>
                            <Td>{ inward.inward_vehicle_no }</Td>
                            <Td>{ inward.status }</Td>
                            <Td>
                                <Link to={{
                                      pathname: `/inward_edit/${inward.id}`,
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

export default Inward;