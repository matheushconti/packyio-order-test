"use server";

export const getOrders = async () => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN || ""}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (e: any) {
    return {};
  }
};
