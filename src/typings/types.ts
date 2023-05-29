interface BaseType {
  id?: number;
  name: string;
}

export interface Location extends BaseType {
  address: string;
  company_id: number;
}

export interface Menu extends BaseType {
  price: number;
  description: string;
  location_ids: number[];
  menu_category_ids?: number[];
  addon_category_ids?: number[];
  image_url?: string;
}

export interface MenuCategory extends BaseType {}

export interface MenuMenuCategoryLocation {
  id?: number;
  menu_id: number;
  menu_category_id: number;
  location_id: number;
  is_available: boolean;
}

export interface Addon extends BaseType {
  price: number;
  required: boolean;
  addon_category_id: number;
}

export interface AddonCategory extends BaseType {
  // isRequired: boolean;
}

//////////////
export interface BaseProps {
  children: React.ReactNode;
}

export interface CreateMenuPayload {
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  locationIds: number[];
}

export interface UpdateMenuPayload {
  name: string;
  price: number;
  description: string;
  menuCategoryIds?: number[];
  imageUrl?: string;
}

export interface UpdateMenuQuery {
  menuId: number;
  payload: UpdateMenuPayload;
}

// ! Menu Categories

export interface CreateMenuCategoryPayload {
  name: string;
}

export interface UpdateMenuCategoryPayload extends CreateMenuCategoryPayload {}

export type Callback<error, data> = (error?: error, data?: data) => void;

export interface UpdateMenuCategoryQuery {
  menuCategoryId: number;
  payload: UpdateMenuCategoryPayload;
}

//! api types

//!ENUM
export type ShowCatOption = "all" | "available" | "notAvailable";
