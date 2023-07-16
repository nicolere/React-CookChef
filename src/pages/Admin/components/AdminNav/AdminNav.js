import { NavLink } from 'react-router-dom';
import styles from './AdminNav.module.scss';

export function AdminNav() {
  return (
    <ul className={`${styles.list} d-flex flex-column p-10 mr-15`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : '')}
        to="recipes"
      >
        Recettes
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : '')}
        to="users"
      >
        Users
      </NavLink>
    </ul>
  );
}

export default AdminNav;
