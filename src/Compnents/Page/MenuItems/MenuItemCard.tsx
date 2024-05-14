import React from 'react'
import { MenuItemModel, authApiResponse } from '../../../Interfaces'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUpdateShoppingCartMutation } from '../../../Apis/shoppingCartApi'
import {MiniLoader} from '../..'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Storage/Redux/store'
import { toastify } from '../../../Helper/toastify'
interface Props {
    menuItem: MenuItemModel
}
function MenuItemCard(props:Props) {
    const navigate = useNavigate();
    const [isAddingToCart,setIsAddingToCart] =useState<Boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData = useSelector((state:RootState)=> state.userAuthStore);

  const handleAddToCart = async (menuItemId:number)=>{
      if(!userData.id){
          navigate('/login');
          return ;
      }
      setIsAddingToCart(true);
      const response : authApiResponse= await updateShoppingCart({
        menuItemId,
        updateQuantityBy: 1,
        userId: userData.id,
      });
      if(response.data){
          toastify("Item added to Cart");
      }
      else if(response.error){
        toastify(response.error.data.errorMessages[0],'error');
      }
      console.log(response);
      setIsAddingToCart(false);
  }
  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/menuItemDetails/${props.menuItem.id}`}>
              <img
                src={props.menuItem.image}
                style={{ borderRadius: "50%",height:"180px",width:"200px", }}
                alt=""
                className="mt-5"
              />
            </Link>
          </div>
          {props.menuItem.specialTag &&
            props.menuItem.specialTag.length > 0 && (
              <i
                className="bi bi-star btn btn-success"
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  outline: "none !important",
                  cursor: "pointer",
                }}
              >
                &nbsp; {props.menuItem.specialTag}
              </i>
            )}

          {isAddingToCart ? (
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
            >
              <MiniLoader/>
            </div>
          ) : (
            <i
              className="bi bi-cart-plus btn btn-outline-danger"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
              }}
              onClick={() => handleAddToCart(props.menuItem.id)}
            ></i>
          )}

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              <Link
                to={`/menuItemDetails/${props.menuItem.id}`}
                style={{ textDecoration: "none", color: "green" }}
              >
                {props.menuItem.name}
              </Link>
            </p>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.menuItem.category}
            </p>
          </div>
          <p
            className="card-text"
            style={{
              textAlign: "center",
              fontWeight: "light",
              fontSize: "14px",
            }}
          >
            {props.menuItem.description}
          </p>
          <div className="row text-center">
            <h4>${props.menuItem.price}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuItemCard
