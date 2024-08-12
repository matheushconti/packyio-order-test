"use client";
import { IOrder } from "@/handlers/types";
import { useOrders } from "@/hooks/orders";
import { Button, Table } from "antd";
import Title from "antd/lib/typography/Title";
import { format } from "date-fns";
import Link from "next/link";

export default function Orders() {
  const { orders, loading } = useOrders();

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (a: IOrder, b: IOrder) => Number(a?.id) - Number(b?.id),
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (_: string, record: IOrder) => (
        <Link
          href={record?.links?.self || "#"}
          target="_blank"
          prefetch={false}
        >
          {record?.attributes?.number || ""}
        </Link>
      ),
      sorter: (a: IOrder, b: IOrder) =>
        Number(a?.attributes?.number) - Number(b?.attributes?.number),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (_: string, record: IOrder) => (
        <Link
          href={record?.relationships?.customer?.links?.self || "#"}
          target="_blank"
          prefetch={false}
        >
          {record?.relationships?.customer?.data?.id || ""}
        </Link>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: string, record: IOrder) =>
        record?.attributes?.status_text || "",
      sorter: (a: IOrder, b: IOrder) =>
        a?.attributes?.status_text?.localeCompare(b?.attributes?.status_text),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_: string, record: IOrder) =>
        format(
          new Date(record?.attributes?.updated_at || ""),
          "yyyy-MM-dd HH:mm:ss"
        ),
      sorter: (a: IOrder, b: IOrder) =>
        a?.attributes?.updated_at?.localeCompare(b?.attributes?.updated_at),
    },
  ];

  return (
    <>
      <div className="flex justify-between p-3 pb-0">
        <Title level={4}>Orders</Title>
        <Link href={"/orders/create"}>
          <Button>Create Order</Button>
        </Link>
      </div>
      <Table
        dataSource={orders?.data || []}
        columns={columns}
        loading={loading}
      />
    </>
  );
}
