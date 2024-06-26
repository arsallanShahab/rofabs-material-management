import * as Yup from "yup";

export const AddVendorsValidation = Yup.object().shape({
  name: Yup.string().required("Please enter name"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter email"),
  phone: Yup.number()
    .min(10, "Please enter a valid phone number")
    .required("Please enter phone number"),
  address: Yup.string().required("Please enter address"),
  vendor_category: Yup.string().required("Please select vendor category"),
});
