import React from "react";
import { Link } from "react-router-dom";

import {
    Button,
    Flex,
    Heading,
    Box,
    Stack,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
  } from "@chakra-ui/react";

  import { ArrowBackIcon } from "@chakra-ui/icons";
  import { useForm } from "react-hook-form";


const YarnTypeAdd = () => {
   

    const { 
        register, 
        handleSubmit,
        formState :{errors},
        } = useForm();
    const onFormSubmit = (data) => console.log(data);


    return(
        <>
        <Box bg='white'  p={3} mb={5}  style={{borderRadius:"10px"}}>
          <Flex alignItems="center" gap={2}>
            <Link to="/yarn_type">
                <ArrowBackIcon w={6} h={6} />
            </Link>

            <Heading as="h3" size="lg" color="gray.600">
              Yarn Type Add
            </Heading>

          </Flex>
        </Box>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Box bg='white'  p={4}  style={{borderRadius:"10px"}}>
                <Stack spacing={4}>

                    <FormControl isInvalid={errors?.yarn_type_name} >
                        <FormLabel color="gray.600">Name</FormLabel>
                        <Input type='text' placeholder="Name" {
                            ... register("yarn_type_name" ,{required:"Name Field Is Empyt"})
                        }/>
                        <FormErrorMessage>{errors?.yarn_type_name && errors.yarn_type_name.message}</FormErrorMessage>
                    </FormControl>

                    <Button colorScheme="blue" type="submit">
                       Submit
                    </Button>
                </Stack>
            </Box>
        </form>

        </>
    );
}

export default YarnTypeAdd;