import React from "react";
import Store from './Store'
import './StoreCard.css'

const StoreCard = (props) => {
  
    return (
      <div className="store-card">
        <h3 className="store-card-title">Where To Buy</h3>
        <div className="store-list">
          {props.stores.map((store, index) => (
            <Store 
            store = {store.store}
            domain = {store.domain} />
          ))}
        </div>
      </div>
    );
  };
  
  export default StoreCard;