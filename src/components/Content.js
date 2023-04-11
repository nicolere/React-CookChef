import styles from './Content.module.scss';
import Recipe from './Recipe';
import { data } from '../data/recipes';
import { useState } from 'react';

function Content() {
  const recipes = data;
  const [filter, setFilter] = useState('');

  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  }

  return (
    <div className="flex-fill container p-20">
      <h1 className="my-30">Découvrez nos nouvelles recettes</h1>
      <div className={`card d-flex flex-column p-20 ${styles.contentCards}`}>
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
        <div className={styles.grid}>
          {recipes
            .filter((r) => r.title.toLocaleLowerCase().startsWith(filter))
            .map((recipe) => (
              <Recipe
                key={recipe._id}
                title={recipe.title}
                image={recipe.image}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Content;
