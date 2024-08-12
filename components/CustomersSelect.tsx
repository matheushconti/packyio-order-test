import { OrderFormValues } from "@/handlers/types";
import { useCustomers } from "@/hooks/customers";
import { Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { Control, Controller, FieldErrors } from "react-hook-form";
const { Option } = Select;

const CustomersSelect = ({
  control,
  errors,
}: {
  control: Control<any, any>;
  errors: FieldErrors<OrderFormValues>;
}) => {
  const { customers, loading } = useCustomers();
  return (
    <FormItem
      name="customer"
      label="Customer"
      extra={
        errors?.customer && (
          <p className="text-red-600 text-xs">{errors?.customer?.message}</p>
        )
      }
    >
      <Controller
        name="customer"
        defaultValue=""
        control={control}
        render={({ field }) => (
          <Select
            className="w-full"
            placeholder="select a customer"
            loading={loading}
            {...field}
          >
            <Option value="">Select a customer</Option>
            {customers?.data?.map((customer: any) => {
              const customer_info = customers?.included?.find(
                (include: any) =>
                  include?.type === "contact-informations" &&
                  include?.id ===
                    customer?.relationships?.contact_information?.data?.id
              );

              return (
                <Option key={customer?.id} value={customer?.id}>
                  {customer_info?.attributes?.name}
                </Option>
              );
            })}
          </Select>
        )}
      />
    </FormItem>
  );
};
export default CustomersSelect;
