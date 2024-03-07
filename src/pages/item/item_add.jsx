import React from "react";
import { Link } from "react-router-dom";

import {
    Button,
    Flex,
    Heading,
    Stack,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
  } from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import CustomBox from "../../components/customBox";
import { usePostItemMutation } from "../../services/master/itemApi";


const ItemAdd = () => {

    const [postItem] = usePostItemMutation();
   
    const { 
        register, 
        handleSubmit,
        formState :{errors},
        } = useForm();

    const onFormSubmit = (data) => { 
        postItem(data);
        console.log(data);
    };


    return(
        <>
        <CustomBox>
            <Flex alignItems="center" gap={2}>
                <Link to="/item">
                    <ArrowBackIcon w={6} h={6} />
                </Link>

                <Heading as="h3" size="lg">
                    Item Add Form
                </Heading>
            </Flex>
        </CustomBox>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <CustomBox>
                <Stack spacing={4}>
                    <FormControl isInvalid={errors?.item_name} >
                        <FormLabel color="gray.600">Name</FormLabel>
                        <Input type='text' placeholder="Name" {
                            ... register("item_name" ,{required:"Name Field Is Empyt"})
                        }/>
                        <FormErrorMessage>{errors?.item_name && errors.item_name.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl >
                        <FormLabel color="gray.600">User Id</FormLabel>
                        <Input type='number' placeholder="user_id" {
                            ... register("user_id")
                        }/>
                        <FormErrorMessage></FormErrorMessage>
                    </FormControl> 

                    <Button colorScheme="blue" type="submit">
                       Submit
                    </Button>
                </Stack>
            </CustomBox>
        </form>

        </>
    );
}

export default ItemAdd;