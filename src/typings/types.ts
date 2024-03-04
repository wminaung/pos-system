export interface OrderlineItem {
  id: string;
  menu: Menu;
  // addons?: addon[];
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
      menuCatIds: number[];
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

// export interface MenuCreateInput {
//   name: string;
//   price: number;
//   asset_url?: string;
//   description: string;
// }
// export interface AppDataResponse {
//   company: Company | null;
//   menus: Menu[];
//   menuCategories: MenuCategory[];
//   addons: Addon[];
//   addonCategories: AddonCategory[];
//   menusMenuCategoriesLocations: MenuMenuCategoryLocation[];
//   locations: Location[];
//   tables: Table[];
//   menusAddonCategories: MenuAddonCategory[];
//   selectedLocationId?: string | null;
//   orderlines: Orderline[];
//   orders: Order[];
// }
export interface OrderDataResponse {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  menusAddonCategories: MenuAddonCategory[];
  location: Location | null;
  menusMenuCategoriesLocations: MenuMenuCategoryLocation[];
  orderlineItems: OrderlineItem[];
}
