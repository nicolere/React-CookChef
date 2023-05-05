import styles from './Homepage.module.scss';
import Recipe from './components/Recipe/Recipe';
import Loader from '../../components/Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ApiContext } from '../../context/ApiContext';

function Homepage() {
  const [filter, setFilter] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const BASE_URL_API = useContext(ApiContext);

  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  }

  useEffect(() => {
    let cancel = false;
    async function fetchRecipes() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_URL_API}?skip=${page * 15}&limit=15`
        );
        if (response.ok && !cancel) {
          const newRecipes = await response.json();
          setRecipes((x) =>
            Array.isArray(newRecipes)
              ? [...x, ...newRecipes]
              : [...x, newRecipes]
          );
        }
      } catch (e) {
        throw new Error('Erreur de chargement de recettes');
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    fetchRecipes();
    return () => (cancel = true);
  }, [BASE_URL_API, page]);

  function updateRecipe(updatedRecipe) {
    setRecipes(
      recipes.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
    );
  }

  return (
    <div className="flex-fill container d-flex flex-column p-20">
      <h1 className="my-30">
        Découvrez nos nouvelles recettes ({recipes.length})
      </h1>
      <div
        className={`card d-flex flex-fill flex-column p-20 ${styles.contentCards}`}
      >
        <div
          className={`d-flex flex-row justify-content-center align-items-center my-30 ${styles.searchBar}`}
        >
          <i className="fas fa-search mr-10"></i>
          <input
            onInput={handleInput}
            className="flex-fill"
            type="text"
            placeholder="Rechercher"
          />
        </div>
        {isLoading && !recipes.length ? (
          <div className="d-flex flex-fill align-items-center">
            <Loader />
          </div>
        ) : (
          <div className={styles.grid}>
            {recipes
              .filter((r) => r.title.toLocaleLowerCase().startsWith(filter))
              .map((recipe) => (
                <Recipe
                  key={recipe._id}
                  recipe={recipe}
                  toggleLikeRecipe={updateRecipe}
                />
              ))}
          </div>
        )}
        <div className="d-flex flex-row justify-content-center align-items-center m-20">
          <button onClick={() => setPage(page + 1)} className="btn btn-primary">
            Charger plus de recettes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
