import { CartItemModel } from ".";

export interface CartModel {
  id: number;
  userId: string;
  cartItems: CartItemModel[];
  cartTotal: number;
  stripePaymentIntentId?: any;
  clientSecret?: any;
}