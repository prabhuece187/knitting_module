// import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";


import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Heading,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";

import { Select } from "chakra-react-select";

import CustomBox from "../../components/customBox";

import { useGetCustomerQuery } from "../../services/master/customerApi";
import { useGetItemQuery } from "../../services/master/itemApi";
import { useGetYarnTypeQuery } from "../../services/master/yarntypeApi";
import { useGetMillQuery } from "../../services/master/millApi";
import { usePostOutwardMutation } from "../../services/outward/outwarApi";

const OutwardAdd = () => {

  // TO READ THE VALUES BASED ON THE MASTER VALUES 
  const { data:customers } = useGetCustomerQuery();
  const { data:items } = useGetItemQuery();
  const { data:yarn_types } = useGetYarnTypeQuery();
  const { data:mills } = useGetMillQuery();
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
  } = useForm({ mode: "onChange" });

  // ARRAY VALUE INITILIZE NAME OF ITEMS
  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: "Items",
  });

  const watchItems = watch("Items");
  
  // TEMPORARY VALUE SET QTY AND WEIGHT
  const tempQty = getValues("total_quantity");
  const tempWeight = getValues("total_weight");
  
  // THIS CODE USING TO EMPTY ARRAY CREATE INITIAL STAGE
  if (itemFields.length === 0) {
    appendItem();
  }
  
  // AMOUNT CALUCULATION FUNCTION USING TO TOTAL CALCULATION
  function amountCalculation(results) {
    let TotalQty = 0;
    let TotalWeight = 0;
    for (const key in results) {

      // TOTAL QUANTITY CALCULATION IN ARRAY VALUES
      const total_qty = parseFloat(results[key].outward_qty);
      TotalQty = TotalQty + (Number.isNaN(total_qty) ? 0 : total_qty);

      // TOTAL WEIGHT CALCULATION IN ARRAY VALUES
      const outward_weight = parseFloat(results[key].outward_weight);
      TotalWeight = TotalWeight + (Number.isNaN(outward_weight) ? 0 : outward_weight);

    }

    setValue("total_quantity", TotalQty);
    setValue("total_weight", TotalWeight);

  };
  
  // ITEM ONCHANGE FUNCTION IN SELECT BOX
  const itemChange = (e, index) => {
    setValue(`Items.${index}.item_id`, e.id);
    setValue(`Items.${index}.item_name`, e.item_name);
    setValue(`Items.${index}.outward_qty`, e.outward_qty,{ shouldValidate: true });
    setValue(`Items.${index}.outward_weight`, e.outward_weight,{ shouldValidate: true });
    setValue(`Items.${index}.yarn_dia`, e.yarn_dia);
    setValue(`Items.${index}.yarn_gsm`, e.yarn_gsm);
    setValue(`Items.${index}.yarn_gauge`, e.yarn_gauge);
    setValue(`Items.${index}.deliverd_weight`, e.deliverd_weight);
    setValue(`Items.${index}.yarn_colour`, e.yarn_colour);
    amountCalculation(watchItems);
  };

  // YARN TYPE ONCHANGE FUNCTION IN SELECT BOX
  const typeChange = (e, index) => {
    setValue(`Items.${index}.yarn_type_id`, e.id);
    setValue(`Items.${index}.yarn_type`, e.yarn_type);
  };
    
  // QUANTITY AND WEIGHT CHANGE IN PARTICULAR ARRAY TIME FUNCTION
  const itemPropChange = (index, propName, value) => {
    setValue(`Items.${index}.${propName}`, value);
    amountCalculation(watchItems);
  };
  
  // POST THE INWARD VALUE (SUBMITTING)
  const [postOutward] = usePostOutwardMutation();

  const onFormSubmit = (data) => {   
    data.total_quantity = tempQty;
    data.total_weight = tempWeight;
    data.customer_id = data.customer.id;
    data.mill_id = data.mill.id;
    postOutward(data);
    navigate('/outward');
    window.location.reload();
};

  return (
    <>
      <CustomBox>
        <Flex alignItems="center" gap={2}>
          <Link to="">
            <ArrowBackIcon w={6} h={6} />
          </Link>

          <Heading as="h3" size="lg">
            Outward Add Form
          </Heading>
        </Flex>
      </CustomBox>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <CustomBox>
          <Flex gap={4}>
            <Controller
              control={control}
              name="customer"
              rules={{
                required: "Please Select Party.",
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <FormControl isInvalid={errors.customer}>
                  <FormLabel> Party </FormLabel>
                  <Select
                    name={name}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    onBlur={onBlur}
                    value={value}
                    options={customers}
                    getOptionLabel={(e) => e.customer_name}
                    getOptionValue={(e) => e.id}
                    placeholder="Select Party"
                    closeMenuOnSelect={true}
                    size="sm"
                  />
                  <FormErrorMessage>
                    {errors.customer && errors.customer.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="mill"
              rules={{
                required: "Please Select Mill Name.",
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <FormControl isInvalid={errors.mill}>
                  <FormLabel> Mill Name </FormLabel>
                  <Select
                    name={name}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    onBlur={onBlur}
                    value={value}
                    options={mills}
                    getOptionLabel={(e) => e.mill_name}
                    getOptionValue={(e) => e.id}
                    placeholder="Select Mill"
                    closeMenuOnSelect={true}
                    size="sm"
                  />
                  <FormErrorMessage>
                    {errors.mill && errors.mill.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />

            <FormControl isInvalid={errors.outward_no}>
              <FormLabel> Outward Number </FormLabel>
              <Input
                type="number"
                placeholder="Outward Number"
                {...register("outward_no", {
                  required: "Outward Number is Empty",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.outward_no && errors.outward_no.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.inward_no}>
              <FormLabel> Inward Number </FormLabel>
              <Input
                type="number"
                placeholder="Inward Number"
                {...register("inward_id", {
                  required: "Inward Number is Empty",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.inward_no && errors.inward_no.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.outward_date}>
              <FormLabel> Outward Date </FormLabel>
              <Input
                type="date"
                {...register("outward_date", {
                  required: "Select Date",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.outward_date && errors.outward_date.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.outward_invoice_no}>
              <FormLabel> Outward Invoice No </FormLabel>
              <Input
                type="text"
                placeholder="Outward Invoice Number"
                {...register("outward_invoice_no", {
                  required: "Outward Number is Empty",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.outward_invoice_no && errors.outward_invoice_no.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.outward_tin_no}>
              <FormLabel> Outward Tin Number </FormLabel>
              <Input
                type="text"
                placeholder="Outward Invoice Number"
                {...register("outward_tin_no", {
                  required: "Outward Number is Empty",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.outward_tin_no && errors.outward_tin_no.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.outward_vehicle_no}>
              <FormLabel> Vehicle Number </FormLabel>
              <Input
                type="text"
                placeholder="Vehicle Number"
                {...register("outward_vehicle_no")}
                size="sm"
              />
              <FormErrorMessage>
                {errors.outward_vehicle_no && errors.outward_vehicle_no.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.yarn_send}>
              <FormLabel> Yarn Send </FormLabel>
              <Input
                type="text"
                placeholder="Yarn Send"
                {...register("yarn_send", {
                    required: "Outward Number is Empty",
                  })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.yarn_send && errors.yarn_send.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl >
                <FormLabel color="gray.600">User Id</FormLabel>
                <Input type='number' placeholder="user_id" {
                    ... register("user_id")
                }/>
                <FormErrorMessage></FormErrorMessage>
            </FormControl> 

            <FormControl >
                <FormLabel color="gray.600">Status</FormLabel>
                <Input type='number' placeholder="status" {
                    ... register("status")
                }/>
                <FormErrorMessage></FormErrorMessage>
            </FormControl> 

          </Flex>
        </CustomBox>

        <CustomBox>
          <TableContainer
            style={{ overflowX: "visible", overflowY: "visible" }}
          >
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th> No </Th>
                  <Th w={300}> Items </Th>
                  <Th w={200}> Yarn Type </Th>
                  <Th> Yarn Dia </Th>
                  <Th> Yarn Gauge </Th>
                  <Th> Yarn Gsm </Th>
                  <Th> Quantity </Th>
                  <Th> Weight </Th>
                  <Th> Delivered Weight </Th>
                  <Th> Date </Th>
                  <Th> Yarn Colour </Th>
                  <Th> Act </Th>
                </Tr>
              </Thead>
              <Tbody>
                {itemFields &&
                  itemFields.map((item, index) => {
                    return (
                      <Tr key={item.id}>
                        <Td> {index + 1} </Td>
                        <Td>
                          <Controller
                            control={control}
                            name={`Items.${index}.item`}
                            rules={{
                              required: "Please Select Item.",
                            }}
                            render={({
                              field: { onChange, onBlur, value, name, ref },
                            }) => (
                              <FormControl
                                isInvalid={errors.Items?.[index]?.item}
                              >
                                <Select
                                  className="z-index"
                                  name={name}
                                  ref={ref}
                                  onChange={(e) => {
                                    onChange(e);
                                    itemChange(e, index);
                                  }}
                                  onBlur={onBlur}
                                  value={value}
                                  options={items}
                                  getOptionLabel={(e) => e.item_name}
                                  getOptionValue={(e) => e.id}
                                  placeholder="Select item"
                                  closeMenuOnSelect={true}
                                  size="sm"
                                />
                                <FormErrorMessage>
                                  {errors.Items?.[index]?.item?.message}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          />
                        </Td>

                        <Td>
                          <Controller
                            control={control}
                            name={`Items.${index}.yarn`}
                            rules={{
                              required: "Please Select Yarn Type.",
                            }}
                            render={({
                              field: { onChange, onBlur, value, name, ref },
                            }) => (
                              <FormControl
                                isInvalid={errors.Items?.[index]?.yarn}
                              >
                                <Select
                                  className="z-index"
                                  name={name}
                                  ref={ref}
                                  onChange={(e) => {
                                    onChange(e);
                                    typeChange(e, index);
                                  }}
                                  onBlur={onBlur}
                                  value={value}
                                  options={yarn_types}
                                  getOptionLabel={(e) => e.yarn_type}
                                  getOptionValue={(e) => e.id}
                                  placeholder="Select Yarn Type"
                                  closeMenuOnSelect={true}
                                  size="sm"
                                />
                                <FormErrorMessage>
                                  {errors.Items?.[index]?.yarn?.message}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          />
                        </Td>


                        <Td>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Yarn Dia"
                              {...register(`Items.${index}.yarn_dia`)}
                              size="sm"
                            />
                          </FormControl>
                        </Td>

                        <Td>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Yarn Gsm"
                              {...register(`Items.${index}.yarn_gsm`)}
                              size="sm"
                            />
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Yarn Gauge"
                              {...register(`Items.${index}.yarn_gauge`)}
                              size="sm"
                              className="textRight"
                            />
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl isInvalid={errors.Items?.[index]?.outward_qty}>
                            <Input
                              type="text"
                              placeholder="Qty"
                              {...register(`Items.${index}.outward_qty`, {
                                required: "Qty is Empty",
                                onChange: (e) =>
                                  itemPropChange(index, "outward_qty", e.target.value),
                              })}
                              size="sm"
                            />
                            <FormErrorMessage>
                              {errors.Items?.[index]?.outward_qty?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl isInvalid={errors.Items?.[index]?.outward_weight}>
                            <Input
                              type="text"
                              placeholder="Weight"
                              {...register(`Items.${index}.outward_weight`, {
                                required: "Please Enter Weight",
                                onChange: (e) =>
                                  itemPropChange(
                                    index,
                                    "outward_weight",
                                    e.target.value
                                  ),
                              })}
                              size="sm"
                              className="textRight"
                            />
                            <FormErrorMessage>
                              {errors.Items?.[index]?.outward_weight?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl isInvalid={errors.Items?.[index]?.deliverd_weight}>
                            <Input
                              type="text"
                              placeholder="Weight"
                              {...register(`Items.${index}.deliverd_weight`, {
                                required: "Please Enter Deliered Weight",
                                onChange: (e) =>
                                  itemPropChange(
                                    index,
                                    "deliverd_weight",
                                    e.target.value
                                  ),
                              })}
                              size="sm"
                              className="textRight"
                            />
                            <FormErrorMessage>
                              {errors.Items?.[index]?.deliverd_weight?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Td>

                        <Td>
                         <FormControl isInvalid={errors.outward_detail_date}>
                            <FormLabel> Inward Date </FormLabel>
                            <Input
                                type="date"
                                {...register(`Items.${index}.outward_detail_date`, {
                                required: "Select Date",
                                })}
                                size="sm"
                            />
                            <FormErrorMessage>
                                {errors.outward_detail_date && errors.outward_detail_date.message}
                            </FormErrorMessage>
                         </FormControl>
                        </Td>

                        <Td >
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Yarn Colour"
                              {...register(`Items.${index}.yarn_colour`, {
                                onChange: (e) =>
                                  itemPropChange(
                                    index,
                                    "yarn_colour",
                                    e.target.value
                                  ),
                              })}
                              size="sm"
                            />
                          </FormControl>
                        </Td>


                        <Td>
                          <Button
                            colorScheme="blue"
                            onClick={() => removeItem(index)}
                            size="sm"
                          >
                            <DeleteIcon w={3} h={3} />
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </CustomBox>

        <CustomBox>
          <Stack>
            <Button colorScheme="teal" onClick={() => appendItem()}>
              +Add New Item
            </Button>
          </Stack>
        </CustomBox>

        <CustomBox>
          <TableContainer>
            <Table variant="striped" size="sm">
              <Tbody>
                <Tr>
                  <Td> </Td>
                  <Td w={300}> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> Total Qty</Td>
                  <Td> {tempQty} </Td>
                </Tr>
                <Tr>
                  <Td> </Td>
                  <Td w={300}> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> Total Weight</Td>
                  <Td> {tempWeight} </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </CustomBox>

        <CustomBox>
          <Stack>
            <Button colorScheme="blue" type="submit">
              Submit
            </Button>
          </Stack>
        </CustomBox>
      </form>
    </>
  );
};

export default OutwardAdd;