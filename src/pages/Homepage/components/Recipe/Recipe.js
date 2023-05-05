import { ApiContext } from '../../../../context/ApiContext';
import { useContext } from 'react';
import styles from './Recipe.module.scss';

function Recipe({ recipe: { _id, liked, title, image }, toggleLikeRecipe }) {
  const BASE_URL_API = useContext(ApiContext);

  async function handleClick() {
    try {
      const response = await fetch(`${BASE_URL_API}/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          liked: !liked,
        }),
      });
      if (response.ok) {
        const updatedRecipe = await response.json();
        toggleLikeRecipe(updatedRecipe);
      }
    } catch (e) {
      throw new Error('Erreur lors du like de la recette');
    }
  }

  return (
    <div className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img src={image} alt="recipe" />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">{title}</h3>
        <i
          onClick={handleClick}
          className={`fas fa-heart ${liked ? 'text-primary' : ''}`}
        ></i>
      </div>
    </div>
  );
}

export default Recipe;
