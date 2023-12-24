import React from 'react'
import { useState,useEffect } from 'react';
import { menuItemModel } from '../../../Interfaces';
import MenuItemCard from './MenuItemCard';
const MenuItemList :React.FC= () => {
   const [menuItems,setMenuItems] = useState<menuItemModel[]>([]);
  
  useEffect(()=>{
    fetch("https://redmangoapiv1.azurewebsites.net/api/menuItems").then(response=>response.json()).then(data=>{
      console.log(data);
      setMenuItems(data.result);
    })
  },[])
   return (
    <div className='row container mb-5'>
    
      {menuItems.length > 0 && 
      menuItems.map((menuItem,index)=>
          <MenuItemCard menuItem={menuItem} key={index} />
      )}
    </div>
  );}

export default MenuItemList
