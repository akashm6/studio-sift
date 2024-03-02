import React from "react";

function Details(props) {

  return (
    <div>
        <img src = {props.logo}>
        </img>
      <h4>{props.description}</h4>
      <h5>{props.games}</h5>
    </div>
  );
}

export default Details;
