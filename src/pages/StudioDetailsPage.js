import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "../components/Details";

function StudioDetailsPage() {
  const { name } = useParams();
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([])
  const [tags, setTags] = useState([])
  const [logo, setLogo] = useState('');
  const [stores, setStores] = useState([])
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`/search/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games);
        setLogo(data.logo);
        setDescription(data.description);
        setPlatforms(data.platforms)
        setTags(data.tags)
        setStores(data.stores)
      });
  }, [name]);

  return (
    <div>
        <Details 
        games = {games}
        logo = {logo}
        description = {description}
        tags = {tags}
        platforms = {platforms}
        stores = {stores} />
    </div>
  );
}

export default StudioDetailsPage;
