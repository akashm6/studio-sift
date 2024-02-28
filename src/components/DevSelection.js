import React from "react";
import "./DevSelection.css";

const DevSelection = ({ imgSrc, dev_name, onClick}) => {
  return (
    <div className='dev-container' onClick={onClick}>
      {imgSrc && <img src={imgSrc} className="dev-img" alt={dev_name} />}
      {dev_name && <h6 className="dev-title">{dev_name}</h6>}
      
    </div>
  );
};

export default DevSelection;
