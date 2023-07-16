import styles from './Recipe.module.scss';

function Recipe({ recipe, updateRecipe, deleteRecipe }) {
  function handleClickDelete(e) {
    e.stopPropagation();
    deleteRecipe(recipe._id);
  }

  function handleClickLike() {
    updateRecipe({
      ...recipe,
      liked: !recipe.liked,
    });
  }

  return (
    <div className={styles.recipe}>
      <i onClick={handleClickDelete} className="far fa-times-circle"></i>
      <div className={styles.imageContainer}>
        <img src={recipe.image} alt="recipe" />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">{recipe.title}</h3>
        <i
          onClick={handleClickLike}
          className={`fas fa-heart ${recipe.liked ? 'text-primary' : ''}`}
        ></i>
      </div>
    </div>
  );
}

export default Recipe;
