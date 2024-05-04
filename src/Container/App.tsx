import { Header,Footer } from "../Compnents/Layout";
import { Home, MenuItemDetails } from "../Pages";
import { Route, Routes } from "react-router-dom";
import {NotFound} from "../Pages";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetShoppingCartByUserIdQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { ShoppingCartDetails } from "../Pages";
function App() {
  const dispatch = useDispatch();
  const {data,isLoading} = useGetShoppingCartByUserIdQuery("046300b4-b4f8-4c63-aba8-6e05a4534cd6");
  useEffect(()=>{
    if(!isLoading){
      console.log(data.result);
      dispatch(setShoppingCart(data.result?.cartItems ?? []));
    }
  }, [data]);

   return (
    <div>
     <Header/>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails/>} />
      <Route path="/shoppingCart" element={<ShoppingCartDetails/>} />
      <Route path="*" element={<NotFound/>} />
     </Routes>
    <Footer/>
    </div>
  );
}

export default App;
