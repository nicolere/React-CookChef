import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';

function Menu({ setWishlistDisplay }) {
  return (
    <ul className={`${styles.MenuContainer} card p-10`}>
      <li>
        <NavLink to="/admin">Admin</NavLink>
      </li>
      <li onClick={() => setWishlistDisplay(true)}>Wishlist</li>
    </ul>
  );
}

export default Menu;
