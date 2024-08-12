"use client";
import { insertOrder } from "@/app/actions/insert-order";
import CustomersSelect from "@/components/CustomersSelect";
import ProductsSelect from "@/components/ProductsSelect";
import { OrderFormValues } from "@/handlers/types";
import { Button, Checkbox, Col, Form, Input, Row, Spin, Tabs } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/typography/Title";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { orderValidationSchema } from "@/handlers/validator";
import GeneralInformation from "@/components/form/GeneralInformation";
import AddressInformation from "@/components/form/AddressInformation";

type ActiveTabType = "general" | "address" | "products";

export default function OrdersCreate() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>("general");
  const {
    setValue,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: yupResolver(orderValidationSchema) as unknown as Resolver<
      OrderFormValues,
      any
    >,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<OrderFormValues> = async (data) => {
    try {
      setLoading(true);
      const response = await insertOrder(data);
      if (response?.errors) {
        alert(response?.errors?.[0]?.detail);
      } else {
        router.push("/orders");
      }
    } catch (e) {
      console.error("e", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 px-8">
      <Title level={5}>Create Order</Title>
      {loading ? (
        <Spin />
      ) : (
        <Form onSubmitCapture={handleSubmit(onSubmit)} layout={"vertical"}>
          <Tabs
            defaultActiveKey={"general"}
            activeKey={activeTab}
            onChange={(k) => {
              setActiveTab(k as ActiveTabType);
            }}
            items={[
              {
                label: "General Information",
                key: "general",
                children: (
                  <GeneralInformation
                    control={control}
                    errors={errors}
                    onNext={() => {
                      trigger(["number", "customer"], {
                        shouldFocus: true,
                      }).then((result) => {
                        console.log("result", result);
                        if (result) {
                          setActiveTab("address");
                        }
                      });
                    }}
                  />
                ),
              },
              {
                label: "Address Information",
                key: "address",
                children: (
                  <AddressInformation
                    control={control}
                    errors={errors}
                    onNext={() => setActiveTab("products")}
                  />
                ),
              },
              {
                label: "Order Details",
                key: "products",
                children: (
                  <>
                    <Row>
                      <Col span={24}>
                        <ProductsSelect control={control} setValue={setValue} />
                        {errors?.order_item_data && (
                          <p className="text-red-600 text-xs">
                            {errors?.order_item_data?.message}
                          </p>
                        )}
                      </Col>
                    </Row>
                    <Button htmlType="submit">Submit</Button>
                  </>
                ),
              },
            ]}
          />
        </Form>
      )}
    </div>
  );
}
