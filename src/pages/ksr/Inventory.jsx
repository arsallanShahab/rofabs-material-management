import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { ArrowLeft, Trash } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";

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

const Inventory = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [inventoryItems, setInventoryItems] = useState(DUMMY_DATA); // [categoryName, itemName, quantity, price]
  const [categoryName, setCategoryName] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();
  const heading = "KSR";
  const subheading = "Inventory";
  const title = "Inventory Management";
  const showButton = true;
  const buttonText = "Create Order";
  const buttonHref = "/ksr/create-order";

  const handleInventoryUpdate = () => {
    const category = inventoryItems.find(
      (item) => item.categoryName === categoryName
    );
    if (category) {
      const item = category.items.find((item) => item.itemName === itemName);
      if (item) {
        item.quantity = quantity;
        item.price = price;
      } else {
        category.items.push({ itemName, quantity, price });
      }
    } else {
      setInventoryItems([
        ...inventoryItems,
        { categoryName, items: [{ itemName, quantity, price }] },
      ]);
    }
    onClose();
  };

  const handleOpenToAddItem = ({ categoryName }) => {
    setCategoryName(categoryName);
    onOpen();
  };

  const handleOpenToUpdateItem = ({
    categoryName,
    itemName,
    quantity,
    price,
  }) => {
    setCategoryName(categoryName);
    setItemName(itemName);
    setQuantity(quantity);
    setPrice(price);
    setIsUpdating(true);
    onOpen();
  };

  const handleDeleteItem = ({ categoryName, itemName }) => {
    const category = inventoryItems.find(
      (item) => item.categoryName === categoryName
    );
    if (category) {
      const index = category.items.findIndex(
        (item) => item.itemName === itemName
      );
      if (index !== -1) {
        category.items.splice(index, 1);
        setInventoryItems([...inventoryItems]);
      }
    }
  };
  const handleDeleteCategory = ({ categoryName }) => {
    const index = inventoryItems.findIndex(
      (item) => item.categoryName === categoryName
    );
    if (index !== -1) {
      inventoryItems.splice(index, 1);
      setInventoryItems([...inventoryItems]);
    }
  };
  return (
    <>
      <FlexContainer variant="column-start" gap="xl">
        <FlexContainer variant="row-between">
          <FlexContainer
            variant="row-start"
            gap="lg"
            className={"items-center"}
          >
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="p-2 bg-zinc-100 hover:border-zinc-300 rounded-lg border duration-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <FlexContainer variant="column-start" className={"gap-0"}>
              <FlexContainer gap="sm" className={"items-center"}>
                <span className="text-sm">{heading}</span>
                <span className="text-sm">
                  {subheading ? `/ ${subheading}` : null}
                </span>
              </FlexContainer>
              <h3 className="-mt-1.5 text-lg font-semibold">{title}</h3>
            </FlexContainer>
          </FlexContainer>
          <FlexContainer variant="row-end">
            <NextButton href="/ksr/config">Config</NextButton>
            {showButton && (
              <NextButton colorScheme="primary" href={buttonHref}>
                {buttonText}
              </NextButton>
            )}
          </FlexContainer>
        </FlexContainer>

        <FlexContainer variant="row-between" gap="xl">
          <h2 className="font-semibold text-xl">Inventory Items</h2>
          {/* <NextButton onClick={onOpen} colorScheme="badge">
            Add new dish
          </NextButton> */}
        </FlexContainer>
        <FlexContainer variant="column-start" gap="md">
          {inventoryItems.map((item, index) => (
            <InventoryItem
              key={index}
              item={item}
              index={index}
              addItem={handleOpenToAddItem}
              openToUpdate={handleOpenToUpdateItem}
              deleteItem={handleDeleteItem}
              deleteCatgeory={handleDeleteCategory}
            />
          ))}
        </FlexContainer>
      </FlexContainer>
      <Modal
        onClose={() => {
          setCategoryName("");
          setItemName("");
          setQuantity("");
          setPrice("");
          setIsUpdating(false);
        }}
        size="3xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="font-semibold">
                  {isUpdating ? "Update Item" : "Add Item"}
                </h3>
                <p className="text-gray-500 text-sm font-normal">
                  {isUpdating
                    ? "Update the item details"
                    : "Add a new item to the inventory"}
                </p>
              </ModalHeader>
              <ModalBody className="pb-5">
                <GridContainer className="lg:grid-cols-2" gap="xl">
                  {!categoryName.length > 0 && (
                    <Input
                      type="text"
                      label="Category Name"
                      placeholder="Enter category name"
                      labelPlacement="outside"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-800",
                        inputWrapper: "border shadow-none",
                      }}
                      value={categoryName}
                      onValueChange={setCategoryName}
                    />
                  )}
                  <Input
                    type="text"
                    label="Item Name"
                    placeholder="Enter item name"
                    labelPlacement="outside"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={itemName}
                    onValueChange={setItemName}
                  />
                  <Input
                    type="number"
                    label="Quantity"
                    placeholder="Enter quantity"
                    labelPlacement="outside"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={quantity}
                    onValueChange={setQuantity}
                  />
                  <Input
                    type="number"
                    label="Price"
                    placeholder="Enter price"
                    labelPlacement="outside"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={price}
                    onValueChange={setPrice}
                  />
                </GridContainer>
                {/* <NextButton colorScheme="primary">
                  {isUpdating ? "Update Item" : "Add Item"}
                </NextButton> */}
              </ModalBody>
              <ModalFooter>
                <NextButton
                  colorScheme="flat"
                  onPress={() => {
                    setCategoryName("");
                    setItemName("");
                    setQuantity("");
                    setPrice("");
                    setIsUpdating(false);
                    onClose();
                  }}
                >
                  Close
                </NextButton>
                <NextButton
                  colorScheme="primary"
                  onPress={handleInventoryUpdate}
                >
                  {isUpdating ? "Update Inventory" : "Add Item to Inventory"}
                </NextButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const InventoryItem = ({
  item,
  index,
  addItem,
  openToUpdate,
  deleteItem,
  deleteCatgeory,
}) => {
  return (
    <FlexContainer
      key={index}
      variant="column-start"
      gap="sm"
      className="border p-4 bg-zinc-100 rounded-2xl"
    >
      <FlexContainer className={"items-center"} variant="row-between" gap="sm">
        <h3 className="font-semibold">{item.categoryName}</h3>
        <FlexContainer variant="row-end" gap="sm" className={"pr-3"}>
          <NextButton onClick={() => addItem(item)} colorScheme="flat">
            Add Item
          </NextButton>
          <NextButton
            isIcon
            onClick={() => deleteCatgeory(item)}
            colorScheme="flat"
          >
            <Trash className="w-4 h-4" />
          </NextButton>
        </FlexContainer>
      </FlexContainer>
      <Table key={index} aria-label="Inventory_list">
        <TableHeader>
          <TableColumn className="flex-1 w-full">Product Name</TableColumn>
          <TableColumn>Quantity</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn className="text-right">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {item.items.map((food, index) => (
            <TableRow key={index}>
              <TableCell className="w-full">{food.itemName}</TableCell>
              <TableCell>{food.quantity}</TableCell>
              <TableCell>₹{food.price}</TableCell>
              <TableCell>
                <FlexContainer variant="row-end" gap="sm">
                  <NextButton
                    isIcon
                    colorScheme="flat"
                    onClick={() =>
                      openToUpdate({
                        categoryName: item.categoryName,
                        itemName: food.itemName,
                        quantity: food.quantity,
                        price: food.price,
                      })
                    }
                  >
                    Edit
                  </NextButton>
                  <NextButton
                    isIcon
                    colorScheme="error"
                    onClick={() =>
                      deleteItem({
                        categoryName: item.categoryName,
                        itemName: food.itemName,
                      })
                    }
                  >
                    Delete
                  </NextButton>
                </FlexContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </FlexContainer>
  );
};

export default Inventory;
