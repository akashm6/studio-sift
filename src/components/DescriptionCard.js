import React from 'react';
import './DescriptionCard.css';

const DescriptionCard = (props) => {
  return (
    <div className="new-card-container">
      <img src={props.logo} alt="Logo" className="new-card-logo" />
      <p className="new-card-description">{props.description}</p>
    </div>
  );
};


export default DescriptionCard;
