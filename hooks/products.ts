import { getProducts } from "@/app/actions/get-products";
import { IProductResponse } from "@/handlers/types";
import { useEffect, useState } from "react";

export const useProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<IProductResponse>();
  const [errors, setErrors] = useState<string[]>([]);
  const getData = async () => {
    try {
      setLoading(true);
      const request = await getProducts();
      setProducts(request);
    } catch (error: any) {
      setErrors(error?.message || "Unable to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { errors, products, loading };
};
