import React from "react";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";
import DevSelection from "../components/DevSelection";
import '../components/SearchPage.css'

function SearchPage() {

    const [studios, setStudio] = useState([])
    const result = []

    useEffect(() => {
        fetch('/search')
        .then(res => res.json())
        .then(data => {setStudio(data);});
    },[]);
    
    for(const i in studios.names) {
            result.push(
                <DevSelection
                    //dev_name = {studios.names[i]}
                    imgSrc = {studios.logos[i]}
                    />
            )
    }
    
    return (
        <>
          <div>
            <Header />
          </div>
          <div> 
            <h1 className= "search-header">
              Studio Search
            </h1>
          </div>
          <div className = 'scroller'>
          <div className="scrolling-wrapper">
                 {result}
            </div>
            </div>
    </>
  );
}

export default SearchPage;