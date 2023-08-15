import { useRecoilValue, useSetRecoilState } from 'recoil';
import { recipesState, wishlistDisplayState } from '../../../../state';
import styles from './Wishlist.module.scss';
import { selectWishedRecipe } from '../../../../state';
import { updateRecipe$ } from '../../../../apis/recipe';
import { useState } from 'react';

function Wishlist() {
  const setWishlistDisplay = useSetRecoilState(wishlistDisplayState);
  const recipes = useRecoilValue(selectWishedRecipe);
  const setRecipes = useSetRecoilState(recipesState);
  const [remove, setRemove] = useState(false);

  async function handleClick(recipe) {
    const updatedRecipe = await updateRecipe$({ ...recipe, liked: false });
    setRecipes((oldRecipes) =>
      oldRecipes.map((or) =>
        or._id === updatedRecipe._id ? updatedRecipe : or
      )
    );
  }

  function handleRemoveWishlist() {
    if (!remove) {
      setTimeout(() => {
        setWishlistDisplay(false);
      }, 200);
      setRemove(true);
    }
  }

  return (
    <div onClick={handleRemoveWishlist} className={styles.container}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.wishlist} ${remove ? styles.remove : ''}`}
      >
        <h4 className="mb-10">Wishlist</h4>
        <ul>
          {recipes.length &&
            recipes.map((r) => (
              <li key={r._id} className="d-flex align-items-center mb-5">
                <span className="flex-fill mr-10">{r.title}</span>
                <button
                  onClick={() => handleClick(r)}
                  className="btn btn-danger"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Wishlist;
