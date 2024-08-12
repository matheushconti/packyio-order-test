import { getCustomers } from "@/app/actions/get-customers";
import { IProductResponse } from "@/handlers/types";
import { useEffect, useState } from "react";

export const useCustomers = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<any>();
  const [errors, setErrors] = useState<string[]>([]);
  const getData = async () => {
    try {
      setLoading(true);
      const request = await getCustomers();
      setCustomers(request);
    } catch (error: any) {
      setErrors(error?.message || "Unable to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { errors, customers, loading };
};
