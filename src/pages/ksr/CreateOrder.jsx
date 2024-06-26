import {
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Form, Formik } from "formik";
import React from "react";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import NextButton from "../../components/micro/NextButton";

//food data
const DUMMY_DATA = [
  {
    categoryName: "Beverages",
    items: [
      { itemName: "Coke", quantity: 10, price: 20 },
      { itemName: "Pepsi", quantity: 10, price: 20 },
    ],
  },
  {
    categoryName: "Snacks",
    items: [
      { itemName: "Lays", quantity: 10, price: 20 },
      { itemName: "Kurkure", quantity: 10, price: 20 },
    ],
  },
  {
    categoryName: "Desserts",
    items: [
      { itemName: "Ice Cream", quantity: 10, price: 20 },
      { itemName: "Cake", quantity: 10, price: 20 },
    ],
  },
];

const CreateOrder = () => {
  const [selectedItems, setSelectedItems] = React.useState([]); //selected items
  return (
    <FlexContainer variant="column-start" gap="xl" className={"h-full"}>
      <ActionArea heading={"KSR"} subheading={"Order"} title={"Create Order"} />
      <FlexContainer variant="row-start" gap="3xl" className={"items-stretch"}>
        <FlexContainer variant="column-start" className="flex-1">
          {DUMMY_DATA.map((category, index) => (
            <FlexContainer variant="column-start" key={index} gap="md">
              <h3 className="text-lg font-semibold">{category.categoryName}</h3>
              <Table aria-label={category.categoryName}>
                <TableHeader>
                  <TableColumn className="w-full">Product Name</TableColumn>
                  <TableColumn>Quantity</TableColumn>
                  <TableColumn>Price</TableColumn>
                  <TableColumn className="text-right">Action</TableColumn>
                </TableHeader>
                <TableBody>
                  {category.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="w-full">{item.itemName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <FlexContainer className={"items-center"} gap="md">
                          <NextButton
                            isIcon
                            colorScheme="badge"
                            onClick={() => {
                              const index = selectedItems.findIndex(
                                (selectedItem) =>
                                  selectedItem.itemName === item.itemName
                              );
                              if (index === -1) {
                                setSelectedItems([
                                  ...selectedItems,
                                  {
                                    categoryName: category.categoryName,
                                    itemName: item.itemName,
                                    quantity: 1,
                                    unitPrice: item.price,
                                    totalPrice: item.price,
                                  },
                                ]);
                              } else {
                                if (selectedItems[index].quantity === 1) {
                                  const newSelectedItems = selectedItems.filter(
                                    (selectedItem) =>
                                      selectedItem.itemName !== item.itemName
                                  );
                                  setSelectedItems(newSelectedItems);
                                } else {
                                  const newSelectedItems = [...selectedItems];
                                  newSelectedItems[index].quantity -= 1;
                                  newSelectedItems[index].totalPrice =
                                    newSelectedItems[index].quantity *
                                    newSelectedItems[index].unitPrice;
                                  setSelectedItems(newSelectedItems);
                                }
                              }
                            }}
                          >
                            -
                          </NextButton>
                          <p className="text-center">
                            {selectedItems.find(
                              (selectedItem) =>
                                selectedItem.itemName === item.itemName
                            )?.quantity || 0}
                          </p>
                          <NextButton
                            isIcon
                            colorScheme="badge"
                            onClick={() => {
                              const index = selectedItems.findIndex(
                                (selectedItem) =>
                                  selectedItem.itemName === item.itemName
                              );
                              if (index === -1) {
                                setSelectedItems([
                                  ...selectedItems,
                                  {
                                    categoryName: category.categoryName,
                                    itemName: item.itemName,
                                    quantity: 1,
                                    unitPrice: item.price,
                                    totalPrice: item.price,
                                  },
                                ]);
                              } else {
                                const newSelectedItems = [...selectedItems];
                                newSelectedItems[index].quantity += 1;
                                newSelectedItems[index].totalPrice =
                                  newSelectedItems[index].quantity *
                                  newSelectedItems[index].unitPrice;
                                setSelectedItems(newSelectedItems);
                              }
                            }}
                          >
                            +
                          </NextButton>
                        </FlexContainer>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </FlexContainer>
          ))}
        </FlexContainer>

        <Formik
          initialValues={{
            type_of_sale: "",
            room_no: "",
            guest: "",
            table_no: "",
            delivery_partner: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form>
              <FlexContainer
                variant="column-between"
                className="w-full max-w-md h-full min-h-full"
              >
                <FlexContainer variant="column-start" gap="md">
                  <Select
                    name="type_of_sale"
                    label="Type of Sale"
                    labelPlacement="outside"
                    placeholder="Select Type of Sale"
                    radius="sm"
                    items={[
                      {
                        label: "Room Service",
                        key: "room_service",
                      },
                      {
                        label: "Dine In",
                        key: "dine_in",
                      },
                      {
                        label: "Delivery",
                        key: "delivery",
                      },
                    ]}
                    classNames={{
                      label: "font-medium text-zinc-900",
                      trigger: "border shadow-none",
                    }}
                    onChange={handleChange}
                  >
                    {(item) => (
                      <SelectItem value={item.key}>{item.label}</SelectItem>
                    )}
                  </Select>
                  {values.type_of_sale === "room_service" && (
                    <Select
                      label="Select Room No"
                      labelPlacement="outside"
                      name="room_no"
                      placeholder="Select Room No"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-900",
                        trigger: "border shadow-none",
                      }}
                      items={[
                        { label: "Room 1", key: "room_1" },
                        { label: "Room 2", key: "room_2" },
                        { label: "Room 3", key: "room_3" },
                        { label: "Room 4", key: "room_4" },
                      ]}
                      onChange={handleChange}
                    >
                      {(item) => (
                        <SelectItem value={item.key}>{item.label}</SelectItem>
                      )}
                    </Select>
                  )}
                  {values.type_of_sale === "room_service" && (
                    <Select
                      name="guest"
                      label="Select Guest"
                      labelPlacement="outside"
                      placeholder="Select Guest"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-900",
                        trigger: "border shadow-none",
                      }}
                      items={[
                        {
                          label: "Guest 1",
                          key: "guest_1",
                        },
                        {
                          label: "Guest 2",
                          key: "guest_2",
                        },
                        {
                          label: "Guest 3",
                          key: "guest_3",
                        },
                        {
                          label: "Guest 4",
                          key: "guest_4",
                        },
                      ]}
                      onChange={handleChange}
                    >
                      {(item) => (
                        <SelectItem value={item.key}>{item.label}</SelectItem>
                      )}
                    </Select>
                  )}
                  {values.type_of_sale === "dine_in" && (
                    <Select
                      name="table_no"
                      label="Select Table No"
                      labelPlacement="outside"
                      placeholder="Select Table No"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-900",
                        trigger: "border shadow-none",
                      }}
                      items={[
                        { label: "Table 1", key: "table_1" },
                        { label: "Table 2", key: "table_2" },
                        { label: "Table 3", key: "table_3" },
                        { label: "Table 4", key: "table_4" },
                      ]}
                      onChange={handleChange}
                    >
                      {(item) => (
                        <SelectItem value={item.key}>{item.label}</SelectItem>
                      )}
                    </Select>
                  )}
                  {values.type_of_sale === "delivery" && (
                    //select delivery partner
                    <Select
                      name="delivery_partner"
                      label="Select Delivery Partner"
                      labelPlacement="outside"
                      placeholder="Select Delivery Partner"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-900",
                        trigger: "border shadow-none",
                      }}
                      items={[
                        {
                          label: "Zomato",
                          key: "zomato",
                        },
                        {
                          label: "Swiggy",
                          key: "swiggy",
                        },
                        {
                          label: "Uber Eats",
                          key: "uber_eats",
                        },
                        {
                          label: "Dunzo",
                          key: "dunzo",
                        },
                      ]}
                      onChange={handleChange}
                    >
                      {(item) => (
                        <SelectItem value={item.key}>{item.label}</SelectItem>
                      )}
                    </Select>
                  )}
                </FlexContainer>
                <FlexContainer variant="column-start" gap="md">
                  <h3 className="text-lg font-semibold">Order Summary</h3>
                  <Table aria-label="Order Summary">
                    <TableHeader>
                      <TableColumn>Product Name</TableColumn>
                      <TableColumn>Quantity</TableColumn>
                      <TableColumn>Price</TableColumn>
                      <TableColumn>Total Price</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {selectedItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.itemName}</TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.unitPrice}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.totalPrice}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {
                    //total price
                    <FlexContainer
                      variant="row-between"
                      className="text-lg font-semibold px-5"
                    >
                      Total Price:{" "}
                      <span>
                        ₹
                        {selectedItems.reduce(
                          (totalPrice, item) => totalPrice + item.totalPrice,
                          0
                        )}
                      </span>
                    </FlexContainer>
                  }
                  <NextButton colorScheme="primary">Create Order</NextButton>
                </FlexContainer>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </FlexContainer>
    </FlexContainer>
  );
};

export default CreateOrder;
