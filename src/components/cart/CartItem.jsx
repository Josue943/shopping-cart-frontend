import React from 'react'
import '../../sass/CartItem.scss'

export const CartItem = ({item,dispatch}) => {

    const { _id, name, category, image, quantity, subTotal } = item
    
    return (
        <div className="colum-item">
          <div className="image-container">
            <img src={image} alt=""/>
          </div>
            <div className="info">
               <h3>{name}</h3>
               <span>{category.name}</span>
           </div> 
           
            <div className="quantity">
                <i 
                onClick={()=> dispatch({type:"INCREMENT_ITEM",payload:_id})}
                className="fas fa-plus">                    
                </i>
                <span>{quantity}</span>
                <i 
                 onClick={()=> dispatch({type:"DECREMENT_ITEM",payload:_id})}
                className="fas fa-minus">
                </i>
            </div> 
            <div className="item-total">
                ${subTotal} USD
            </div>
        </div> 
            
    
      
    )
}
