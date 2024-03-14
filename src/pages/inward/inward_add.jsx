// import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { usePostInwardMutation } from "../../services/inward/inwardApi";
import { useGetMillQuery } from "../../services/master/millApi";

const InwardAdd = () => {

  const [postInward] = usePostInwardMutation();

  const { data:customers } = useGetCustomerQuery();
  const { data:items } = useGetItemQuery();
  const { data:yarn_types } = useGetYarnTypeQuery();
  const { data:mills } = useGetMillQuery();

  // const [total_quantity] = useState(0);
  // const [total_weight] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
  } = useForm({ 
    defaultValues: {
      total_quantity: 0,
      total_weight: 0,
    },
    mode: "onChange" });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: "Items",
  });

  const watchItems = watch("Items");

  const tempQty = getValues("total_quantity");
  const tempWeight = getValues("total_weight");

  if (itemFields.length === 0) {
    appendItem();
  }

  function amountCalculation(results) {
    let TotalQty = 0;
    let TotalWeight = 0;
    for (const key in results) {
      const total_qty = parseFloat(results[key].inward_qty);

      TotalQty = TotalQty + (Number.isNaN(total_qty) ? 0 : total_qty);

      const inward_weight = parseFloat(results[key].inward_weight);

      TotalWeight = TotalWeight + (Number.isNaN(inward_weight) ? 0 : inward_weight);
    }
    setValue("total_quantity", TotalQty);
    setValue("total_weight", TotalWeight);

  };

  const itemChange = (e, index) => {
    setValue(`Items.${index}.item_id`, e.id);
    setValue(`Items.${index}.item_name`, e.item_name);
    setValue(`Items.${index}.inward_qty`, e.inward_qty,{ shouldValidate: true });
    setValue(`Items.${index}.inward_weight`, e.inward_weight,{ shouldValidate: true });
    setValue(`Items.${index}.yarn_dia`, e.yarn_dia);
    setValue(`Items.${index}.yarn_gsm`, e.yarn_gsm);
    setValue(`Items.${index}.yarn_gauge`, e.yarn_gauge);
    setValue(`Items.${index}.yarn_colour`, e.yarn_colour);
    // setValue(`Items.${index}.tax`, e.tax);
    amountCalculation(watchItems);
  };

  const typeChange = (e, index) => {
    setValue(`Items.${index}.yarn_type_id`, e.id);
    setValue(`Items.${index}.yarn_type`, e.yarn_type);
  };

  const itemPropChange = (index, propName, value) => {
    setValue(`Items.${index}.${propName}`, value);
    amountCalculation(watchItems);
  };

  const onFormSubmit = (data) => {   
    data.total_quantity = tempQty;
    data.total_weight = tempWeight;
    data.customer_id = data.customer.id;
    data.mill_id = data.mill.id;
    postInward(data);
};

  return (
    <>
      <CustomBox>
        <Flex alignItems="center" gap={2}>
          <Link to="">
            <ArrowBackIcon w={6} h={6} />
          </Link>

          <Heading as="h3" size="lg">
            Inward Add Form
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

            <FormControl isInvalid={errors.inward_no}>
              <FormLabel> Inward Number </FormLabel>
              <Input
                type="number"
                placeholder="Inward Number"
                {...register("inward_no", {
                  required: "Inward Number is Empty",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.inward_no && errors.inward_no.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.inward_date}>
              <FormLabel> Inward Date </FormLabel>
              <Input
                type="date"
                {...register("inward_date", {
                  required: "Select Date",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.inward_date && errors.inward_date.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.inward_invoice_no}>
              <FormLabel> Inward Invoice Number </FormLabel>
              <Input
                type="text"
                placeholder="Inward Invoice Number"
                {...register("inward_invoice_no", {
                  required: "Inward Number is Empty",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.inward_invoice_no && errors.inward_invoice_no.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.inward_tin_no}>
              <FormLabel> Inward Tin Number </FormLabel>
              <Input
                type="text"
                placeholder="Inward Invoice Number"
                {...register("inward_tin_no", {
                  required: "Inward Number is Empty",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.inward_tin_no && errors.inward_tin_no.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.inward_vehicle_no}>
              <FormLabel> Vehicle Number </FormLabel>
              <Input
                type="text"
                placeholder="Vehicle Number"
                {...register("inward_vehicle_no")}
                size="sm"
              />
              <FormErrorMessage>
                {errors.inward_vehicle_no && errors.inward_vehicle_no.message}
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
                  <Th w={200}>  Yarn Type </Th>
                  <Th> Yarn Dia </Th>
                  <Th> Yarn Gauge </Th>
                  <Th> Yarn Gsm </Th>
                  <Th> Quantity </Th>
                  <Th> Weight </Th>
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
                          <FormControl isInvalid={errors.Items?.[index]?.inward_qty}>
                            <Input
                              type="number"
                              placeholder="Qty"
                              {...register(`Items.${index}.inward_qty`, {
                                required: "Qty is Empty",
                                onChange: (e) =>
                                  itemPropChange(index, "inward_qty", e.target.value),
                              })}
                              size="sm"
                            />
                            <FormErrorMessage>
                              {errors.Items?.[index]?.inward_qty?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl isInvalid={errors.Items?.[index]?.inward_weight}>
                            <Input
                              type="text"
                              placeholder="Weight"
                              {...register(`Items.${index}.inward_weight`, {
                                required: "Please Enter Weight",
                                onChange: (e) =>
                                  itemPropChange(
                                    index,
                                    "inward_weight",
                                    e.target.value
                                  ),
                              })}
                              size="sm"
                              className="textRight"
                            />
                            <FormErrorMessage>
                              {errors.Items?.[index]?.inward_weight?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Td>

                        <Td>
                         <FormControl isInvalid={errors.inward_detail_date}>
                            <FormLabel> Inward Date </FormLabel>
                            <Input
                                type="date"
                                {...register(`Items.${index}.inward_detail_date`, {
                                required: "Select Date",
                                })}
                                size="sm"
                            />
                            <FormErrorMessage>
                                {errors.inward_detail_date && errors.inward_detail_date.message}
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

export default InwardAdd;