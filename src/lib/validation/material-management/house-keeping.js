import * as Yup from "yup";

export const AddHouseKeepingInwardValidation = Yup.object().shape({
  productName: Yup.string().required("Please enter product name"),
  quantity: Yup.number().required("Please enter quantity"),
  price: Yup.number().required("Please enter price"),
  purchaseDate: Yup.date().required("Please enter purchase date"),
  vendorName: Yup.string().required("Please enter vendor"),
  expiryDate: Yup.date().required("Please enter expiry date"),
});

export const AddHouseKeepingUtilizationValidation = Yup.object().shape({
  productName: Yup.string().required("Please enter product name"),
  quantity: Yup.number().required("Please enter quantity"),
  utilizationDate: Yup.date().required("Please enter utilization date"),
  roomNo: Yup.number()
    .moreThan(0, "Please enter room number")
    .required("Please enter room number"),
});
