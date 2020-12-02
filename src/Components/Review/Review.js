import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Card from '../Card/Card';
import ReviewItems from '../ReviewItems/ReviewItems';
import '../Shop/Shop.css';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
const[ cart , setCart ]= useState([]);
const [orderPlaced , setOrderPlaced] = useState(false);
const history = useHistory();


const removeHandler = (productkey) => {
    const newCard = cart.filter(pd => pd.key !== productkey);
    setCart(newCard);
    removeFromDatabaseCart(productkey);

}

const handlePlaceOrder = () =>{
   history.push('/review')
}

    useEffect( () => {
        //cart
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity =saveCart[key];
            return product;
        },[]);
   
        setCart(cartProduct);
    },[]);

   let thankYou;
    if(orderPlaced){
        thankYou =<img src={happyImage}></img>;
    }   

    return (
        
        <div className="shop-container">
            
           <div className="product-container">
           {
                cart.map(pd => <ReviewItems 
                                        product={pd} 
                                        key={pd.key}
                                        productRemove={removeHandler}
                                        > 
                                        
                               </ReviewItems>)
            }
            {thankYou}
           </div>
           <div className="card-container">
                <Card card={cart}>
                    <button onClick={handlePlaceOrder} className="btn btn-danger">procide checkout</button>
                </Card>
           </div>
        </div>
    );
};

export default Review;