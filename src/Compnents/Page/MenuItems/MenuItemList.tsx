import React from 'react'
import { useState,useEffect } from 'react';
import { menuItemModel } from '../../../Interfaces';
const MenuItemList :React.FC= () => {
   const [menuItems,setMenuItems] = useState<menuItemModel[]>([]);
  
  useEffect(()=>{
    fetch("https://redmangoapiv1.azurewebsites.net/api/menuItems").then(response=>response.json()).then(data=>{
      console.log(data);
      setMenuItems(data.result);
    })
  },[])
   return (

    <div>
        MenuItemList
    </div>
  );}

export default MenuItemList
