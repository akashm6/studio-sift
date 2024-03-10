import React from 'react';
import './Store.css';

const Store = (props) => {
  return (
    <button className="store-item">
        <a className="store-link" href={props.domain}>
            {props.store}
        </a>
    </button>
  );
};

export default Store;
