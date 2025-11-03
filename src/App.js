import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './Components/PokemonList/PokemonList.js';
import Move from './Components/Move/Move.jsx';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    axios.get(currentPage, { signal: controller.signal })
      .then((response) => {
        setPokemon(response.data.results.map((p) => p.name));
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === 'CanceledError') {
          console.log("Request canceled");
        } else {
          console.error(error);
        }
        setLoading(false);
      });

    // cleanup عند تغيير الصفحة أو خروج الكومبوننت
    return () => {
      controller.abort();
    };
  }, [currentPage]);

  if (loading) return "...loading";

  function goNextPage() {
    setCurrentPage(nextPage);
  }

  function goPrevPage() {
    setCurrentPage(prevPage);
  }

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Move gonexttPage={nextPage ? goNextPage : null} gottoPrev={prevPage ? goPrevPage : null} />
    </>
  );
};

export default App;
