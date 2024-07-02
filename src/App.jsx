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
import CreateEstimate from "./pages/banquet-management/CreateEstimate";
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
import MaterialCategories from "./pages/material-management/categories/MaterialCategories";
import {
  AddElectronicsManagement,
  ElectronicManagement,
} from "./pages/material-management/electronics";
import {
  AddHouseKeepingManagement,
  HouseKeepingManagement,
} from "./pages/material-management/house-keeping";
import AddInventory from "./pages/material-management/inventory/AddInventory";
import {
  AddKitchenManagement,
  KitchenManagement,
} from "./pages/material-management/kitchen";
import {
  AddLaundryManagement,
  LaundryManagement,
} from "./pages/material-management/laundry";
import {
  AddVendor,
  EditVendor,
  VendorsManagement,
} from "./pages/material-management/vendors";
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
            <Route path="categories" element={<MaterialCategories />} />
            <Route path="inventory" element={<AddInventory />} />
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
            </Route>
            <Route path="electronics">
              <Route index element={<ElectronicManagement />} />
              <Route path="add" element={<AddElectronicsManagement />} />
            </Route>
            <Route path="vendors">
              <Route index element={<VendorsManagement />} />
              <Route path="add" element={<AddVendor />} />
              <Route path="edit" element={<EditVendor />} />
            </Route>
            <Route path="miscellaneous" element={<MiscellaneousManagement />} />
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
            <Route path="manage" element={<BanquetManagement />} />
            <Route path="create-estimate" element={<CreateEstimate />} />
          </Route>
          <Route path="duty-roaster">
            <Route path="manage" element={<DutyRoasterManagement />} />
            <Route path="create" element={<CreateDutyRoaster />} />
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
