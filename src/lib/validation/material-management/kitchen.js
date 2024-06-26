import * as Yup from "yup";

// kitchen Management
//    inward
// 	product name
// 	quantity
// 	price
// 	purchase date
// 	vendor
// 	expiryDate
//    outward
// 	product name
// 	quantity
// 	utilization date
// 	auhtorised by
// 	orderId - tooltip - room number and dish name

export const AddKitchenManagementInwardValidation = Yup.object().shape({
  productName: Yup.string().required("Please enter product name"),
  quantity: Yup.number().required("Please enter quantity"),
  price: Yup.number().required("Please enter price"),
  purchaseDate: Yup.date().required("Please enter purchase date"),
  vendorName: Yup.string().required("Please enter vendor name"),
  expiryDate: Yup.date().required("Please enter expiry date"),
});

export const AddKitchenManagementOutwardValidation = Yup.object().shape({
  productName: Yup.string().required("Please enter product name"),
  quantity: Yup.number().required("Please enter quantity"),
  utilizationDate: Yup.date().required("Please enter utilization date"),
  authorizedBy: Yup.string().required("Please enter authorized by"),
  roomNumber: Yup.string().required("Please enter room number"),
  utilizationType: Yup.string().required("Please enter utilization type"),
});

// Path: client/src/lib/validation/material-management/vendor.js
