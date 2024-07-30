import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { FieldArray, Form, Formik } from "formik";
import { Trash } from "lucide-react";
import React, { useEffect } from "react";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import { API_TAGS } from "../../../lib/consts/API_TAGS";
import useGet from "../../../lib/hooks/get-api";

const API_URL = import.meta.env.VITE_SERVER_URL;

const CreateKitsAndComplementary = () => {
  const initialValues = {
    name: "",
    products: [
      {
        productId: "",
      },
    ],
  };

  const {
    data: marketPlaceItemsData,
    error: marketPlaceItemsError,
    loading: marketPlaceItemsLoading,
    invalidateCache,
    refresh,
    getData: getMarketPlaceItemsData,
  } = useGet({ showToast: false });

  const handleSubmit = async (values) => {
    console.log(values);
  };

  useEffect(() => {
    getMarketPlaceItemsData(
      `${API_URL}/getMarketItems`,
      API_TAGS.GET_MARKETPLACE_ITEMS
    );
  }, []);
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Create"}
        subheading={"Kits & Complementary"}
        title="Create Kits"
      />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, setFieldValue, values, handleBlur }) => {
          return (
            <Form>
              <FlexContainer variant="column-start">
                <GridContainer>
                  <Input
                    name={`name`}
                    labelPlacement="outside"
                    label="Package/Kit Name"
                    placeholder="Enter Package/Kit name"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </GridContainer>
                <FieldArray
                  name="products"
                  render={(arrayHelper) => {
                    return (
                      <FlexContainer variant="column-start">
                        {values?.products?.map((item, index) => {
                          return (
                            <GridContainer key={index}>
                              <Autocomplete
                                label="Select Product"
                                labelPlacement="outside"
                                // variant="bordered"
                                name={`products[${index}].productId`}
                                defaultItems={marketPlaceItemsData || []}
                                placeholder="Search items"
                                multiple
                                onSelectionChange={(val) => {
                                  setFieldValue(
                                    `products[${index}].productId`,
                                    val
                                  );
                                }}
                              >
                                {(item) => (
                                  <AutocompleteItem key={item?.uniqueId}>
                                    {item.productName}
                                  </AutocompleteItem>
                                )}
                              </Autocomplete>
                              <FlexContainer className={"items-center"}>
                                <NextButton
                                  onClick={() => arrayHelper.remove(index)}
                                  colorScheme="error"
                                  type="button"
                                  isIcon
                                >
                                  <Trash className="w-4 h-4" /> Delete
                                </NextButton>
                              </FlexContainer>
                            </GridContainer>
                          );
                        })}
                        <FlexContainer variant="row-end">
                          <NextButton
                            colorScheme="badge"
                            onClick={() => {
                              arrayHelper.push({
                                productId: "",
                              });
                            }}
                          >
                            Add Item
                          </NextButton>
                        </FlexContainer>
                      </FlexContainer>
                    );
                  }}
                />
                <FlexContainer variant="row-end">
                  <NextButton type="submit" colorScheme="primary">
                    Save
                  </NextButton>
                </FlexContainer>
              </FlexContainer>
            </Form>
          );
        }}
      </Formik>
    </FlexContainer>
  );
};

export default CreateKitsAndComplementary;
