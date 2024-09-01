// src/components/PokemonCard.js
import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="card p-4 border rounded-lg shadow-lg max-w-xs mx-auto prompt_card">
      <img 
        src={pokemon.sprites.front_default} 
        alt={pokemon.name} 
        className="w-full h-full max-w-sm mx-auto object-contain"
      />
      <h3 className="text-2xl font-mono mt-4 capitalize">{pokemon.name}</h3>

      <div className="mt-2 flex">
        <h4 className="mr-4 text-lg font-normal">Type(s):</h4>
        <ul className="flex justify-center space-x-2">
          {pokemon.types.map((typeInfo) => (
            <li
              key={typeInfo.slot}
              className="font-inter text-lg blue_gradient "
            >
              {typeInfo.type.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-2">
        <h4 className="text-lg font-semibold mb-4">Abilities:</h4>
        <ul className="space-y-1">
          {pokemon.abilities.map((abilityInfo) => (
            <li key={abilityInfo.slot} className="bg-green-200 text-green-800 px-2 py-1 rounded">
              {abilityInfo.ability.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;
