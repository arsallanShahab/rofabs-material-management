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
import axios from "axios";
import dayjs from "dayjs";
import { ArrowLeft, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";
import Tab from "../../components/micro/Tab";
import useGet from "../../lib/hooks/get-api";

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

const API_URL = import.meta.env.VITE_SERVER_URL;

const Inventory = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [inventoryItems, setInventoryItems] = useState(DUMMY_DATA); // [categoryName, itemName, quantity, price]
  const [selectedOrder, setSelectedOrder] = useState({}); // [categoryName, itemName, quantity, price
  const [categoryName, setCategoryName] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const navigate = useNavigate();
  const heading = "KSR";
  const subheading = "Inventory";
  const title = "Inventory Management";
  const showButton = true;
  const buttonText = "Create Order";
  const buttonHref = "/ksr/create-order";

  const {
    data: categoryData,
    error: categoryError,
    loading: categoryLoading,
    invalidateCache: invalidateCategoryCache,
    refresh: refreshCategoryData,
    getData: getCategoryData,
  } = useGet({ showToast: false });

  const {
    data: ordersData,
    error: ordersError,
    loading: ordersLoading,
    invalidateCache: invalidateOrdersCache,
    refresh: refreshOrdersData,
    getData: getOrdersData,
  } = useGet({ showToast: false });

  useEffect(() => {
    if (activeTab === 1) {
      getCategoryData(
        `${API_URL}/ksr/getDishMainCategories?includeItems=true&propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
        "dishCategory"
      );
    }
    if (activeTab === 2) {
      getOrdersData(`${API_URL}/ksr/getOrders`, "orderHistory");
    }
  }, [activeTab]);

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

        <FlexContainer variant="row-start" className="overflow-x-auto">
          <Tab
            title="Menu Items"
            isActiveTab={activeTab === 1}
            onClick={() => handleTabClick(1)}
          />
          <Tab
            title="Order History"
            isActiveTab={activeTab === 2}
            onClick={() => handleTabClick(2)}
          />
        </FlexContainer>

        {activeTab === 1 && (
          <FlexContainer variant="column-start">
            <FlexContainer variant="row-between" gap="xl">
              <h2 className="font-semibold text-xl">Inventory Items</h2>
              {/* <NextButton onClick={onOpen} colorScheme="badge">
            Add new dish
          </NextButton> */}
            </FlexContainer>
            {!categoryLoading &&
              categoryData &&
              categoryData?.map((item, index) => {
                return (
                  <>
                    <FlexContainer
                      className={"items-center"}
                      variant="row-between"
                      gap="sm"
                    >
                      <h3 className="font-semibold">{item.name}</h3>
                      <FlexContainer
                        variant="row-end"
                        gap="sm"
                        className={"pr-3"}
                      >
                        {/* <NextButton
                      onClick={() => addItem(item)}
                      colorScheme="flat"
                    >
                      Add Item
                    </NextButton> */}
                        <NextButton
                          isIcon
                          onClick={async () => {
                            try {
                              const res = await axios.delete(
                                `${API_URL}/ksr/deleteDishMainCategory?uniqueId=${item?.uniqueId}`,
                                "dishCategory"
                              );
                              toast.success("Category deleted successfully");
                              invalidateCategoryCache("dishCategory");
                              refreshCategoryData();
                            } catch (error) {
                              toast.error(
                                error?.response?.error || "An error occured"
                              );
                            }
                          }}
                          colorScheme="flat"
                        >
                          <Trash className="w-4 h-4" />
                        </NextButton>
                      </FlexContainer>
                    </FlexContainer>
                    <Table key={index} aria-label="Inventory_list">
                      <TableHeader>
                        <TableColumn className="flex-1 w-full">
                          Product Name
                        </TableColumn>
                        <TableColumn>Quantity</TableColumn>
                        <TableColumn>Price</TableColumn>
                        <TableColumn className="text-right">Action</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {item.categoryItems.map((dish, index) => (
                          <TableRow key={index}>
                            <TableCell className="w-full">
                              {dish.productName}
                            </TableCell>
                            <TableCell>{dish.quantity}</TableCell>
                            <TableCell>₹{dish.price}</TableCell>
                            <TableCell>
                              <FlexContainer variant="row-end" gap="sm">
                                {/* <NextButton
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
                            </NextButton> */}
                                <NextButton
                                  isIcon
                                  colorScheme="error"
                                  onClick={async () => {
                                    try {
                                      const res = await axios.delete(
                                        `${API_URL}/ksr/deleteDishInventory?uniqueId=${dish?.uniqueId}`,
                                        "dishCategory"
                                      );
                                      toast.success(
                                        "Item deleted successfully"
                                      );
                                      invalidateCategoryCache("dishCategory");
                                      refreshCategoryData();
                                    } catch (error) {
                                      toast.error(
                                        error?.response?.error ||
                                          "An error occured"
                                      );
                                    }
                                  }}
                                >
                                  Delete
                                </NextButton>
                              </FlexContainer>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                );
              })}
          </FlexContainer>
        )}
        {activeTab === 2 && (
          <FlexContainer variant="column-start">
            {!ordersLoading &&
              ordersData?.orders &&
              ordersData?.orders?.map((item, index) => {
                return (
                  <Table key={index} aria-label="order_list">
                    <TableHeader>
                      <TableColumn className="flex-1 w-full">
                        Order ID
                      </TableColumn>
                      <TableColumn>Order Date</TableColumn>
                      <TableColumn>Type Of Sale</TableColumn>
                      <TableColumn>Total Amount</TableColumn>
                      <TableColumn>Table Number</TableColumn>
                      <TableColumn>Room Number</TableColumn>
                      <TableColumn>view</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="w-full">
                          {item?.orderId}
                        </TableCell>
                        <TableCell className="text-nowrap">
                          {dayjs(item?.createdAt).format(
                            "DD MMM YYYY, hh:mm A"
                          )}
                        </TableCell>
                        <TableCell>{item?.typeOfSale}</TableCell>
                        <TableCell>₹{item?.totalPrice}</TableCell>
                        <TableCell>{item?.tableNumber || "N/P"}</TableCell>
                        <TableCell>{item?.roomNumber || "N/P"}</TableCell>
                        <TableCell>
                          <NextButton
                            colorScheme="badge"
                            onClick={() => {
                              setSelectedOrder(item);
                              onOpen();
                            }}
                          >
                            view
                          </NextButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                );
              })}
          </FlexContainer>
        )}
      </FlexContainer>
      <Modal
        size="3xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          setSelectedOrder({});
          onClose();
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Order Details
              </ModalHeader>
              <ModalBody className="pb-5">
                <FlexContainer variant="column-start" gap="sm">
                  {selectedOrder?.products?.map((item, index) => {
                    return (
                      <FlexContainer
                        key={index}
                        variant="row-between"
                        gap="sm"
                        className="border p-2 bg-zinc-100 rounded-2xl border-y"
                      >
                        <h3 className="font-semibold text-sm">
                          {item?.productName}
                        </h3>
                        <FlexContainer variant="row-end" gap="sm">
                          <span className="text-sm">
                            Quantity: {item.quantity}
                          </span>
                          <span className="text-sm">Price: ₹{item.price}</span>
                        </FlexContainer>
                      </FlexContainer>
                    );
                  })}
                  <FlexContainer variant="row-between" gap="sm">
                    <span className="font-semibold">Total Price</span>
                    <span>₹{selectedOrder?.totalPrice}</span>
                  </FlexContainer>
                </FlexContainer>
              </ModalBody>
              <ModalFooter>
                <NextButton colorScheme="flat" onPress={onClose}>
                  Close
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
