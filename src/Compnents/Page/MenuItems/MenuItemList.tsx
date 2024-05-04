import React from 'react'
import { useState,useEffect } from 'react';
import { MenuItemModel } from '../../../Interfaces';
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../Apis/menuItemApi';
import { useDispatch } from 'react-redux';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
import MainLoader from '../../MainLoader';
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
    return <MainLoader/>
  }
   return (
    <div className='row container mb-5'>
    
      {data.result.length > 0 && 
      data.result.map((menuItem : MenuItemModel,index :number)=>
          <MenuItemCard menuItem={menuItem} key={index} />
      )}
    </div>
  );}

export default MenuItemList
