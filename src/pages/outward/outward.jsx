import React from "react";
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


const Outward = () => {


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
                    <Tr>
                        <Td>1</Td>
                        <Td>Prabhu</Td>
                        <Td>kkgp group</Td>
                        <Td>1</Td>
                        <Td>1</Td>
                        <Td>1</Td>
                        <Td>2/01/2024</Td>
                        <Td>50 kg</Td>
                        <Td>49 kg</Td>
                        <Td>tn 42 d 7087</Td>
                        <Td>success</Td>
                        <Td>success</Td>
                        <Td>
                            <Link to="/outward_edit"  pr={5} color="#3182ce">
                                <EditIcon w={6} h={6} pr={2} color="#3182ce"/>
                            </Link>
                            <Link to="" pr={5} color="#3182ce">
                                <DeleteIcon w={6} h={6} pr={2} color="#3182ce"/>
                            </Link>
                        </Td>
                    </Tr>
                </Tbody>
                
            </Table>
        </CustomBox>


        </>
    );
}

export default Outward;