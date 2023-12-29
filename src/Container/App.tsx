import { Header,Footer } from "../Compnents/Layout";
import { Home, MenuItemDetails } from "../Pages";
import { Route, Routes } from "react-router-dom";
import {NotFound} from "../Pages";
function App() {
   return (
    <div>
     <Header/>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails/>} />
      <Route path="*" element={<NotFound/>} />
     </Routes>
    <Footer/>
    </div>
  );
}

export default App;
