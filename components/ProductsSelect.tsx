import { IProduct, OrderFormValues, OrderItemData } from "@/handlers/types";
import { useProducts } from "@/hooks/products";
import { Button, List, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
const { Option } = Select;

const ProductsSelect = ({
  control,
  setValue,
}: {
  control: Control<any, any>;
  setValue: UseFormSetValue<OrderFormValues>;
}) => {
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const { products, loading } = useProducts();

  useEffect(() => {
    const orderItems: OrderItemData[] =
      selectedProducts?.length > 0
        ? selectedProducts?.map((p) => ({
            sku: p?.attributes?.sku,
            quantity: 1,
            external_id: p?.id,
            price: Number(p?.attributes?.price),
          }))
        : [];

    setValue("order_item_data", orderItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProducts]);

  return (
    <>
      <FormItem label="Product">
        <Controller
          name="order_item_data"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <Select
              className="w-full"
              placeholder="select a product"
              loading={loading}
              onChange={(value: string) => {
                if (value) {
                  setSelectedProducts([...selectedProducts, JSON.parse(value)]);
                }
              }}
            >
              <Option value="">Select a product</Option>
              {products?.data?.map((product: IProduct) => {
                if (
                  !selectedProducts?.find(
                    (sProduct) => sProduct?.id === product?.id
                  )
                ) {
                  return (
                    <Option key={product?.id} value={JSON.stringify(product)}>
                      {product?.attributes?.sku} - {product?.attributes?.name}
                    </Option>
                  );
                }
                return <></>;
              })}
            </Select>
          )}
        />
      </FormItem>
      <List
        header={<div>Added products</div>}
        bordered
        dataSource={selectedProducts}
        renderItem={(item) => (
          <List.Item>
            <Text>{item?.attributes?.name}</Text>
            <Button
              onClick={() => {
                const filtered = selectedProducts?.filter(
                  (sProduct) => sProduct?.id !== item?.id
                );
                setSelectedProducts(filtered);
              }}
            >
              remove
            </Button>
          </List.Item>
        )}
      />
    </>
  );
};
export default ProductsSelect;
