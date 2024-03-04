import { Menu, MenuCategory, MenuMenuCategory, Table } from "@prisma/client";

export namespace Api {
  export namespace Response {
    export namespace App {
      export interface Get {
        menus: Menu[];
        menuCategories: MenuCategory[];
        menusMenuCategories: MenuMenuCategory[];
        tables: Table[];
      }
    }
  }
}
