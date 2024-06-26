import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MenuItemModel } from '../../../Interfaces';
import { useGetMenuItemByIdQuery } from '../../../Apis/menuItemApi';
import { useUpdateShoppingCartMutation } from '../../../Apis/shoppingCartApi';
import {MainLoader,MiniLoader} from '../..';
import { RootState } from '../../../Storage/Redux/store';
// User ID  - a51e8c3e-54b4-42eb-8598-0369889f9bbd
function MenuItemDetails() {
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData = useSelector((state: RootState) => state.userAuthStore);

  const handleQuantity = (counter :number)=> setQuantity(state=>{
    if(state+counter>=1)
      return state+counter;
    else 
      return 1;
  });
  
  const handleAddToCart = async(menuItemId:number)=>{
    setIsAddingToCart(true);
    const response = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
      userId: userData.id,
    });
    console.log(response);
    setIsAddingToCart(false);
  }
  // const userData: userModel = useSelector((state: RootState) => state.userAuthStore);
  return (
      <div className="container pt-4 pt-md-5">
      {!isLoading ? (
        <div className="row">
          <div className="col-7">
            <h2 className="text-success">
                {data.result?.name}
                </h2>
            <span>
              <span
                className="badge text-bg-dark pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result?.category}
              </span>
            </span>
            <span>
              <span
                className="badge text-bg-light pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result?.specialTag}
              </span>
            </span>
            <p style={{ fontSize: "20px" }} className="pt-2">
              {data.result?.description}
            </p>
            <span className="h3">$
            {data.result?.price}
            </span> &nbsp;&nbsp;&nbsp;
            <span
              className="pb-2  p-3"
              style={{ border: "1px solid #333", borderRadius: "30px" }}
            >
              <i
                onClick={() => {
                  handleQuantity(-1);
                }}
                className="bi bi-dash p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
              <span className="h3 mt-3 px-3">{quantity}</span>
              <i
                className="bi bi-plus p-1"
                onClick={() => {
                  handleQuantity(+1);
                }}
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
            </span>
            <div className="row pt-4">
              <div className="col-5">
                {isAddingToCart ? (
                  <button disabled className="btn btn-success form-control">
                    <MiniLoader />
                  </button>
                ) : (
                  <button
                    className="btn btn-success form-control"
                    onClick={() => handleAddToCart(data.result?.id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="col-5 ">
                <button
                  className="btn btn-secondary form-control"
                  onClick={() => navigate(-1)}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
          <div className="col-5 px-5">
            <img
              src={data.result.image}
            // src="https://via.placeholder.com/150"
              width="400px"
              height="400px"
              style={{ borderRadius: "50%" }}
              alt="No content"
              className='m-5'
            ></img>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <MainLoader />
        </div>
      )}
    </div>
  )
}

export default MenuItemDetails;
