import React from 'react';
import './ReviewItems.css';

const ReviewItems = (props) => {
    const {name, quantity, key, price }= props.product;
    return (
        <div>
            <div className="reviewItems">
                <h6>{name}</h6><br/>
                <h3>{quantity}</h3><br/>
                <h6><small>{price}</small></h6>
                <button onClick={() => props.productRemove(key)} className="btn btn-primary">remove</button>
            </div>
        </div>
    );
};

export default ReviewItems;