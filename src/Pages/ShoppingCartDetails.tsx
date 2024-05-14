import React from 'react'
import { CartSummary } from '../Compnents/Page/ShoppingCart'
import CartPickupDetails from '../Compnents/Page/ShoppingCart/CartPickupDetails';
import { withAdminAuthorization, withAuth } from '../HOC';

const ShoppingCartDetails = () => {
  return (
    <div className="row w-100" style={{ marginTop: "10px" }}>
      <div className="col-lg-6 col-12" style={{ fontWeight: 300 }}>
        <CartSummary/>
      </div>
      <div className="col-lg-6 col-12 p-4" style={{ fontWeight: 300 }}>
        <CartPickupDetails/>
      </div>
    </div>
  );
}

export default withAuth(ShoppingCartDetails);