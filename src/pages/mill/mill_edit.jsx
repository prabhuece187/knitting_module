import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
import { useGetMillByIdQuery, usePutMillMutation } from "../../services/master/millApi";


const MillEdit = () => {

    const navigate = useNavigate();
    const { 
        register, 
        handleSubmit,
        setValue,
        formState :{errors},
        } = useForm();
    
    //  URL TO GET PARAMETER VALUE
    const { millId } = useParams();
 
    const { data: mill }
        = useGetMillByIdQuery(millId, {
          skip: millId === undefined,
        });

    if (mill?.id){
        setValue(`mill_name`, mill.mill_name);
        setValue(`user_id`, mill.user_id);
        setValue(`id`, mill.id);
    }
    
    // UPDATE THE VALUE
    const [putMill] = usePutMillMutation();
    
    const onFormSubmit = (data) =>{ 
        putMill(data);
        navigate('/mill');
        window.location.reload();
    }

    return(
        <>
        <CustomBox>
            <Flex alignItems="center" gap={2}>
                <Link to="/mill">
                    <ArrowBackIcon w={6} h={6} />
                </Link>

                <Heading as="h3" size="lg">
                   Mill Edit Form
                </Heading>
            </Flex>
        </CustomBox>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <CustomBox>
                <Stack spacing={4}>

                    <FormControl isInvalid={errors?.mill_name} >
                        <FormLabel color="gray.600">Name</FormLabel>
                        <Input type='text' placeholder="Name" {
                            ... register("mill_name" ,{required:"Name Field Is Empyt"})
                        }/>
                        <FormErrorMessage>{errors?.mill_name && errors.mill_name.message}</FormErrorMessage>
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

export default MillEdit;