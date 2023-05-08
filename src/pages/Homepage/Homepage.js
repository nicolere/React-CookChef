import styles from './Homepage.module.scss';
import Recipe from './components/Recipe/Recipe';
import Loader from '../../components/Loader/Loader';
import { useState } from 'react';
import { useContext } from 'react';
import { ApiContext } from '../../context/ApiContext';
import Search from './components/Search/Search';
import { useFetchData } from '../../hooks/useFetchData';

function Homepage() {
  const BASE_URL_API = useContext(ApiContext);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [[recipes, setRecipes], isLoading] = useFetchData(BASE_URL_API, page);

  function updateRecipe(updatedRecipe) {
    setRecipes(
      recipes.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
    );
  }

  function deleteRecipe(_id) {
    setRecipes(recipes.filter((r) => r._id !== _id));
  }

  return (
    <div className="flex-fill container d-flex flex-column p-20">
      <h1 className="my-30">
        Découvrez nos nouvelles recettes ({recipes.length})
      </h1>
      <div
        className={`card d-flex flex-fill flex-column p-20 ${styles.contentCards}`}
      >
        <Search setFilter={setFilter} />
        {isLoading && !recipes.length ? (
          <div className="d-flex flex-fill align-items-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {recipes
                .filter((r) => r.title.toLocaleLowerCase().startsWith(filter))
                .map((recipe) => (
                  <Recipe
                    key={recipe._id}
                    recipe={recipe}
                    deleteRecipe={deleteRecipe}
                    toggleLikeRecipe={updateRecipe}
                  />
                ))}
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center m-20">
              <button
                onClick={() => setPage(page + 1)}
                className="btn btn-primary"
              >
                Charger plus de recettes
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Homepage;
