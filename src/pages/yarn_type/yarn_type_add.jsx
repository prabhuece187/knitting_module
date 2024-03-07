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
import { usePostYarnTypeMutation } from "../../services/master/yarntypeApi";


const YarnTypeAdd = () => {
   
    const [postYarnType] = usePostYarnTypeMutation();

    const { 
        register, 
        handleSubmit,
        formState :{errors},
        } = useForm();

    const onFormSubmit = (data) => { 
        postYarnType(data);
        console.log(data);
    };


    return(
        <>
        <CustomBox>
            <Flex alignItems="center" gap={2}>
                <Link to="/yarn_type">
                    <ArrowBackIcon w={6} h={6} />
                </Link>

                <Heading as="h3" size="lg">
                   Yarn Type Add Form
                </Heading>
            </Flex>
        </CustomBox>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <CustomBox>
                <Stack spacing={4}>
                    <FormControl isInvalid={errors?.yarn_type} >
                        <FormLabel color="gray.600">Name</FormLabel>
                        <Input type='text' placeholder="Name" {
                            ... register("yarn_type" ,{required:"Name Field Is Empyt"})
                        }/>
                        <FormErrorMessage>{errors?.yarn_type && errors.yarn_type.message}</FormErrorMessage>
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

export default YarnTypeAdd;