import * as yup from "yup";
export const orderValidationSchema = yup
  .object()
  .shape({
    order_item_data: yup.array().required("Please add at least one product"),
    customer: yup.string().required().label("Customer"),
    number: yup.string().required().label("Number"),
  })
  .required();
