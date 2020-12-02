import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Card from '../Card/Card';
import Product from '../Product/Product';
import './Shop.css';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [card , setCard ] =useState([]);

    useEffect( () => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCard = productKeys.map(exestingKey =>{
            const product = fakeData.find(pd => pd.key === exestingKey)
            product.quantity = saveCart[exestingKey];
            return product;
        })
        setCard(previousCard);
    } , [])



    const handleAddProduct = (product) => {
        // console.log('noman',product);
        const toBeAddedKey = product.key;
        const sameProduct = card.find (pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCard;
        if(sameProduct){
            const count =sameProduct.quantity + 1;
            sameProduct.quantity = count ;
            const other = card.filter(pd => pd.key !== toBeAddedKey);
            newCard = [...other , sameProduct];
        }
        else{
            product.quantity =1;
            newCard = [...card , product];
        }
       
        setCard(newCard);
       
        addToDatabaseCart(product.key, count);
    }
  
    return (
       <div className="container-fluid">
           <div className="shop-container">
                <div className="product-container">
                    {
                        products.map(pd => <Product showAddToCard={true} handleAddProduct={handleAddProduct} key={pd.key} product={pd}></Product>)
                    }
                </div>
                <div className="card-container">
                    <Card card={card}>
                        <Link to="review"><button className="btn btn-danger">review order</button></Link>
                    </Card>
                </div>
         </div>
       </div>
    );
};

export default Shop;