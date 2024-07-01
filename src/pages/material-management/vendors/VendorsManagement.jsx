import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";
import useGet from "../../../lib/hooks/get-api";

const API_URL = import.meta.env.VITE_SERVER_URL;

const VendorRows = [
  {
    name: "Georgiana Leipelt",
    email: "gleipelt0@pbs.org",
    phone: "+86-700-543-5606",
    address: "Suite 15",
    vendor_category: "laundry",
    isActive: false,
  },
  {
    name: "Malva Breeze",
    email: "mbreeze1@weather.com",
    phone: "+386-988-788-5488",
    address: "PO Box 58557",
    vendor_category: "kitchen",
    isActive: true,
  },
  {
    name: "Jaymee Pearcehouse",
    email: "jpearcehouse2@deviantart.com",
    phone: "+254-177-339-5679",
    address: "Apt 1623",
    vendor_category: "electronics",
    isActive: false,
  },
  {
    name: "Lonni Frankton",
    email: "lfrankton3@salon.com",
    phone: "+86-311-116-2678",
    address: "Apt 1644",
    vendor_category: "electronics",
    isActive: false,
  },
  {
    name: "Rickey Robbings",
    email: "rrobbings4@live.com",
    phone: "+7-431-187-5735",
    address: "Room 470",
    vendor_category: "house-keeping",
    isActive: false,
  },
  {
    name: "Nathan Pounsett",
    email: "npounsett5@tmall.com",
    phone: "+33-326-191-6479",
    address: "Suite 66",
    vendor_category: "kitchen",
    isActive: true,
  },
  {
    name: "Kipper Garr",
    email: "kgarr6@meetup.com",
    phone: "+81-916-811-0900",
    address: "11th Floor",
    vendor_category: "house-keeping",
    isActive: true,
  },
  {
    name: "Lainey Kielt",
    email: "lkielt7@vk.com",
    phone: "+254-841-407-2566",
    address: "Suite 9",
    vendor_category: "house-keeping",
    isActive: true,
  },
  {
    name: "Haily Vannucci",
    email: "hvannucci8@e-recht24.de",
    phone: "+86-334-870-6348",
    address: "Apt 1725",
    vendor_category: "house-keeping",
    isActive: true,
  },
  {
    name: "Estelle Richardeau",
    email: "erichardeau9@house.gov",
    phone: "+358-897-930-6030",
    address: "PO Box 57903",
    vendor_category: "house-keeping",
    isActive: true,
  },
  {
    name: "Claresta Orlton",
    email: "corltona@instagram.com",
    phone: "+86-352-158-2468",
    address: "Apt 1923",
    vendor_category: "kitchen",
    isActive: true,
  },
  {
    name: "Meryl Gommery",
    email: "mgommeryb@nasa.gov",
    phone: "+86-470-937-9695",
    address: "3rd Floor",
    vendor_category: "kitchen",
    isActive: true,
  },
  {
    name: "Jilly Willard",
    email: "jwillardc@eepurl.com",
    phone: "+420-763-396-3976",
    address: "PO Box 57396",
    vendor_category: "kitchen",
    isActive: true,
  },
  {
    name: "Keene Siggins",
    email: "ksigginsd@unesco.org",
    phone: "+86-418-567-9977",
    address: "Room 387",
    vendor_category: "kitchen",
    isActive: true,
  },
  {
    name: "Sherilyn Doubleday",
    email: "sdoubledaye@economist.com",
    phone: "+86-993-490-4373",
    address: "Suite 8",
    vendor_category: "electronics",
    isActive: true,
  },
  {
    name: "Craggie De Bischop",
    email: "cdef@istockphoto.com",
    phone: "+46-665-842-7875",
    address: "Suite 73",
    vendor_category: "electronics",
    isActive: false,
  },
  {
    name: "Kinna Arnoud",
    email: "karnoudg@google.cn",
    phone: "+86-156-408-1140",
    address: "Apt 1311",
    vendor_category: "house-keeping",
    isActive: false,
  },
  {
    name: "Dorris Chatten",
    email: "dchattenh@earthlink.net",
    phone: "+84-659-262-3416",
    address: "16th Floor",
    vendor_category: "house-keeping",
    isActive: false,
  },
  {
    name: "Nerte Espinas",
    email: "nespinasi@hibu.com",
    phone: "+54-134-202-1453",
    address: "Room 1889",
    vendor_category: "house-keeping",
    isActive: false,
  },
  {
    name: "Glory Doonican",
    email: "gdoonicanj@princeton.edu",
    phone: "+359-812-164-2102",
    address: "PO Box 35001",
    vendor_category: "electronics",
    isActive: false,
  },
];

const ItemRows = [
  {
    product_name: "Milk",
    main_category: "kitchen",
    category: "Dairy",
    measurement_unit: "Litre",
    unit: "1",
  },
  {
    product_name: "Eggs",
    main_category: "kitchen",
    category: "Dairy",
    measurement_unit: "Dozen",
    unit: "1",
  },
  {
    product_name: "Butter",
    main_category: "kitchen",
    category: "Dairy",
    measurement_unit: "Kg",
    unit: "1",
  },
  {
    product_name: "Cheese",
    main_category: "kitchen",
    category: "Dairy",
    measurement_unit: "Kg",
    unit: "1",
  },
  {
    product_name: "Yogurt",
    main_category: "kitchen",
    category: "Dairy",
    measurement_unit: "Litre",
    unit: "1",
  },
  {
    product_name: "Apples",
    main_category: "kitchen",
    category: "Fruits",
    measurement_unit: "Kg",
    unit: "1",
  },
  {
    product_name: "Bananas",
    main_category: "kitchen",
    category: "Fruits",
    measurement_unit: "Kg",
    unit: "1",
  },
  {
    product_name: "Oranges",
    main_category: "kitchen",
    category: "Fruits",
    measurement_unit: "Kg",
    unit: "1",
  },
  {
    product_name: "Tomatoes",
    main_category: "kitchen",
    category: "Vegetables",
    measurement_unit: "Kg",
    unit: "1",
  },
  {
    product_name: "Potatoes",
    main_category: "kitchen",
    category: "Vegetables",
    measurement_unit: "Kg",
    unit: "1",
  },
  {
    product_name: "Onions",
    main_category: "kitchen",
    category: "Vegetables",
    measurement_unit: "Kg",
    unit: "1",
  },
];

