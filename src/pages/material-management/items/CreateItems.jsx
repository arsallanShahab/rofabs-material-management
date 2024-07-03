import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { FieldArray, Form, Formik } from "formik";
import { Trash } from "lucide-react";
import React, { Fragment } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import { MAIN_CATEGORES } from "../../../lib/consts/categories";

const API_URL = import.meta.env.VITE_SERVER_URL;

const CreateItems = () => {
  const [categories, setCategories] = React.useState([]);
  const initialValuesItems = {
    items: [
      {
        category: "",
        mainCategory: "",
        productName: "",
        measurementUnit: "",
        unit: "",
        isActive: true,
      },
    ],
  };

  const handleAddItems = async (values, { resetForm }) => {
    const items = values.items.map((item) => {
      return {
        subCategory: item.category,
        mainCategory: item.mainCategory,
        productName: item.productName,
        measurementUnit: item.measurementUnit,
        weight: item.unit,
        status: item.isActive,
      };
    });
    console.log(items);
    try {
      const res = await axios.post(`${API_URL}/createItems`, items);
      const { data } = res;
      console.log(data, "created items");
      toast.success("Items created successfully");
      // invalidateItemsCache("items");
      // refreshItemsData();
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
    // resetForm();
  };

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Items"}
        subheading={"Create"}
        title={"Create Items"}
      />
      <FlexContainer variant="column-start" gap="xl">
        <h3 className="text-2xl font-semibold text-zinc-900">Add Items</h3>
        <Formik
          initialValues={initialValuesItems}
          validationSchema={Yup.object().shape({
            items: Yup.array().of(
              Yup.object().shape({
                category: Yup.string().required("Category is required"),
                mainCategory: Yup.string().required(
                  "Main Category is required"
                ),
                productName: Yup.string().required("Product Name is required"),
                measurementUnit: Yup.string().required(
                  "Measurement Unit is required"
                ),
                unit: Yup.string().required("Weight is required"),
                isActive: Yup.string().required("Status is required"),
              })
            ),
          })}
          onSubmit={handleAddItems}
        >
          {({
            isSubmitting,
            values,
            touched,
            errors,
            setFieldValue,
            handleBlur,
            resetForm,
          }) => {
            return (
              <Form>
                <FlexContainer variant="column-start">
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <Fragment>
                        {values?.items?.length > 0 &&
                          values.items.map((item, index) => (
                            <Fragment key={index}>
                              <h3 className="text-xl font-semibold text-indigo-600">
                                Item {index + 1}
                              </h3>
                              <GridContainer
                                gap="lg"
                                key={index}
                                className="lg:grid-cols-4"
                              >
                                <Select
                                  label="Main Category"
                                  labelPlacement="outside"
                                  name={`items.${index}.mainCategory`}
                                  placeholder="Select Main Category"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-900",
                                    trigger: "border shadow-none",
                                  }}
                                  items={Object.keys(MAIN_CATEGORES).map(
                                    (key) => ({
                                      uniqueId: key,
                                      name: MAIN_CATEGORES[key],
                                    })
                                  )}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `items.${index}.mainCategory`,
                                      e.target.value
                                    );
                                    // const category = AllCategoriesData.find(
                                    //   (category) =>
                                    //     category.uniqueId === e.target.value
                                    // );
                                    // setCategories(
                                    //   category?.subCategories || []
                                    // );
                                  }}
                                  isInvalid={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].mainCategory
                                  }
                                  color={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].mainCategory &&
                                    "danger"
                                  }
                                  errorMessage={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].mainCategory
                                  }
                                >
                                  {(category) => (
                                    <SelectItem key={category.uniqueId}>
                                      {category.name}
                                    </SelectItem>
                                  )}
                                </Select>
                                <Select
                                  label="Select Category"
                                  labelPlacement="outside"
                                  name={`items.${index}.category`}
                                  placeholder="Select Category"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-900",
                                    trigger: "border shadow-none",
                                  }}
                                  items={[
                                    { value: "detergent", key: "detergent" },
                                  ]}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `items.${index}.category`,
                                      e.target.value
                                    );
                                  }}
                                  isInvalid={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].category
                                  }
                                  color={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].category &&
                                    "danger"
                                  }
                                  errorMessage={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].category
                                  }
                                >
                                  {(category) => (
                                    <SelectItem key={category?.key}>
                                      {category?.value}
                                    </SelectItem>
                                  )}
                                </Select>

                                <Input
                                  label="Product Name"
                                  labelPlacement="outside"
                                  name={`items.${index}.productName`}
                                  placeholder="Enter Product Name"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-900",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `items.${index}.productName`,
                                      e.target.value
                                    );
                                  }}
                                  isInvalid={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].productName
                                  }
                                  color={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].productName &&
                                    "danger"
                                  }
                                  errorMessage={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].productName
                                  }
                                />
                                <FlexContainer
                                  variant="row-start"
                                  className={"items-center"}
                                  gap="lg"
                                >
                                  <Checkbox
                                    isSelected={values.items[index].isActive}
                                    onValueChange={(value) =>
                                      setFieldValue(
                                        `items.${index}.isActive`,
                                        value
                                      )
                                    }
                                  >
                                    is Active
                                  </Checkbox>
                                  <NextButton
                                    colorScheme="error"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      arrayHelpers.remove(index);
                                    }}
                                    isIcon
                                  >
                                    <Trash className="w-4 h-4" />
                                  </NextButton>
                                </FlexContainer>
                              </GridContainer>
                            </Fragment>
                          ))}
                        <FlexContainer
                          variant="row-end"
                          className="items-center p-5"
                        >
                          <NextButton
                            colorScheme="badge"
                            onClick={(e) => {
                              e.preventDefault();
                              arrayHelpers.push({
                                category: "",
                                mainCategory: "",
                                productName: "",
                                measurementUnit: "",
                                unit: "",
                                isActive: true,
                              });
                            }}
                          >
                            Add Item
                          </NextButton>
                        </FlexContainer>
                      </Fragment>
                    )}
                  />

                  <FlexContainer variant="row-end" className="items-center p-5">
                    <NextButton type="submit" colorScheme="primary">
                      Save Items
                    </NextButton>
                  </FlexContainer>
                </FlexContainer>
              </Form>
            );
          }}
        </Formik>
      </FlexContainer>
    </FlexContainer>
  );
};

export default CreateItems;
