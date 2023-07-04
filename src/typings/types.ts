import type {
  addon,
  addon_category,
  company,
  location,
  menu,
  menu_addon_category,
  menu_category,
  menu_menu_category_location,
  order,
  orderline,
  table,
} from "@prisma/client";

export interface Company extends company {
  location: location[];
}

export interface Location extends location {
  company: company;
  menu_menu_category_location: menu_menu_category_location[];
}

export interface Menu extends menu {
  menu_addon_category: menu_addon_category[];
  menu_menu_category_location: menu_menu_category_location[];
}

export interface MenuCategory extends menu_category {
  menu_menu_category_location: menu_menu_category_location[];
}

export interface MenuMenuCategoryLocation extends menu_menu_category_location {
  menu: menu | null;
  menu_category: menu_category | null;
  location: location;
}

export interface Addon extends addon {
  addon_category: addon_category | null;
}

export interface AddonCategory extends addon_category {
  addon: addon[];
  menu_addon_category: menu_addon_category[];
}
export interface MenuAddonCategory extends menu_addon_category {
  addon_category: addon_category[];
}

export interface Order extends order {
  location: location;
  orderline: orderline[];
  table: table;
}
export interface Orderline extends orderline {
  menu: menu;
  order: order;
  addon: addon | null;
}

export interface OrderlineItem {
  id: string;
  menu: Menu;
  addons?: addon[];
  quantity: number;
}
export enum OrderlineStatus {
  PENDING = "PENDING",
  PREPARING = "PREPARING",
  COMPLETE = "COMPLETE",
}

//////////////
export interface BaseProps {
  children: React.ReactNode;
}

//!ENUM
export type ShowCatOption = "all" | "available" | "notAvailable";

export interface MenuUpdatePayload {
  name: string;
  price: number;
  description: string;
  asset_url: string | null;
  isRequired: boolean;
  menuCatIds: number[];
}

export namespace Payload {
  export namespace Menu {
    export interface Create {
      name: string;
      price: number;
      description: string;
      asset_url: string | null;
      addonCatIds: number[];
      isRequired?: boolean;
    }
    export interface Update extends Create {
      isRequired: boolean;
    }
  }

  export namespace MenuCategory {
    export interface Create {
      name: string;
      selectedLocations: location[];
    }
    export interface Update extends Create {}
  }

  export namespace Addon {
    export interface Create {
      name: string;
      price: number;
      addonCategoryId: number | null;
    }
    export interface Update extends Create {}
  }

  export namespace AddonCategory {
    export interface Create {
      name: string;
      isRequired: boolean;
    }
    export interface Update extends Create {}
  }
}

export interface MenuCreateInput {
  name: string;
  price: number;
  asset_url?: string;
  description: string;
}
