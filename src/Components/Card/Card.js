import React from 'react';


const Card = (props) => {
    const card =props.card;
    // const total = card.reduce( (total, pd) => total + pd.price , 0);

    let total=0;
    for(let i=0; i<card.length ; i++){
        const product = card[i];
        total= total + product.price * product.quantity;
        
    }


    let sheping =0;

    if(total >35 ){
        sheping =0;
    }
    else if(total >15){
        sheping =10;
    }
    else if(total > 0){
        sheping =12.00;
    }

    let tax = (total /10 );
    let grandTotal = (sheping + total + tax);

    const formatNumber = num =>{
        const prisition = num.toFixed(2)
        return Number(prisition);
    }

    return (
        <div>
            <h2>Order summery</h2>
            <h6>Order items:{card.length}</h6>
            <h6>Product Price: {formatNumber(total)}</h6>
            <h6>sheping cost: {formatNumber(sheping)}</h6>
            <h6>Tax & Vat : {formatNumber(tax)}</h6>
            <h6>Total price:{formatNumber(grandTotal)}</h6>
            {
                props.children
            }
        </div>
    );
};

export default Card;