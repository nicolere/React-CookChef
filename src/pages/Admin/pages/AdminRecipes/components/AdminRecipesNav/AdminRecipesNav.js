import { NavLink } from 'react-router-dom';
import styles from './AdminrecipesNav.module.scss';

function AdminRecipesNav() {
  return (
    <ul className={`${styles.list} mb-20`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : '')}
        to="list"
      >
        Liste des recettes
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : '')}
        to="new"
      >
        Ajouter une recette
      </NavLink>
    </ul>
  );
}

export default AdminRecipesNav;
