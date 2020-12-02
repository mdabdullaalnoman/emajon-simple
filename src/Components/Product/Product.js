import React from 'react';
import './Prduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Product = (props) => {
    const {name,img,price,seller,key} = props.product;

    return (
       <div className="product">
           <div className="img">
               <img src={img} alt=""/>
           </div>
           <div className="name">
               <h6><Link to={"/product/"+key}> {name}</Link> </h6> <br/>
               <p>{price}</p><br/>
               <h5>{seller}</h5>
               {props.showAddToCard &&<button onClick={ () => props.handleAddProduct(props.product)} className="add-card"><FontAwesomeIcon icon={faCartPlus} />Add to card</button>}
           </div>
       </div>
    );
};

export default Product;