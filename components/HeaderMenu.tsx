"use client";
import { Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HeaderMenu = () => {
  const router = useRouter();
  const items: ItemType<MenuItemType>[] = [
    {
      key: 0,
      label: (
        <Link href="/products" prefetch>
          Products
        </Link>
      ),
    },
    {
      key: 1,
      label: (
        <Link href="/orders" prefetch>
          Orders
        </Link>
      ),
    },
  ];

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      items={items}
      className="flex-1 min-w-0"
    />
  );
};
export default HeaderMenu;
