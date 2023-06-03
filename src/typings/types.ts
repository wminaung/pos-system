import type {
  addon,
  addon_category,
  company,
  location,
  menu,
  menu_addon_category,
  menu_category,
  menu_menu_category_location,
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
  image_url: string | null;
  isRequired: boolean;
  menuCatIds: number[];
}

export interface MenuCreatePayload extends MenuUpdatePayload {}

export namespace Payload {
  export namespace Menu {
    export interface Create {
      name: string;
      price: number;
      description: string;
      image_url: string | null;
      menuCatIds: number[];
    }
    export interface Update extends Create {}
  }

  export namespace MenuCategory {
    export interface Create {
      name: string;
    }
    export interface Update extends Create {}
  }

  export namespace Addon {
    export interface Create {
      name: string;
    }
    export interface Update extends Create {}
  }
}
