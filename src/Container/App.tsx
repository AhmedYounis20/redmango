import { Header,Footer } from "../Compnents/Layout";
import { AccessDenied, AuthenticationTest, AuthenticationTestAdmin, Home, Login, MenuItemDetails, Register } from "../Pages";
import { Route, Routes } from "react-router-dom";
import {NotFound} from "../Pages";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartByUserIdQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { ShoppingCartDetails } from "../Pages";
import { jwtDecode } from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { userModel } from "../Interfaces";
import { RootState } from "../Storage/Redux/store";
function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state:RootState)=> state.userAuthStore);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      const userData = jwtDecode(token);
      dispatch(setLoggedInUser(userData));
    }
  },[]);

  const {data,isLoading} = useGetShoppingCartByUserIdQuery(userData?.id);
  useEffect(()=>{
    if(!isLoading){
      console.log(data.result);
      dispatch(setShoppingCart(data.result?.cartItems ?? []));
    }
  }, [data]);

   return (
     <div>
       <Header />
       <Routes>
         <Route path="/" element={<Home />} />
         <Route
           path="/menuItemDetails/:menuItemId"
           element={<MenuItemDetails />}
         />
         <Route path="/shoppingCart" element={<ShoppingCartDetails />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/authorization" element={<AuthenticationTestAdmin />} />
         <Route path="/authentication" element={<AuthenticationTest />} />
         <Route path="/accessdenied" element={<AccessDenied />} />
         <Route path="*" element={<NotFound />} />
       </Routes>
       <Footer />
     </div>
   );
}

export default App;
