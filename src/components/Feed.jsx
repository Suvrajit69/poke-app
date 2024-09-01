import React, { useEffect, useState } from "react";
import PokeCard from "./PokeCard";
import axios from "axios";
import { Atom } from "react-loading-indicators";

const PokeCardList = ({ data }) => {
  return (
    <div className="mt-5 md:mt-12 prompt_layout">
      {data.map((pokemon) => (
        <PokeCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterPokemons = (searchtext) => {
    const regex = new RegExp(searchText, "i"); //"i" flag for case-insentitive
    return pokemons.filter(
      (pokemon) =>
        regex.test(pokemon.name) ||
        regex.test(pokemon.types.map((typeInfo) => typeInfo.type.name))
    );
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);

    // Clear the previous timeout before setting a new one
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout
    const newTimeout = setTimeout(() => {
      const searchResult = filterPokemons(searchTerm);
      setSearchedResults(searchResult);
    }, 3000);

    // Update the timeout state with the new timeout ID
    setSearchTimeout(newTimeout);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const results = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokeDetails = await axios.get(pokemon.url);
            return pokeDetails.data;
          })
        );
        setPokemons(results);
        setSearchedResults(results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <section className="feed">
      <form className="relative flex-center w-full">
        <input
          type="text"
          placeholder="Search for a pokemon name or type"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {loading ? (
        <div className="mt-16">
          <Atom color="#e9a50e" size="large" />
        </div>
      ) : searchText ? (
        <PokeCardList data={searchedResults} />
      ) : (
        <PokeCardList data={pokemons} />
      )}
    </section>
  );
};

export default Feed;
