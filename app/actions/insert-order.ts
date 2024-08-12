"use server";

import { IOrderRequest, OrderFormValues } from "@/handlers/types";
import { redirect } from "next/navigation";

export const insertOrder = async (dataOrder: OrderFormValues) => {
  try {
    const { customer, ...newObj } = dataOrder;

    const bodyData: IOrderRequest = {
      data: {
        type: "orders",
        attributes: { ...newObj },
        relationships: {
          customer: {
            data: {
              type: "customers",
              id: customer,
            },
          },
        },
      },
    };
    const response = await fetch(`${process.env.API_BASE_URL}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${process.env.API_TOKEN || ""}`,
      },
      body: JSON.stringify(bodyData),
    });
    const result = await response.json();
    if (!result.errors) {
      redirect("/orders");
    } else {
      return result;
    }
  } catch (e: any) {
    return {};
  }
};
