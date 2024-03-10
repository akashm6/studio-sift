import React from "react";
import DescriptionCard from "./DescriptionCard";
import GamesCard from "./GamesCard";
import StoreCard from "./StoreCard";

function Details(props) {

  return (
    <div>
        <DescriptionCard className = 'descriptionCard'
          logo = {props.logo}
          description = {props.description}
          />
        
        <GamesCard className = 'gamesCard'
        games = {props.games}
        platforms= {props.paltforms}
        tags = {props.tags}
        />
        
        
        <StoreCard className = 'storesCard'
          stores = {props.stores}
        />
    </div>
  );
}

export default Details;
