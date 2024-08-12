"use client";
import ImageFallback from "@/components/ImageFallback";
import { IProduct } from "@/handlers/types";
import { useProducts } from "@/hooks/products";
import Title from "antd/lib/typography/Title";
import { Table } from "antd";
import Link from "next/link";

export default function Home() {
  const { products, loading } = useProducts();
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (a: IProduct, b: IProduct) => Number(a?.id) - Number(b?.id),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_: string, record: IProduct) => (
        <ImageFallback
          width={100}
          height={100}
          className="w-10 h-10 rounded-xl"
          src={record?.relationships?.product_images?.links?.self || ""}
          alt={record?.attributes?.name || ""}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: IProduct) => (
        <Link
          href={record?.links?.self || "#"}
          target="_blank"
          prefetch={false}
        >
          {record?.attributes?.name || ""}
        </Link>
      ),
      sorter: (a: IProduct, b: IProduct) =>
        a?.attributes?.name?.localeCompare(b?.attributes?.name),
    },
    {
      title: "SKU",
      dataIndex: "SKU",
      key: "SKU",
      render: (_: string, record: IProduct) => (
        <Link
          href={record?.links?.self || "#"}
          target="_blank"
          prefetch={false}
        >
          {record?.attributes?.sku || ""}
        </Link>
      ),
      sorter: (a: IProduct, b: IProduct) =>
        Number(a?.attributes?.sku) - Number(b?.attributes?.sku),
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      sorter: (a: IProduct, b: IProduct) => Number(a?.id) - Number(b?.id),
      render: (_: string, record: IProduct) =>
        record?.attributes?.weight || "0",
    },
  ];

  return (
    <>
      <div className="flex justify-between p-3 pb-0">
        <Title level={4}>Products</Title>
      </div>
      <Table
        dataSource={products?.data || []}
        columns={columns}
        loading={loading}
      />
    </>
  );
}
