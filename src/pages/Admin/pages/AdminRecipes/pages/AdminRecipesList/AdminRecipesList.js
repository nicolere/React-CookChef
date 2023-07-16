import { NavLink } from 'react-router-dom';
import { deleteRecipe$ } from '../../../../../../apis/recipe';
import Loader from '../../../../../../components/Loader/Loader';
import { useFetchRecipes } from '../../../../../../hooks/useFetchRecipes';
import styles from './AdminRecipesList.module.scss';

function AdminRecipesList() {
  const [[recipes, setRecipes], isLoading] = useFetchRecipes();

  async function deleteRecipe(_id) {
    await deleteRecipe$(_id);
    setRecipes(recipes.filter((r) => r._id !== _id));
  }

  return (
    <div className="flex-fill d-flex flex-column">
      {isLoading && !recipes.length ? (
        <div className="d-flex flex-fill align-items-center">
          <Loader />
        </div>
      ) : (
        <ul className={`${styles.list}`}>
          {recipes.map((r) => (
            <li key={r._id} className="d-flex align-items-center">
              <span className="flex-fill">{r.title}</span>
              <NavLink to={`../edit/${r._id}`}>
                <button className="btn btn-primary mr-15">Editer</button>
              </NavLink>
              <button
                onClick={() => deleteRecipe(r._id)}
                className="btn btn-danger"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminRecipesList;
