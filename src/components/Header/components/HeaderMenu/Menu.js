import styles from './Menu.module.scss';

function Menu({ setPage }) {
  return (
    <ul className={`${styles.MenuContainer} card p-10`}>
      <li onClick={() => setPage('admin')}>Ajouter recette</li>
      <li>Wishlist</li>
      <li>Connexion</li>
    </ul>
  );
}

export default Menu;
