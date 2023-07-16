import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';

function Menu() {
  return (
    <ul className={`${styles.MenuContainer} card p-10`}>
      <li>
        <NavLink to="/admin">Ajouter recette</NavLink>
      </li>
      <li>Wishlist</li>
      <li>Connexion</li>
    </ul>
  );
}

export default Menu;
