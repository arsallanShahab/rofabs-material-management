import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import Loader from "../../../components/micro/Loader";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";
import useGet from "../../../lib/hooks/get-api";

const API_URL = import.meta.env.VITE_SERVER_URL;

const ManageItems = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const {
    data: itemsData,
    error: itemsError,
    loading: itemsLoading,
    invalidateCache: invalidateItemsCache,
    refresh: refreshItemsData,
    getData: getItemsData,
  } = useGet({ showToast: false });
  const {
    data: AllCategoriesData,
    error: AllCategoriesError,
    loading: AllCategoriesLoading,
    invalidateCache: invalidateAllCategoriesCache,
    refresh: refreshAllCategories,
    getData: getAllCategoriesData,
  } = useGet({ showToast: false });
  useEffect(() => {
    getAllCategoriesData(
      `${API_URL}/getMinCategories?includeSubCategories=true`,
      "categories"
    );
    if (activeTab === 1) {
      getItemsData(`${API_URL}/getItems`, "items");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Items"}
        subheading={"List"}
        title={"Manage Items"}
        // showButton={true}
        // buttonHref={"create"}
        // buttonText={"Add Item"}
      />
      <ItemList
        data={itemsData}
        isLoading={itemsLoading}
        categories={AllCategoriesData}
        invalidateCache={invalidateItemsCache}
        refresh={refreshItemsData}
      />
    </FlexContainer>
  );
};

const ItemList = ({
  data,
  isLoading,
  categories,
  invalidateCache,
  refresh,
}) => {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Table aria-label="items list">
      <TableHeader>
        <TableColumn>Product Name</TableColumn>
        <TableColumn>Main Category</TableColumn>
        <TableColumn>Category</TableColumn>
        <TableColumn>Quantity</TableColumn>
        <TableColumn>No&apos;s</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Action</TableColumn>
        {/* <TableColumn>Edit</TableColumn> */}
        {/* <TableColumn>Delete</TableColumn> */}
      </TableHeader>
      <TableBody>
        {!isLoading &&
          data?.map((item, i) => {
            const mainCategory = categories?.find((cat) => {
              return cat?.uniqueId == item?.mainCategory;
            });
            const subCategory = mainCategory?.subCategories?.find((cat) => {
              return cat?.uniqueId == item?.subCategory;
            });
            return (
              <TableRow key={item?.uniqueId}>
                <TableCell>{item?.productName}</TableCell>
                <TableCell>{mainCategory?.name}</TableCell>
                <TableCell>{subCategory?.name}</TableCell>
                <TableCell>{item?.weight} kg</TableCell>
                <TableCell>X 20</TableCell>
                <TableCell>
                  <span className="text-green-500">Active</span>
                </TableCell>
                <TableCell>
                  <NextButton
                    isIcon
                    colorScheme="error"
                    onClick={async () => {
                      if (!item.uniqueId) {
                        return toast.error("Item not found");
                      }
                      try {
                        const res = await axios.delete(
                          `${API_URL}/deleteItem?uniqueId=${item?.uniqueId}`
                        );
                        toast.success(
                          res?.data?.message || "Item deleted successfully"
                        );
                        invalidateCache("items");
                        refresh();
                      } catch (error) {
                        toast.error(
                          error?.response?.data?.error || "Something went wrong"
                        );
                      }
                    }}
                  >
                    <Trash className="w-4 h-4" />
                  </NextButton>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default ManageItems;
