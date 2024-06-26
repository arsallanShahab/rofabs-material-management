import * as Yup from "yup";

export const AddLaundryInwardValidation = Yup.object().shape({
  itemName: Yup.string().required("Please enter item name"),
  quantity: Yup.number().required("Please enter quantity"),
  inDate: Yup.date().required("Please enter in date"),
  vendorName: Yup.string().required("Please enter vendor name"),
});

export const AddLaundryOutwardValidation = Yup.object().shape({
  outDate: Yup.date().required("Please enter out date"),
  vendorName: Yup.string().required("Please enter vendor name"),
});

export const AddLaundryCostManagementValidation = Yup.object().shape({
  itemName: Yup.string().required("Please enter item name"),
  perPieceCost: Yup.number()
    .moreThan(0, "Quantity should be more than 0")
    .required("Please enter per piece cost"),
  deliveryTimeline: Yup.string().required("Please enter delivery timeline"),
});
