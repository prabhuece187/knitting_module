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
import { useGetMillQuery } from "../../services/master/millApi";


const Mill = () => {
    
    const {data:MillData} = useGetMillQuery();

    return(
        <>
        <CustomBox>
            <Flex alignItems="center" gap={2}>
                <Link to="">
                    <ArrowBackIcon w={6} h={6} />
                </Link>

                <Heading as="h3" size="lg">
                  Mills  
                </Heading>

                <Spacer/>

                <Link to="/mill_add">
                    <Button colorScheme="blue">
                        <AddIcon w={4} h={4}  pr={2}/>
                        Add Mill
                    </Button>   
                </Link>
            </Flex>
        </CustomBox>

        <CustomBox>
            <Table variant="simple" style={{borderRadius:"10px"}}>
                <Thead>
                    <Tr>
                        <Th>S.No</Th>
                        <Th>Mill Name</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {MillData && MillData.map((mill, index) => {
                    return (
                        <Tr>
                            <Td>{ index + 1 }</Td>
                            <Td>{ mill.mill_name }</Td>
                            <Td>
                                <Link to={{
                                      pathname: `/mill_edit/${mill.id}`,
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

export default Mill;