const PriceRows = [
  {
    vendor_name: "Amul India",
    product_name: "Milk",
    price: 50,
    currency: "INR",
  },
  {
    vendor_name: "Dabur",
    product_name: "Honey",
    price: 100,
    currency: "INR",
  },
  {
    vendor_name: "Amul India",
    product_name: "Butter",
    price: 200,
    currency: "INR",
  },
];

const VendorsManagement = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [data, setData] = useState(VendorRows);
  const navigate = useNavigate();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const {
    data: allVendorsData,
    error: allVendorsError,
    loading: allVendorsLoading,
    invalidateCache: invalidateAllVendorsCache,
    refresh: refreshAllVendorsData,
    getData: getAllVendorsData,
  } = useGet({ showToast: false });

  const {
    data: priceListData,
    error: priceListError,
    loading: priceListLoading,
    invalidateCache: invalidatePriceListCache,
    refresh: refreshPriceListData,
    getData: getPriceListData,
  } = useGet({ showToast: false });

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
    getAllVendorsData(`${API_URL}/getVendors`, "allVendors");
    getItemsData(`${API_URL}/getItems`, "items");
    getAllCategoriesData(
      `${API_URL}/getMinCategories?includeSubCategories=true`,
      "categories"
    );
    getPriceListData(`${API_URL}/getPriceLists`, "priceList");
  }, []);

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Vendors"}
        subheading={"List"}
        title={"All Vendors"}
        showButton={true}
        buttonHref={"add"}
        buttonText={"Vendor Config"}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Vendor List"
          isActiveTab={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Items List"
          isActiveTab={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
        <Tab
          title="Price list"
          isActiveTab={activeTab === 3}
          onClick={() => handleTabClick(3)}
        />
      </FlexContainer>
      {activeTab === 1 && (
        <VendorList data={allVendorsData} isLoading={allVendorsLoading} />
      )}
      {activeTab === 2 && (
        <ItemList
          data={itemsData}
          isLoading={itemsLoading}
          categories={AllCategoriesData}
        />
      )}
      {activeTab === 3 && (
        <PriceList data={priceListData} isLoading={priceListLoading} />
      )}
    </FlexContainer>
  );
};

const VendorList = ({ data, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Table aria-label="Vendors List">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Phone</TableColumn>
        <TableColumn>Address</TableColumn>
        <TableColumn>Vendor Category</TableColumn>
        <TableColumn>Status</TableColumn>
        {/* <TableColumn>Edit</TableColumn> */}
        <TableColumn>Terminate</TableColumn>
      </TableHeader>
      <TableBody>
        {!isLoading &&
          data?.map((item, i) => {
            return (
              <TableRow key={item?.uniqueId}>
                <TableCell>{item?.vendorName}</TableCell>
                <TableCell>{item?.vendorEmail}</TableCell>
                <TableCell>{item?.vendorPhoneNumber}</TableCell>
                <TableCell>{item?.vendorAddress}</TableCell>
                <TableCell>{item?.vendorStatus}</TableCell>
                <TableCell>
                  {item.vendorStatus == "true" ? (
                    <span className="text-green-500">Active</span>
                  ) : (
                    <span className="text-red-500">Inactive</span>
                  )}
                </TableCell>
                {/* <TableCell>
                  <NextButton
                    isIcon
                    onClick={() => navigate("edit", { state: item })}
                  >
                    <Pencil className="w-4 h-4" />
                  </NextButton>
                </TableCell> */}
                <TableCell>
                  <NextButton isIcon colorScheme="error">
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

const ItemList = ({ data, isLoading, categories }) => {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Table aria-label="Vendors List">
      <TableHeader>
        <TableColumn>Product Name</TableColumn>
        <TableColumn>Main Category</TableColumn>
        <TableColumn>Category</TableColumn>
        <TableColumn>Measurement Unit</TableColumn>
        <TableColumn>Unit</TableColumn>
        <TableColumn>Status</TableColumn>
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
                <TableCell>{item?.measurementUnit}</TableCell>
                <TableCell>{item?.weight}</TableCell>
                <TableCell>
                  <span className="text-green-500">Active</span>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

const PriceList = ({ data, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Table aria-label="Vendors List">
      <TableHeader>
        <TableColumn>Vendor Name</TableColumn>
        <TableColumn>Product Name</TableColumn>
        <TableColumn>Currency</TableColumn>
        <TableColumn>Price</TableColumn>
        {/* <TableColumn>Status</TableColumn> */}
        {/* <TableColumn>Edit</TableColumn> */}
        {/* <TableColumn>Delete</TableColumn> */}
      </TableHeader>
      <TableBody>
        {!isLoading &&
          data.map((item, i) => {
            return (
              <TableRow key={item?.uniqueId}>
                <TableCell>{item?.vendorName}</TableCell>
                <TableCell>{item?.itemName}</TableCell>
                <TableCell>INR</TableCell>
                <TableCell>{item.price}</TableCell>
                {/* <TableCell>
                <span className="text-green-500">Active</span>
              </TableCell> */}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default VendorsManagement;
