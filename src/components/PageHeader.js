import React from "react";
import './PageHeader.css';

function PageHeader(props) {
    return (
        <div>
        <h1 className="main-text">{props.title}</h1>
        </div>

    );
}

export default PageHeader;
