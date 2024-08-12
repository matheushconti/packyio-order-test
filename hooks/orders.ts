import { getOrders } from "@/app/actions/get-orders";
import { IOrderResponse } from "@/handlers/types";
import { useEffect, useState } from "react";

export const useOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<IOrderResponse>();
  const [errors, setErrors] = useState<string[]>([]);
  const getData = async () => {
    try {
      setLoading(true);
      const request = await getOrders();
      setOrders(request);
    } catch (error: any) {
      setErrors(error?.message || "Unable to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { errors, orders, loading };
};
