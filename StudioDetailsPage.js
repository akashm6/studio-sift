import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "../components/Details";

function StudioDetailsPage() {
  const { name } = useParams();
  const [studioDetails, setStudioDetails] = useState({});
  const [games, setGames] = useState([]);
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`/search/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games);
        setLogo(data.logo);
        setDescription(data.description);
      });
  }, [name]);

  return (
    <div>
      <h2>Games</h2>
        <Details 
        games = {games}
        logo = {logo}
        description = {description} />
    </div>
  );
}

export default StudioDetailsPage;
