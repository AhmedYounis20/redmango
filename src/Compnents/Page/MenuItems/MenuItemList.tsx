import React from 'react'
import { useState,useEffect } from 'react';
import { menuItemModel } from '../../../Interfaces';
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../Apis/menuItemApi';
import { useDispatch } from 'react-redux';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
function MenuItemList(){
   //const [menuItems,setMenuItems] = useState<menuItemModel[]>([]);
    const {data,isLoading} = useGetMenuItemsQuery(null);
    const dispatch = useDispatch();

  useEffect(()=>{
    if(!isLoading){
      dispatch(setMenuItem(data?.result));
    }
  }, [isLoading]);


  if(isLoading || data === undefined){
    return <div>loading...</div>
  }
   return (
    <div className='row container mb-5'>
    
      {data.result.length > 0 && 
      data.result.map((menuItem : menuItemModel,index :number)=>
          <MenuItemCard menuItem={menuItem} key={index} />
      )}
    </div>
  );}

export default MenuItemList
