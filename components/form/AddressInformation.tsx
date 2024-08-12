import { Button, Col, Input, Row } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { OrderFormValues } from "@/handlers/types";

interface IAddressInformation {
  control: Control<OrderFormValues, any>;
  errors: FieldErrors<OrderFormValues>;
  onNext: () => void;
}

const AddressInformation = ({
  control,
  errors,
  onNext,
}: IAddressInformation) => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <FormItem label="Name">
            <Controller
              name="shipping_contact_information_data.name"
              defaultValue=""
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormItem>
          <FormItem label="Address">
            <Controller
              name="shipping_contact_information_data.address"
              defaultValue=""
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormItem>
          <FormItem label="Zip">
            <Controller
              name="shipping_contact_information_data.zip"
              defaultValue=""
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormItem>
          <FormItem label="State">
            <Controller
              name="shipping_contact_information_data.state"
              defaultValue=""
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormItem>
          <FormItem label="Contact Email">
            <Controller
              name="shipping_contact_information_data.email"
              defaultValue=""
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormItem>
          <FormItem label="Company Number">
            <Controller
              name="shipping_contact_information_data.company_number"
              defaultValue=""
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="Company Name">
            <Controller
              name="shipping_contact_information_data.company_name"
              defaultValue=""
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormItem>
          <FormItem label="Address 2">
            <Controller
              name="shipping_contact_information_data.address2"
              defaultValue=""
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormItem>
          <FormItem label="City">
            <Controller
              name="shipping_contact_information_data.city"
              defaultValue=""
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormItem>
          <FormItem label="Country">
            <Controller
              name="shipping_contact_information_data.country"
              defaultValue=""
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormItem>
          <FormItem label="Phone">
            <Controller
              name="shipping_contact_information_data.phone"
              defaultValue=""
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormItem>
        </Col>
      </Row>
      <Button onClick={onNext}>Next</Button>
    </>
  );
};

export default AddressInformation;
