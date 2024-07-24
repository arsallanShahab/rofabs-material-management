import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import FlexContainer from "./components/layout/FlexContainer";
import Layout from "./components/layout/Layout";
import PrivateRoutes from "./middleware/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  VerifyEmail,
} from "./pages/auth";
import BanquetManagement from "./pages/banquet-management/BanquetManagement";
import ManageBookings from "./pages/banquet-management/ManageBookings";
import CreateDecorationPlans from "./pages/banquet-management/decoration-plans/CreateDecorationPlans";
import ManageDecorationPlans from "./pages/banquet-management/decoration-plans/ManageDecorationPlans";
import CreateFoodPlans from "./pages/banquet-management/food-plans/CreateFoodPlans";
import ManageFoodPlans from "./pages/banquet-management/food-plans/ManageFoodPlans";
import ManageHalls from "./pages/banquet-management/halls/ManageHalls";
import CreateDutyRoaster from "./pages/duty-roaster-management/CreateDutyRoaster";
import DutyRoasterManagement from "./pages/duty-roaster-management/DutyRoasterManagement";
import {
  EmployeeManagement,
  ManageDesignation,
} from "./pages/employee-management";
import { CreateOrder, Inventory } from "./pages/ksr";
import KsrConfig from "./pages/ksr/config/Config";
import MenuConfig from "./pages/ksr/config/MenuConfig";
import RestrauntConfig from "./pages/ksr/config/RestrauntConfig";
import TaxConfig from "./pages/ksr/config/TaxConfig";
import MaterialManagement from "./pages/material-management/MaterialManagement";
import MiscellaneousManagement from "./pages/material-management/MiscellaneousManagement";
import AddSubCategories from "./pages/material-management/categories/AddSubCategories";
import MaterialCategories from "./pages/material-management/categories/MaterialCategories";
import {
  AddElectronicsManagement,
  ElectronicManagement,
} from "./pages/material-management/electronics";
import {
  AddHouseKeepingManagement,
  HouseKeepingManagement,
} from "./pages/material-management/house-keeping";
// import AddInventory from "./pages/material-management/inventory/AddInventory";
import ManageConfigs from "./pages/banquet-management/ManageConfigs";
import DutyRoasterConfig from "./pages/duty-roaster-management/DutyRoasterConfig";
import InHouseInventory from "./pages/material-management/in-house/InHouseInventory";
import CreateItems from "./pages/material-management/items/CreateItems";
import ManageItems from "./pages/material-management/items/ManageItems";
import {
  AddKitchenManagement,
  KitchenManagement,
} from "./pages/material-management/kitchen";
import {
  AddLaundryManagement,
  LaundryManagement,
} from "./pages/material-management/laundry";
import ConfigLaundry from "./pages/material-management/laundry/ConfigLaundry";
import CreatePurchaseOrder from "./pages/material-management/purchase/CreatePurchaseOrder";
import ManagePurchaseOrder from "./pages/material-management/purchase/ManagePurchaseOrder";
import {
  AddVendor,
  EditVendor,
  VendorsManagement,
} from "./pages/material-management/vendors";
import AddItems from "./pages/material-management/vendors/AddItems";
import VendorDetails from "./pages/material-management/vendors/VendorDetails";
import CreatePayment from "./pages/payroll-management/CreatePayment";
import PayrollManagement from "./pages/payroll-management/PayrollManagement";
import { AddProperty, EditProperty, ListProperty } from "./pages/property";
import { ChangePassword, Profile } from "./pages/user";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="property">
            <Route index element={<ListProperty />} />
            <Route path="add" element={<AddProperty />} />
            <Route path="edit">
              <Route path=":id" element={<EditProperty />} />
            </Route>
          </Route>
          <Route path="ksr">
            <Route path="config">
              <Route index element={<KsrConfig />} />
              <Route path="restaurant" element={<RestrauntConfig />} />
              <Route path="menu" element={<MenuConfig />} />
              <Route path="tax" element={<TaxConfig />} />
            </Route>
            <Route path="inventory" element={<Inventory />} />
            <Route path="create-order" element={<CreateOrder />} />
          </Route>
          <Route path="material-management">
            <Route index element={<MaterialManagement />} />
            <Route path="items">
              <Route index element={<ManageItems />} />
              <Route path="create" element={<CreateItems />} />
            </Route>
            <Route path="categories">
              <Route index element={<MaterialCategories />} />
              <Route path="sub-categories/add" element={<AddSubCategories />} />
            </Route>
            <Route path="inventory">
              <Route index element={<ManagePurchaseOrder />} />
              <Route path="in-house" element={<InHouseInventory />} />
              <Route path="purchase-order">
                <Route path="create" element={<CreatePurchaseOrder />} />
              </Route>
            </Route>
            <Route path="house-keeping">
              <Route index element={<HouseKeepingManagement />} />
              <Route path="add" element={<AddHouseKeepingManagement />} />
            </Route>
            <Route path="kitchen">
              <Route index element={<KitchenManagement />} />
              <Route path="add" element={<AddKitchenManagement />} />
            </Route>
            <Route path="laundry">
              <Route index element={<LaundryManagement />} />
              <Route path="add" element={<AddLaundryManagement />} />
              <Route path="config" element={<ConfigLaundry />} />
            </Route>
            <Route path="electronics">
              <Route index element={<ElectronicManagement />} />
              <Route path="add" element={<AddElectronicsManagement />} />
            </Route>
            <Route path="miscellaneous" element={<MiscellaneousManagement />} />
          </Route>
          <Route path="vendors">
            <Route index element={<VendorsManagement />} />
            <Route path="add">
              <Route index element={<AddVendor />} />
              <Route path="items" element={<AddItems />} />
            </Route>
            <Route path="edit" element={<EditVendor />} />
            <Route path="details">
              <Route path=":id" element={<VendorDetails />} />
            </Route>
          </Route>
          <Route path="employee">
            <Route path="manage" element={<EmployeeManagement />} />
            <Route path="designation" element={<ManageDesignation />} />
            {/* <Route path="edit">
              <Route path=":id" element={<EditProperty />} />
            </Route> */}
          </Route>
          <Route path="payroll">
            <Route index element={<PayrollManagement />} />
            <Route path="create" element={<CreatePayment />} />
            {/* <Route path="edit">
              <Route path=":id" element={<EditProperty />} />
            </Route> */}
          </Route>
          <Route path="banquet">
            <Route index element={<BanquetManagement />} />
            <Route path="bookings" element={<ManageBookings />} />
            <Route path="manage">
              <Route path="configs" element={<ManageConfigs />} />
              <Route path="halls" element={<ManageHalls />} />
              <Route path="food-plans">
                <Route index element={<ManageFoodPlans />} />
                <Route path="create" element={<CreateFoodPlans />} />
              </Route>
              <Route path="decoration-plans">
                <Route index element={<ManageDecorationPlans />} />
                <Route path="create" element={<CreateDecorationPlans />} />
              </Route>
            </Route>
          </Route>
          <Route path="duty-roaster">
            <Route path="manage" element={<DutyRoasterManagement />} />
            <Route path="create" element={<CreateDutyRoaster />} />
            <Route path="config" element={<DutyRoasterConfig />} />
          </Route>
        </Route>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route
          path="/reset-password/:token"
          exact
          element={<ResetPassword />}
        />
        <Route path="/forgot-password" exact element={<ForgotPassword />} />
        <Route path="/verify/:token" exact element={<VerifyEmail />} />
        <Route element={<PrivateRoutes />}>
          {/* <Route
            path="/dashboard"
            exact
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          /> */}
        </Route>
        {/* not found */}
        <Route
          path="*"
          element={
            <FlexContainer
              variant="column-center"
              className="h-screen bg-amber-50"
            >
              <h1 className="text-5xl text-indigo-600 font-medium">
                404 | Not Found
              </h1>
              <p className="text-lg text-indigo-600 font-medium max-w-sm text-center">
                The page you are looking for does not exist or has been moved.
              </p>
            </FlexContainer>
          }
        />
      </Routes>
    </NextUIProvider>
  );
};

export default App;
