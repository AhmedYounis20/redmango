import { MenuItemModel } from ".";
export interface CartItemModel {
  id: number;
  menuItemId: number;
  menuItem: MenuItemModel;
  quantity: number;
  shoppingCartId: number;
}
