import React from "react";
import { Link, useParams } from "react-router-dom";

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
import { useGetYarnTypeByIdQuery, usePutYarnTypeMutation } from "../../services/master/yarntypeApi";


const YarnTypeEdit = () => {
    const { yarntypeId } = useParams();

    const { 
        register, 
        handleSubmit,
        setValue,
        formState :{errors},
        } = useForm();

    const { data: yarntype }
    = useGetYarnTypeByIdQuery(yarntypeId, {
      skip: yarntypeId === undefined,
    });

    const [putYarnType] = usePutYarnTypeMutation();

    if (yarntype?.id){
        setValue(`yarn_type`, yarntype.yarn_type);
        setValue(`user_id`, yarntype.user_id);
        setValue(`id`, yarntype.id);
    }

    const onFormSubmit = (data) =>{ 
        putYarnType(data);
        console.log(data);
    }


    return(
        <>
        <CustomBox>
            <Flex alignItems="center" gap={2}>
                <Link to="/yarn_type">
                    <ArrowBackIcon w={6} h={6} />
                </Link>

                <Heading as="h3" size="lg">
                   Yarn Type Edit Form
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

export default YarnTypeEdit;