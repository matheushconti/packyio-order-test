import { Button, Checkbox, Col, Input, Row } from "antd";
import CustomersSelect from "../CustomersSelect";
import FormItem from "antd/lib/form/FormItem";
import { Control, Controller, FieldErrors } from "react-hook-form";
import TextArea from "antd/lib/input/TextArea";
import { OrderFormValues } from "@/handlers/types";

interface IGeneralInformation {
  control: Control<OrderFormValues, any>;
  errors: FieldErrors<OrderFormValues>;
  onNext: () => void;
}

const GeneralInformation = ({
  control,
  errors,
  onNext,
}: IGeneralInformation) => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <div>
            <CustomersSelect control={control} errors={errors} />
          </div>
          <div>
            <FormItem
              label="Number"
              extra={
                errors?.number && (
                  <p className="text-red-600 text-xs">
                    {errors?.number?.message}
                  </p>
                )
              }
            >
              <Controller
                name="number"
                defaultValue=""
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </FormItem>
          </div>
          <div className="pt-4">
            <Row gutter={12}>
              <Col span={12}>
                <FormItem valuePropName="checked">
                  <Controller
                    name="address_hold"
                    defaultValue={0}
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field}>Address Hold</Checkbox>
                    )}
                  />
                </FormItem>
                <FormItem valuePropName="checked">
                  <Controller
                    name="fraud_hold"
                    defaultValue={0}
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field}>Fraud Hold</Checkbox>
                    )}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem valuePropName="checked">
                  <Controller
                    name="operator_hold"
                    defaultValue={0}
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field}>Operator Hold</Checkbox>
                    )}
                  />
                </FormItem>
                <FormItem valuePropName="checked">
                  <Controller
                    name="payment_hold"
                    defaultValue={0}
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field}>Payment Hold</Checkbox>
                    )}
                  />
                </FormItem>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={12}>
          <FormItem label="Packing Note">
            <Controller
              name="packing_note"
              defaultValue=""
              control={control}
              render={({ field }) => <TextArea rows={4} {...field} />}
            />
          </FormItem>
        </Col>
      </Row>
      <Button onClick={onNext}>Next</Button>
    </>
  );
};

export default GeneralInformation;
