import React from 'react';
import { Character } from '../types';

interface CharacterDetailsProps {
    character: Character;
}

export default function CharacterDetails({ character }: CharacterDetailsProps) {
    return (
        <div className="character-details">
            <img src={character.image} alt={character.name} />
            <div classList="details">
                <h2>{character.name}</h2>
                <p>Status: {character.status}</p>
                <p>Species: {character.species}</p>
                <p>Gender: {character.gender}</p>
                <p>Origin: {character.origin.name}</p>
                <p>Location: {character.location.name}</p>
            </div>
        </div>
    );
}