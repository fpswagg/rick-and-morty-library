import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../components/Card.tsx';
import CharacterDetails from '../components/CharacterDetails.tsx';

import { Character } from '../types.ts';

function makeRotates(characters: Character[]) {
  document.querySelectorAll(".card").forEach((card, index, cards) => {
    (card as any).style = `--x: ${index - characters.length + 1};`;
  });
  refreshAway(0);
}

function refreshAway(current: number) {
  document.querySelectorAll(".card").forEach((card, index, cards) => {
      if (cards.length - (index+1) < current) {
        card.classList.add("away");
        card.classList.remove('first');
        (card as any).style = `--x: 0;`;
      } else {
        card.classList.remove("away");
        if ((cards.length - (index+1+current)) === 0)
          card.classList.add('first');
        else
          card.classList.remove('first');
        (card as any).style = `--x: ${(cards.length - (index+1+current))};`;
      }
    });

    [...(document.querySelectorAll(".card"))]
      .filter(card=>!card.classList.contains("away"))
      .map((element,i)=>({element,i}))
      .sort((a,b)=>b.i-a.i)
      .map(x=>x.element)
      .forEach((card, index, cards) => {
        // if (cards.length <= 1)
        //   card.classList.remove("first");

        if (index < 3)
          card.classList.remove("unloaded");
        else
          card.classList.add("unloaded");
      });
}

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<Character[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(
    function () {
      axios.get('https://rickandmortyapi.com/api/character')
        .then(response => setCharacters(response.data.results))
        .catch(error => console.error(error));
    }
  , []);

  useEffect(
    function () {
      function scrollHandler() {
        const scroll = window.scrollY;
        const windowHeight = window.innerHeight;

        setCurrent(Math.min(filtered.length-1, Math.floor(scroll / (windowHeight/2))));
      }

      makeRotates(filtered);

      window.scrollTo({top: 0});
      
      (document.querySelector("#scroller") as any).style.height = (filtered.length * 50) + "vh";

      document.addEventListener("scroll", scrollHandler);

      return function () {
        document.removeEventListener("scroll", scrollHandler);
      }
    }
  , [filtered]);

  useEffect(
    function () {
      setFiltered(
        characters.filter((character: Character) => character.name.toLowerCase().includes(search.toLowerCase()))
      );
    }
  , [characters, search]);

  useEffect(
    function () {
      refreshAway(current);
    }
  , [current]);

  return (
    <main id="app">
      <main id="container">
        <header>
          <h2>Rick and Morty Library</h2>
          <p>Hey, you have all infos about Rick and Morty characters</p>
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setSearch(event.target.value)}
          />
        </header>
        <section className="cards">
            {
              filtered
                .sort((a: Character, b: Character) => b.id-a.id)
                .map((character: Character) => (
                  <Card
                    key={character.id}
                    title={character.name}
                    description={character.species}
                    imageUrl={character.image}
                    onClick={
                      function () {
                        if (current !== (filtered.length-1))
                          window.scrollBy({top:window.innerHeight/2});
                        else
                          window.scrollTo({top:0});
                      }
                    }
                  />
                ))
            }
        </section>
      </main>
      {filtered.length!==0?<CharacterDetails character={filtered[filtered.length-(current+1)]} />:undefined}
      <div id="scroller"></div>
    </main>
  );
}