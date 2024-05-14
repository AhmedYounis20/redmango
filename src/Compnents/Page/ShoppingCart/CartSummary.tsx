import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../Storage/Redux/store";
import { CartItemModel } from "../../../Interfaces";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";
import { removeFromCart,updateQuantity } from "../../../Storage/Redux/shoppingCartSlice";
function CartSummary() {
    const dispatch = useDispatch();
  const shoppingCartFromStore = useSelector(
    (state:RootState) => state.shoppingCartStore?.cartItems ?? []
  );
    const userData = useSelector((state: RootState) => state.userAuthStore);

  const [updateShoppingCart] = useUpdateShoppingCartMutation();



  if (!shoppingCartFromStore){
    return (
      <div className="p-5">
        There are no items in your cart. Please add items to continue.
      </div>
    );
  }
  if (shoppingCartFromStore.length == 0) {
    return (
      <div className="p-5">
        There are no items in your cart. Please add items to continue.
      </div>
    );
  }

  const handleQuantity = (
    updateQuantityBy: number,
    cartItem: CartItemModel
  ) => {
    if (
      (updateQuantityBy === -1 && cartItem.quantity === 1) ||
      updateQuantityBy === 0
    ) {
      //remove the item
      updateShoppingCart({
        menuItemId: cartItem.menuItem?.id,
        updateQuantityBy: 0,
        userId: userData.id,
      });
      dispatch(removeFromCart({ cartItem, quantity: 0 }));
    } else {
      //update the quantity with the new quantity
      updateShoppingCart({
        menuItemId: cartItem.menuItem?.id,
        updateQuantityBy: updateQuantityBy,
        userId: userData.id,
      });
      dispatch(
        updateQuantity({
          cartItem,
          quantity: cartItem.quantity! + updateQuantityBy,
        })
      );
    }
  };

  return (
    <div className="container p-2 mb-5">
      <h4 className="text-center text-success">Cart Summary</h4>
      {shoppingCartFromStore?.map((item: CartItemModel, idx: number) => (
        <div
          key={idx}
          className="d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3"
          style={{ background: "ghostwhite" }}
        >
          <div className="p-3">
            <img
              src={item.menuItem?.image}
              alt=""
              width={"120px"}
              className="rounded-circle"
            />
          </div>

          <div className="p-2 mx-3" style={{ width: "100%" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 style={{ fontWeight: 300 }}>{item.menuItem?.name}</h4>
              <h4>${(item.menuItem?.price! * item.quantity).toFixed(2)}</h4>
            </div>
            <div className="flex-fill">
              <h4 className="text-danger">${item.menuItem?.price}</h4>
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow  "
                style={{
                  width: "100px",
                  height: "43px",
                }}
              >
                <span
                  style={{ color: "rgba(22,22,22,.7)" }}
                  role="button"
                  onClick={() => handleQuantity(-1, item)}
                >
                  <i className="bi bi-dash-circle-fill"></i>
                </span>
                <span>
                  <b>{item.quantity}</b>
                </span>
                <span
                  style={{ color: "rgba(22,22,22,.7)" }}
                  role="button"
                  onClick={() => handleQuantity(1, item)}
                >
                  <i className="bi bi-plus-circle-fill"></i>
                </span>
              </div>

              <button
                className="btn btn-danger mx-1"
                onClick={() => handleQuantity(0, item)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartSummary;
