import React, { useState } from "react";
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



const customers = [
  {
    id:1,
    customer_name: "Ameer",
  },
  {
    id:2,
    customer_name: "John",
  },
  {
    id:3,
    customer_name: "Siva",
  },
];

const yarn_types = [
    {
      id:1,
      yarn_type: "cotton",
    },
    {
      id:2,
      yarn_type: "poly",
    },
    {
      id:3,
      yarn_type: "non-poly",
    },
  ];

const items = [
  {
    id: 1,
    item_name: "Item 1",
  },
  {
    id: 2,
    item_name: "Item 2",
  },
  {
    id: 3,
    item_name: "Item 3",
  },
  {
    id: 4,
    item_name: "Item 4",
  },
  {
    id: 5,
    item_name: "Item 5",
  },
];

const OutwardAdd = () => {
  const [total_quantity, setTotalQuantity] = useState(0);
  const [total_weight, setTotalWeight] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
  } = useForm({ mode: "onChange" });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: "Items",
  });

  const watchItems = watch("Items");

  if (itemFields.length === 0) {
    appendItem();
  }

  const itemChange = (e, index) => {
    setValue(`Items.${index}.item.item_id`, e.item_id);
    setValue(`Items.${index}.outward_qty`, e.outward_qty,{ shouldValidate: true });
    setValue(`Items.${index}.outward_weight`, e.outward_weight,{ shouldValidate: true });
    setValue(`Items.${index}.yarn_dia`, e.yarn_dia);
    setValue(`Items.${index}.yarn_gsm`, e.yarn_gsm);
    setValue(`Items.${index}.yarn_gauge`, e.yarn_gauge);
    setValue(`Items.${index}.deliverd_weight`, e.deliverd_weight);
    setValue(`Items.${index}.yarn_colour`, e.yarn_colour);
    // setValue(`Items.${index}.tax`, e.tax);
    amountCalculation(index);
  };

  const typeChange = (e, index) => {
    setValue(`Items.${index}.yarn_type.yarn_type_id`, e.yarn_type_id);
  };
    

  const itemPropChange = (index, propName, value) => {
    setValue(`Items.${index}.${propName}`, value);
    amountCalculation(index);
  };

  const amountCalculation = (index) => {
    let qty = Number(getValues(`Items.${index}.outward_qty`));
    let weight = Number(getValues(`Items.${index}.outward_weight`));
    // let discount = Number(getValues(`Items.${index}.discount`));
    // let tax = Number(getValues(`Items.${index}.tax`));

    // let amount = qty * price - discount;
    // let taxInRs = (tax / 100) * amount;
    // let finalAmount = qty * price + taxInRs;

    setValue(`Items.${index}.qty`, qty);
    setValue(`Items.${index}.weight`, weight);
    setTotalQuantity(watchItems.reduce((acc, item) => acc + item.qty, 0));
    setTotalWeight(watchItems.reduce((acc, item) => acc + item.weight, 0));
  };

  const onFormSubmit = (data) => console.log(data);

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
                {...register("inward_no", {
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
                  <Th> Yarn Type </Th>
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
                            name={`Items.${index}.yarn_type`}
                            rules={{
                              required: "Please Select Yarn Type.",
                            }}
                            render={({
                              field: { onChange, onBlur, value, name, ref },
                            }) => (
                              <FormControl
                                isInvalid={errors.Items?.[index]?.yarn_type}
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
                                  placeholder="Select item"
                                  closeMenuOnSelect={true}
                                  size="sm"
                                />
                                <FormErrorMessage>
                                  {errors.Items?.[index]?.yarn_type?.message}
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
                  <Td> {total_quantity} </Td>
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
                  <Td> {total_weight} </Td>
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