import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@nextui-org/react";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";
import Tab from "../../components/micro/Tab";
import { API_TAGS } from "../../lib/consts/API_TAGS";
import useGet from "../../lib/hooks/get-api";

const API_URL = import.meta.env.VITE_SERVER_URL;

// Estimate
//     Hall
//     Food ( per plate)
//     No Of PAX
//     Decoration
//      Misc
//      Taxes

// Bill also same as estimate , but put a add charges button
//  It will open option to add some charges

//       Damages
//       Extra charges
//        Reason for extra charges

const ManageBookings = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const location = useLocation();
  const id = location.state;
  const initialValues = {
    bookerName: "",
    noOfPax: "",
    foodPlan: "",
    decorationPlan: "",
    addOns: "",
    addOnsCost: "",
    complimentary: "",
    priceQuoted: "",
    isDiscounted: "",
    discountAmount: "",
    discountType: "",
  };

  const {
    data: foodPlansData,
    error: foodPlansError,
    loading: foodPlansLoading,
    invalidateCache,
    refresh,
    getData: getFoodPlansData,
  } = useGet({ showToast: false });

  const {
    data: decorationPlansData,
    error: decorationPlansError,
    loading: decorationPlansLoading,
    getData: getDecorationPlansData,
  } = useGet({ showToast: false });

  const {
    data: taxItemsData,
    error: taxItemsError,
    loading: taxItemsLoading,
    getData: getTaxItemsData,
  } = useGet({ showToast: false });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
  };

  useEffect(() => {
    getDecorationPlansData(
      `${API_URL}/banquet/plans/decoration?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
      API_TAGS.GET_DECORATION_PLAN
    );

    getFoodPlansData(
      `${API_URL}/banquet/plans/food?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
      API_TAGS.GET_FOOD_PLAN
    );

    getTaxItemsData(
      `${API_URL}/getTaxItems?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
      API_TAGS.GET_TAXES
    );
  }, []);
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Management"}
        subheading={"Estimate"}
        title={"Estimate Management"}
        showButton={false}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Bookings List"
          isActiveTab={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Create Booking"
          isActiveTab={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
      </FlexContainer>
      {activeTab === 1 && (
        <Table aria-label="view-bookings">
          <TableHeader>
            <TableColumn>Booker Name</TableColumn>
            <TableColumn>Hall</TableColumn>
            <TableColumn>Food Plan</TableColumn>
            <TableColumn>Decoration Plan</TableColumn>
            <TableColumn>PAX</TableColumn>
            <TableColumn>Taxes</TableColumn>
            <TableColumn>Add Ons</TableColumn>
            <TableColumn>Add Ons Cost</TableColumn>
            <TableColumn>Discount</TableColumn>
            <TableColumn>Discount Amount</TableColumn>
            <TableColumn>Discount Type</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>ABC Hall</TableCell>
              <TableCell>100</TableCell>
              <TableCell>AC</TableCell>
              <TableCell className="max-w-xs">
                Washroom, Power Backup, Camp Fire, Chairs, Tables, Dining
                Tables, Dias
              </TableCell>
              <TableCell className="max-w-xs">
                Marriage, Birthday, Get Together, Corporate Parties
              </TableCell>
              <TableCell>276</TableCell>
              <TableCell>
                Washroom, Power Backup, Camp Fire, Chairs, Tables, Dining
              </TableCell>
              <TableCell>10000</TableCell>
              <TableCell>Yes</TableCell>
              <TableCell>10000</TableCell>
              <TableCell>Flat</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {activeTab === 2 && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            setFieldValue,
          }) => (
            <Form>
              <FlexContainer variant="column-start" gap="md">
                <GridContainer>
                  <Input
                    name="bookerName"
                    labelPlacement="outside"
                    label="Booker Name"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    placeholder="Booker Name"
                    value={values.bookerName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Select
                    label="Select Hall"
                    labelPlacement="outside"
                    name={`hall`}
                    placeholder="Select Hall"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      trigger: "border shadow-none",
                    }}
                    items={[
                      { uniqueId: 1, name: "Hall 1" },
                      { uniqueId: 2, name: "Hall 2" },
                      { uniqueId: 3, name: "Hall 3" },
                    ]}
                    selectedKeys={values.vendorID ? [values.vendorID] : []}
                    onChange={(e) => {
                      setFieldValue(`hall`, e.target.value);
                    }}
                  >
                    {(hall) => (
                      <SelectItem key={hall?.uniqueId}>{hall?.name}</SelectItem>
                    )}
                  </Select>
                  <Select
                    label="Select Food Plan"
                    labelPlacement="outside"
                    name={`food`}
                    placeholder="Select Food Plan"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      trigger: "border shadow-none",
                    }}
                    items={foodPlansData || []}
                    onChange={(e) => {
                      setFieldValue(`food`, e.target.value);
                    }}
                  >
                    {(plan) => (
                      <SelectItem key={plan?.uniqueId}>
                        {plan?.planeName}
                      </SelectItem>
                    )}
                  </Select>
                  <Select
                    label="Select Decoration Plan"
                    labelPlacement="outside"
                    name={`decoration`}
                    placeholder="Select Decoration Plan"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      trigger: "border shadow-none",
                    }}
                    items={decorationPlansData || []}
                    onChange={(e) => {
                      setFieldValue(`decoration`, e.target.value);
                    }}
                  >
                    {(plan) => (
                      <SelectItem key={plan?.uniqueId}>
                        {plan?.planeName}
                      </SelectItem>
                    )}
                  </Select>

                  <Input
                    name="pax"
                    labelPlacement="outside"
                    label="PAX"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    placeholder="PAX"
                    value={values.pax}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.pax && touched.pax}
                    color={errors.pax && touched.pax ? "danger" : ""}
                    error={errors.pax && touched.pax}
                    errorMessage={errors.pax}
                  />

                  <Select
                    label="Select TAX"
                    labelPlacement="outside"
                    name={`taxes`}
                    placeholder="Select TAX"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      trigger: "border shadow-none",
                    }}
                    items={taxItemsData?.taxItems || []}
                    onChange={(e) => {
                      setFieldValue(`taxes`, e.target.value);
                    }}
                  >
                    {(plan) => (
                      <SelectItem key={plan?.uniqueId}>{plan?.name}</SelectItem>
                    )}
                  </Select>

                  <Textarea
                    name="addOns"
                    labelPlacement="outside"
                    label="Add Ons"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    placeholder="Enter Add Ons"
                    value={values.addOns}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    name="addOnsCost"
                    labelPlacement="outside"
                    label="Add Ons Cost"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    placeholder="Enter Add Ons Cost"
                    value={values.addOnsCost}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </GridContainer>
                <GridContainer>
                  <Checkbox
                    value={values.isDiscounted}
                    onValueChange={(val) => setFieldValue("isDiscounted", val)}
                  >
                    Add Discount
                  </Checkbox>
                  {values.isDiscounted && (
                    <>
                      <Input
                        name="discountAmount"
                        labelPlacement="outside"
                        label="Discount Amount"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-800",
                          inputWrapper: "border shadow-none",
                        }}
                        placeholder="Enter Discount Amount"
                        value={values.discountAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Select
                        label="Select Discount Type"
                        labelPlacement="outside"
                        name={`discountType`}
                        placeholder="Select Discount Type"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-900",
                          trigger: "border shadow-none",
                        }}
                        items={[
                          { uniqueId: 1, name: "Percentage" },
                          { uniqueId: 2, name: "Amount" },
                        ]}
                        selectedKeys={
                          values.discountType ? [values.discountType] : []
                        }
                        onChange={(e) => {
                          setFieldValue(`discountType`, e.target.value);
                        }}
                      >
                        {(discount) => (
                          <SelectItem key={discount?.uniqueId}>
                            {discount?.name}
                          </SelectItem>
                        )}
                      </Select>
                    </>
                  )}
                </GridContainer>
                <FlexContainer variant="row-end" gap="md" className={"p-5"}>
                  <NextButton type="submit">Create Booking</NextButton>
                </FlexContainer>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      )}
    </FlexContainer>
  );
};

export default ManageBookings;
