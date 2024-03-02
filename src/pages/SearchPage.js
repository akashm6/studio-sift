import React from "react";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";
import DevSelection from "../components/DevSelection";
import '../components/SearchPage.css'
import { useNavigate } from "react-router-dom";

function SearchPage() {

    const [studios, setStudio] = useState([])
    const [selectedGames, setSelectedGames] = useState(null)
    const navigate = useNavigate()
    

    useEffect(() => {
        fetch('/search')
        .then(res => res.json())
        .then(data => {setStudio(data);});
    },[]);

    const handleLogoClick = (studio) =>
    {
      fetch(`/search/${studio.name}`)
      .then(res => res.json())
      .then(data => setSelectedGames(data.games));
      navigate(`/search/${studio.name}`);
    };
    
    const result = studios.map((studio, index) => (
      <DevSelection
          dev_name={studio.name}
          imgSrc={studio.logo}
          onClick = {() => handleLogoClick(studio)}
      />
  ));
    
    return (
        <>
          <div>
            <Header />
          </div>
          <div> 
            <h1 className= "search-header">
              Studio Search
            </h1>
          <span className = 'choose'>
            <strong>Choose a Studio <br></br>to Search From!</strong>
          </span>
          </div>
          <div className = 'selection-container'>
          <div className = 'scroller'>
          <div className="scrolling-wrapper">
                 {result}
            </div>
            </div>
            </div>
    </>
  );
}

export default SearchPage;