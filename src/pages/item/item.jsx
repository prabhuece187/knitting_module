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
import { useGetItemQuery } from "../../services/master/itemApi";


const Item = () => {

    const {data:ItemData} = useGetItemQuery();

    return(
        <>
        <CustomBox>
            <Flex alignItems="center" gap={2}>
                <Link to="">
                    <ArrowBackIcon w={6} h={6} />
                </Link>

                <Heading as="h3" size="lg">
                    Items 
                </Heading>

                <Spacer/>

                <Link to="/item_add">
                    <Button colorScheme="blue">
                        <AddIcon w={4} h={4}  pr={2}/>
                        Add Item
                    </Button>   
                </Link>
            </Flex>
        </CustomBox>

        <CustomBox>
            <Table variant="simple"  style={{borderRadius:"10px"}}>
                <Thead>
                    <Tr>
                        <Th>S.No</Th>
                        <Th>Item Name</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {ItemData && ItemData.map((item, index) => {
                    return (
                        <Tr>
                            <Td>{ index + 1 }</Td>
                            <Td>{ item.item_name }</Td>
                            <Td>
                                <Link to={{
                                      pathname: `/item_edit/${item.id}`,
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

export default Item;