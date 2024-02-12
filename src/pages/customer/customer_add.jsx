import React from "react";
import { Link } from "react-router-dom";

import {
    Button,
    Flex,
    Heading,
    Spacer,
    Stack,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
  } from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useForm, Controller } from "react-hook-form";
import { Select } from "chakra-react-select";
import { useSelector,useDispatch } from "react-redux";

import { clearState } from "../../features/knitting/knittingSlice";
import CustomBox from "../../components/customBox";

import { 
    usePostCustomerMutation,
} from "../../services/customerApi";
  

const CustomerAdd = () => {
    const {states} = useSelector((state) => state.knitting);
    const dispatch = useDispatch();

    const [postCustomer] = usePostCustomerMutation();

    const { 
        register, 
        handleSubmit,
        formState :{errors},
        control,
    } = useForm();

    const onFormSubmit = (data) => { 
        postCustomer(data);
        console.log(data);
    };


    return(
        <>
        <CustomBox>
            <Flex alignItems="center" gap={2}>
            <Link to="/customer">
                <ArrowBackIcon w={6} h={6} />
            </Link>

            <Heading as="h3" size="lg">
                Customer Add Form
            </Heading>

            <Spacer/>

            <Button colorScheme="blue" onClick={() => dispatch(clearState())}>
                Clear State
            </Button>
            </Flex>
        </CustomBox>
        
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <CustomBox>
                <Stack spacing={4}>
                    <FormControl isInvalid={errors?.customer_name} >
                        <FormLabel color="gray.600">Name</FormLabel>
                        <Input type='text' placeholder="Name" {
                            ... register("customer_name" ,{required:"Name Field Is Empyt"})
                        }/>
                        <FormErrorMessage>{errors?.customer_name && errors.customer_name.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl hidden>
                        <FormLabel color="gray.600">State Code</FormLabel>
                        <Input type='text' placeholder="State Code" {
                            ... register("customer_state_code")
                        }/>
                        <FormErrorMessage></FormErrorMessage>
                    </FormControl>


                    <Controller
                    control={control}
                    name="customer_state"
                    rules={{
                        required:"Select the state plz",
                    }}
                    render={({
                        field:{ onChange, onBlur, value,name, ref},
                    }) => (
                        <FormControl isInvalid={errors.customer_state} >
                        <FormLabel color="gray.600">State</FormLabel>
                        <Select 
                            name={name}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                            options={states}
                            getOptionLabel={(e)=> e.value}
                            getOptionValue={(e)=> e.label}
                            onChange={(e) => {
                                onChange(e);
                            }}
                            placeholder="Select State"
                            closeMenuOnSelect={true}
                        />
                        <FormErrorMessage>{errors.customer_state && errors.customer_state.message}</FormErrorMessage>
                    </FormControl>
                    )}
                    />                    

                    <FormControl isInvalid={errors?.customer_gst_no}>
                        <FormLabel color="gray.600">Gst No</FormLabel>
                        <Input type='text' placeholder="Gst No" {
                            ... register("customer_gst_no" ,{
                                required:{
                                    value :true,
                                    message: "Gst No Field Is Empyt"
                                },
                            })
                        }/>
                        <FormErrorMessage>{errors?.customer_gst_no && errors.customer_gst_no.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl >
                        <FormLabel color="gray.600">Mobile No</FormLabel>
                        <Input type='text' placeholder="Mobile No" {
                            ... register("customer_mobile")
                        }/>
                        <FormErrorMessage></FormErrorMessage>
                    </FormControl> 

                    <FormControl isInvalid={errors?.customer_email}>
                        <FormLabel color="gray.600">Email</FormLabel>
                        <Input type='email' placeholder="Email" {
                            ... register("customer_email")
                        }/>
                        <FormErrorMessage>{errors?.customer_email && errors.customer_email.message}</FormErrorMessage>
                    </FormControl> 

                    <FormControl >
                        <FormLabel color="gray.600">Address</FormLabel>
                        <Input type='text' placeholder="Address" {
                            ... register("customer_address")
                        }/>
                        <FormErrorMessage></FormErrorMessage>
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

export default CustomerAdd;