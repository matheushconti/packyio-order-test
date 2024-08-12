export interface IResponse<ResponseType, IncludedType> {
  meta: {
    page: {
      currentPage: number;
      from: number;
      lastPage: number;
      perPage: number;
      to: number;
      total: number;
    };
  };
  jsonapi: {
    version: string;
  };
  links: {
    first: string;
    last: string;
  };
  data: ResponseType[];
  included: IncludedType[];
}

export interface IIncluded<Attributes, Relationships> {
  type: string;
  id: string;
  attributes: Attributes;
  relationships?: Relationships;
  links?: {
    self: string;
  };
}

//PRODUCT
export type IProduct = IIncluded<IProductAttributes, IProductRelationships>;
interface IProductAttributes {
  sku: string;
  name: string;
  type: string;
  price: string;
  value?: string;
  customs_price?: string;
  hs_code?: string;
  country_of_origin?: string;
  notes: string;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
  barcode: string;
  customs_description?: string;
  tags: string;
  inventory_sync: number;
  quantity_on_hand: number;
  quantity_allocated: number;
  quantity_available: number;
  quantity_backordered: number;
  created_at: string;
  updated_at: string;
}
interface IProductRelationships {
  customer: ILinkData;
  barcodes: ILinkData;
  product_images: ILinkData;
  location_products: ILinkData;
  kits: ILinkData;
  components: ILinkData;
}
export interface IClientRelationships {
  contact_information: {
    data: {
      type: string;
      id: string;
    };
  };
}
export interface IClientAttributes {
  created_at: string;
  updated_at: string;
  name?: string;
  company_name?: any;
  address?: any;
  address2?: any;
  city?: any;
  state?: any;
  zip?: any;
  country?: string;
  email?: any;
  phone?: any;
}

//ORDERS
export type IOrder = IIncluded<IOrderAttributes, IOrderRelationships>;
interface IOrderAttributes {
  number: string;
  status_text: string;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  ready_to_ship: number;
  ready_to_pick: number;
  is_wholesale?: boolean;
  fraud_hold: number;
  address_hold: number;
  payment_hold: number;
  operator_hold: number;
  allow_partial: number;
  ordered_at: string;
  updated_at: string;
  fulfilled_at?: string;
  cancelled_at?: string;
  archived_at?: any;
  hold_until?: string;
  ship_before?: string;
  scheduled_delivery?: string;
  external_id: string;
  packing_note?: string;
  shipping_method_name?: string;
  shipping_method_code?: string;
  tote: string;
  tags: string;
  created_at: string;
}
interface IOrderRelationships {
  customer: ILinkData;
  shipping_method: ILinkData;
  shipping_contact_information: ILinkData;
  billing_contact_information: ILinkData;
  order_channel: ILinkData;
  shipping_box: ILinkData;
  order_items: ILinkData;
  shipments: ILinkData;
  returns: ILinkData;
}
interface IOrderIncludeAttributes {
  created_at: string;
  updated_at: string;
  name?: string;
  company_name?: any;
  address?: string;
  address2?: any;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  email?: string;
  phone?: string;
  sku?: string;
  price?: number | string;
  quantity?: number;
  quantity_pending?: number;
  quantity_shipped?: number;
  quantity_reshipped?: number;
  quantity_returned?: number;
  quantity_allocated?: number;
  quantity_allocated_pickable?: number;
  quantity_backordered?: number;
  external_id?: string;
  type?: string;
  value?: string;
  customs_price?: string;
  hs_code?: string;
  country_of_origin?: string;
  notes?: string;
  width?: number | string;
  height?: number | string;
  length?: number | string;
  weight?: number | string;
  barcode?: string;
  customs_description?: string;
  tags?: string;
  inventory_sync?: number;
  quantity_on_hand?: number;
  quantity_available?: number;
  status_text?: string;
  cost?: string;
  serial_number?: string;
  size?: string;
  url?: string;
  document_type?: string;
  tracking_number?: string;
  tracking_url?: any;
  number?: string;
  approved?: number;
  reason?: any;
  requested_at?: any;
  expected_at?: any;
  received_at?: any;
  quantity_received?: number;
  item_price?: string;
  expiration_date?: string;
}
interface IOrderIncludeRelationships {
  contact_information?: ILinkData;
  product?: ILinkData;
  customer?: ILinkData;
  barcodes?: ILinkData;
  product_images?: ILinkData;
  location_products?: ILinkData;
  kits?: ILinkData;
  components?: ILinkData;
  shipping_method?: ILinkData;
  shipment_items?: ILinkData;
  shipment_trackings?: ILinkData;
  packages?: ILinkData;
  shipment_labels?: ILinkData;
  package_order_items?: ILinkData;
  lot?: ILinkData;
  return_items?: ILinkData;
  order_item?: ILinkData;
  location?: ILinkData;
}

export interface ILinkData {
  links?: {
    related?: string;
    self?: string;
  };
  data?: any;
}

export type IProductResponse = IResponse<
  IProduct,
  IIncluded<IClientAttributes, IClientRelationships>
>;

export type IOrderResponse = IResponse<
  IOrder,
  IIncluded<IOrderIncludeAttributes, IOrderIncludeRelationships>
>;

//ORDER REQUEST
export interface IOrderRequest {
  data: {
    type: string;
    attributes: {
      number: string;
      order_channel_name?: string;
      ordered_at?: string;
      hold_until?: any;
      fraud_hold?: number;
      address_hold?: number;
      payment_hold?: number;
      operator_hold?: number;
      ship_before?: any;
      external_id?: number;
      shipping?: number;
      tax?: number;
      discount?: number;
      packing_note?: string;
      shipping_method_name?: string;
      shipping_method_code?: string;
      tags?: string;
      shipping_contact_information_data?: IAddressOrderRequest;
      billing_contact_information_data?: IAddressOrderRequest;
      order_item_data: {
        sku?: string;
        quantity?: number;
        external_id?: string;
        price?: number;
      }[];
    };
    relationships?: {
      customer?: {
        data?: {
          type?: string;
          id?: string;
        };
      };
    };
  };
}

export interface IAddressOrderRequest {
  name?: string;
  company_name?: string;
  address?: string;
  address2?: string;
  zip?: string;
  city?: string;
  state?: string;
  country?: string;
  email?: string;
  phone?: string;
  company_number?: string;
}

export type OrderFormValues = {
  customer: string;
  number: string;
  tags: string;
  packing_note: string;
  fraud_hold: number;
  address_hold: number;
  payment_hold: number;
  operator_hold: number;
  order_item_data: OrderItemData[];
  shipping_contact_information_data: IAddressOrderRequest;
  billing_contact_information_data: IAddressOrderRequest;
};
export type OrderItemData = {
  sku?: string;
  quantity?: number;
  external_id?: string;
  price?: number;
};
