import styles from './Homepage.module.scss';
import Recipe from './components/Recipe/Recipe';
import Loader from '../../components/Loader/Loader';
import { useState } from 'react';
import Search from './components/Search/Search';
import { useFetchRecipes } from '../../hooks/useFetchRecipes';
import { deleteRecipe$, updateRecipe$ } from '../../apis/recipe';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  selectFilteredRecipes,
  recipesState,
  wishlistDisplayState,
} from '../../state';
import Wishlist from './components/Wishlist/Wishlist';

function Homepage() {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading] = useFetchRecipes(page);
  const recipes = useRecoilValue(selectFilteredRecipes(filter));
  const setRecipes = useSetRecoilState(recipesState);
  const showWishlist = useRecoilValue(wishlistDisplayState);

  async function updateRecipe(updatedRecipe) {
    const savedRecipes = await updateRecipe$(updatedRecipe);
    setRecipes(
      recipes.map((r) => (r._id === savedRecipes._id ? savedRecipes : r))
    );
  }

  async function deleteRecipe(_id) {
    await deleteRecipe$(_id);
    setRecipes(recipes.filter((r) => r._id !== _id));
  }

  return (
    <>
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
                {recipes.map((recipe) => (
                  <Recipe
                    key={recipe._id}
                    recipe={recipe}
                    deleteRecipe={deleteRecipe}
                    updateRecipe={updateRecipe}
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
      {showWishlist && <Wishlist />}
    </>
  );
}

export default Homepage;
