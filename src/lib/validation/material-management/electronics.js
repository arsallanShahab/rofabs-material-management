import * as Yup from "yup";

export const AddElectronicsPurchaseOrderValidation = Yup.object().shape({
  productName: Yup.string().required("Please enter product name"),
  quantity: Yup.number()
    .moreThan(0, "Please enter quantity greater than 0")
    .required("Please enter quantity"),
  price: Yup.number()
    .moreThan(0, "Please enter price greater than 0")
    .required("Please enter price"),
  vendorName: Yup.string().required("Please enter vendor"),
  purchaseDate: Yup.date().required("Please enter purchase date"),
});

export const AddElectronicsUtilizationValidation = Yup.object().shape({
  roomNo: Yup.number()
    .moreThan(0, "Please enter room number")
    .required("Please enter room number"),
  productName: Yup.string().required("Please enter product name"),
  quantity: Yup.number()
    .moreThan(0, "Please enter quantity greater than 0")
    .required("Please enter quantity"),
  dateOfInstallation: Yup.date().required("Please enter date of installation"),
  miscellaneous: Yup.string().required("Please enter miscellaneous"),
  damages: Yup.boolean(),
  damageDescription: Yup.string().when("damages", {
    is: true,
    then: Yup.string().required("Please enter damage description"),
  }),
  damageAmount: Yup.number().when("damages", {
    is: true,
    then: Yup.number().required("Please enter damage amount"),
  }),
});
