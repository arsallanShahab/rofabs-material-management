import * as Yup from "yup";

export const addEmployeeSchema = Yup.object().shape({
  employeeId: Yup.string().required("Employee ID is required"),
  name: Yup.string().required("Employee Name is required"),
  doj: Yup.string().required("Date of Joining is required"),
  designation: Yup.string().required("Designation is required"),
  phone: Yup.string().required("Phone Number is required"),
  address: Yup.string().required("Address is required"),
  documents: Yup.string().required("Documents is required"),
});
