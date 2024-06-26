import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("please enter title"),
  currency: Yup.string().required("please select currency"),
  timezone: Yup.string().required("please select timezone"),
  property_type: Yup.string().required("please select property type"),
  email: Yup.string().required("please enter email"),
  country_code: Yup.string().required("please enter country code"),
  address: Yup.string().required("please enter address"),
  state_length: Yup.number("Shoud be number")
    .min(100, "should be greater than 100")
    .max(730, "should be less than 730")
    .required("please enter state length"),
});
